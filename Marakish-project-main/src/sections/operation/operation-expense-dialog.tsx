import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  doc,
  query,
  where,
  getDocs,
  Timestamp,
  collection,
  runTransaction,
} from 'firebase/firestore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { formatCurrency, sendGoogleChatNotification } from 'src/utils/google-chat';

import { db } from 'src/firebase';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type OptionType = {
  id: string;
  label: string;
  [key: string]: any;
};

type OperationExpenseDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
};

export function OperationExpenseDialog({ open, onClose, onUpdate }: OperationExpenseDialogProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

  // Form State
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paymentSource, setPaymentSource] = useState<string>('');
  const [notes, setNotes] = useState('Manual');

  // Data State
  const [categories, setCategories] = useState<string[]>([]);
  const [bankPortals, setBankPortals] = useState<OptionType[]>([]);

  useEffect(() => {
    if (open) {
      fetchInitialData();
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setDate(dayjs().format('YYYY-MM-DD'));
    setCategory('');
    setAmount('');
    setDescription('');
    setPaymentSource('');
    setNotes('Manual');
  };

  const fetchInitialData = async () => {
    try {
      // Fetch Expense Categories
      const categorySnap = await getDocs(collection(db, 'expenseCategory'));
      const categoryList = categorySnap.docs.map((d) => d.data().expenseType).filter(Boolean);
      setCategories(categoryList);

      // Fetch Bank Portals
      const bankQ = query(collection(db, 'bankPortal'), where('status', '==', true));
      const bankSnapshot = await getDocs(bankQ);
      setBankPortals(
        bankSnapshot.docs.map((d) => ({
          id: d.id,
          label: d.data().bankPortalName,
          balance: d.data().balance,
        }))
      );
    } catch (error) {
      console.error('Error fetching operation expense data:', error);
    }
  };

  const handleSubmit = async () => {
    if (!category || !amount || !date || !paymentSource || !description) {
      setSnackbar({ open: true, message: t('operationExpenses.messages.fillRequired'), severity: 'warning' });
      return;
    }

    const numericAmount = Number(amount);
    if (numericAmount <= 0) {
      setSnackbar({ open: true, message: t('operationExpenses.messages.amountGreaterZero'), severity: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const result = await runTransaction(db, async (transaction) => {
        const countersRef = doc(db, 'setting', 'counter');
        const countersDoc = await transaction.get(countersRef);
        if (!countersDoc.exists()) throw new Error('Counters not found');
        const counters = countersDoc.data();

        const incrementId = (lastId: string | undefined, prefix: string) => {
          const todayStr = dayjs().format('DDMMYYYY');
          if (!lastId) return `${prefix}${todayStr}0001`;
          // Split the ID into prefix, date, and number
          // OEX091020250020
          const numberPart = lastId.substring(lastId.length - 4);
          const newNumber = String(Number(numberPart) + 1).padStart(4, '0');
          return `${prefix}${todayStr}${newNumber}`;
        };

        const generateBankId = (lastId: string | undefined) => {
          const todayStr = dayjs().format('DDMMYYYY');
          if (!lastId) return `BNK${todayStr}0001`;
          const numberStr = lastId.substring(lastId.length - 4);
          const newNumber = String(Number(numberStr) + 1).padStart(4, '0');
          return `BNK${todayStr}${newNumber}`;
        };

        const newOexId = incrementId(counters.lastOperationExpenses, 'OEX');
        const newBankTxId = generateBankId(counters.lastBankTransaction);
        const expenseDateObj = Timestamp.fromDate(new Date(date));

        const bankPortal = bankPortals.find((b) => b.id === paymentSource);
        const bankLabel = bankPortal?.label || 'Unknown';

        // 1. Create Operation Expense Entry
        const oexRef = doc(db, 'operationExpenses', newOexId);
        transaction.set(oexRef, {
          amount: numericAmount,
          category,
          date: expenseDateObj,
          description,
          notes,
          paymentSource: bankLabel,
          status: true,
          transactionId: newOexId,
        });

        // 2. Update Bank Balance (Debit)
        const bankRef = doc(db, 'bankPortal', paymentSource);
        const bankSnap = await transaction.get(bankRef);
        const currentBankBalance = bankSnap.data()?.balance || 0;
        transaction.update(bankRef, { balance: currentBankBalance - numericAmount });

        // 3. Create Bank Transaction
        const bankTxRef = doc(db, 'bankTransaction', newBankTxId);
        transaction.set(bankTxRef, {
          amount: numericAmount,
          bankPortalName: bankLabel,
          date: expenseDateObj,
          description: `OperationExpenses: ${description}${notes ? ` - ${notes}` : ''}`,
          status: true,
          transactionId: newBankTxId,
          type: 'Debit',
        });

        // 4. Update Counters
        transaction.update(countersRef, {
          lastOperationExpenses: newOexId,
          lastBankTransaction: newBankTxId,
        });

        return { newOexId, newBankTxId, bankLabel };
      });

      // Send Google Chat Notification
      try {
        await sendGoogleChatNotification({
          header: {
            title: '💼 New Operation Expense',
            subtitle: 'Marakish Group',
          },
          sections: [
            {
              widgets: [
                { keyValue: { topLabel: 'Category', content: category, icon: 'TICKET' } },
                { keyValue: { topLabel: 'Description', content: description, icon: 'DESCRIPTION' } },
                {
                  keyValue: {
                    topLabel: 'Amount',
                    content: formatCurrency(numericAmount),
                    icon: 'DOLLAR',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Source',
                    content: result.bankLabel,
                    icon: 'ACCOUNT_BALANCE_WALLET',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Date',
                    content: dayjs(date).format('DD/MM/YYYY'),
                    icon: 'CLOCK',
                  },
                },
                { textParagraph: { text: `<b>Notes:</b> ${notes}` } },
              ],
            },
            {
              header: 'Transaction IDs',
              widgets: [
                {
                  keyValue: { topLabel: 'Expense ID', content: result.newOexId, icon: 'DESCRIPTION' },
                },
                {
                  keyValue: {
                    topLabel: 'Bank ID',
                    content: result.newBankTxId,
                    icon: 'ACCOUNT_BALANCE_WALLET',
                  },
                },
              ],
            },
          ],
        });
      } catch (chatError) {
        console.error('Google Chat notification failed (non-critical):', chatError);
      }

      setSnackbar({ open: true, message: t('operationExpenses.messages.expenseRecorded'), severity: 'success' });
      if (onUpdate) onUpdate();
      onClose();
    } catch (e: any) {
      console.error('Operation expense transaction failed: ', e);
      setSnackbar({ open: true, message: `Failed: ${e.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const selectedBank = bankPortals.find((b) => b.id === paymentSource);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {t('operationExpenses.title')}
        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }}
          gap={2}
          sx={{ mt: 1 }}
        >
          <TextField
            fullWidth
            label={t('operationExpenses.labels.date')}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Autocomplete
            options={categories}
            value={category}
            onChange={(e, v) => setCategory(v || '')}
            renderInput={(params) => <TextField {...params} label={t('operationExpenses.labels.expenseType')} required />}
          />

          <TextField
            fullWidth
            label={t('operationExpenses.labels.description')}
            placeholder="e.g. Petrol, Taxi, Office Supplies"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ gridColumn: 'span 2' }}
            required
          />

          <TextField
            fullWidth
            label={t('operationExpenses.labels.amount')}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Box>
            <Autocomplete
              options={bankPortals}
              getOptionLabel={(o) => o.label}
              value={bankPortals.find((b) => b.id === paymentSource) || null}
              onChange={(e, v) => setPaymentSource(v ? v.id : '')}
              renderInput={(params) => <TextField {...params} label={t('operationExpenses.labels.paymentSource')} required />}
            />
            {selectedBank && (
              <Box
                sx={{
                  mt: 1,
                  p: 0.5,
                  px: 1,
                  borderRadius: 0.5,
                  bgcolor: selectedBank.balance >= 0 ? 'success.lighter' : 'error.lighter',
                  animation: 'fadeIn 0.5s ease-out',
                  '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: selectedBank.balance >= 0 ? 'success.darker' : 'error.darker',
                    fontWeight: 'bold',
                  }}
                >
                  {t('vehicles.purchase.labels.availableBalance')}: {selectedBank.balance?.toLocaleString()} AED
                </Typography>
              </Box>
            )}
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            label={t('operationExpenses.labels.notes')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ gridColumn: 'span 2' }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
        <Button onClick={onClose} variant="outlined">
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading} color="primary">
          {loading ? t('operationExpenses.messages.processing') : t('operationExpenses.buttons.recordExpense')}
        </Button>
      </DialogActions>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Dialog>
  );
}
