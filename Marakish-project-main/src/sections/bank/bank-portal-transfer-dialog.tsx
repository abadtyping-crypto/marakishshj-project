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

import { addNotification } from 'src/utils/notifications';
import { formatCurrency, sendGoogleChatNotification } from 'src/utils/google-chat';

import { db } from 'src/firebase';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type OptionType = {
  id: string;
  label: string;
  balance: number;
  [key: string]: any;
};

type BankPortalTransferDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
};

export function BankPortalTransferDialog({
  open,
  onClose,
  onUpdate,
}: BankPortalTransferDialogProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

  // Form State
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [amount, setAmount] = useState('');
  const [charges, setCharges] = useState('0');
  const [sourcePortalId, setSourcePortalId] = useState<string>('');
  const [destinationPortalId, setDestinationPortalId] = useState<string>('');
  const [description, setDescription] = useState('Internal Transfer');

  // Data State
  const [bankPortals, setBankPortals] = useState<OptionType[]>([]);

  useEffect(() => {
    if (open) {
      fetchInitialData();
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setDate(dayjs().format('YYYY-MM-DD'));
    setAmount('');
    setCharges('0');
    setSourcePortalId('');
    setDestinationPortalId('');
    setDescription('Internal Transfer');
  };

  const fetchInitialData = async () => {
    try {
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
      console.error('Error fetching bank portals:', error);
    }
  };

  const handleSubmit = async () => {
    if (!sourcePortalId || !destinationPortalId || !amount || !date) {
      setSnackbar({ open: true, message: t('bankPortals.transfer.messages.fillRequired'), severity: 'warning' });
      return;
    }

    if (sourcePortalId === destinationPortalId) {
      setSnackbar({ open: true, message: t('bankPortals.transfer.messages.samePortal'), severity: 'warning' });
      return;
    }

    const numericAmount = Number(amount);
    const numericCharges = Number(charges) || 0;

    if (numericAmount <= 0) {
      setSnackbar({ open: true, message: t('bankPortals.transfer.messages.amountGreaterZero'), severity: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const result = await runTransaction(db, async (transaction) => {
        const countersRef = doc(db, 'setting', 'counter');
        const countersDoc = await transaction.get(countersRef);
        if (!countersDoc.exists()) throw new Error('Counters not found');
        const counters = countersDoc.data();

        const todayStr = dayjs().format('DDMMYYYY');

        const generateId = (lastId: string | undefined, prefix: string) => {
          if (!lastId || !lastId.includes(todayStr)) return `${prefix}${todayStr}0001`;
          const numberPart = lastId.substring(lastId.length - 4);
          const newNumber = String(Number(numberPart) + 1).padStart(4, '0');
          return `${prefix}${todayStr}${newNumber}`;
        };

        let lastBankTxId = counters.lastBankTransaction;
        let lastOexId = counters.lastOperationExpenses;

        const getNextBankId = () => {
          const nextId = generateId(lastBankTxId, 'BNK');
          lastBankTxId = nextId;
          return nextId;
        };

        const getNextOexId = () => {
          const nextId = generateId(lastOexId, 'OEX');
          lastOexId = nextId;
          return nextId;
        };

        const txDateObj = Timestamp.fromDate(new Date(date));
        const sourcePortal = bankPortals.find((b) => b.id === sourcePortalId);
        const destPortal = bankPortals.find((b) => b.id === destinationPortalId);

        const sourceLabel = sourcePortal?.label || 'Unknown';
        const destLabel = destPortal?.label || 'Unknown';

        // 1. Update Portal Balances
        const sourceRef = doc(db, 'bankPortal', sourcePortalId);
        const destRef = doc(db, 'bankPortal', destinationPortalId);

        const sourceSnap = await transaction.get(sourceRef);
        const destSnap = await transaction.get(destRef);

        const currentSourceBalance = sourceSnap.data()?.balance || 0;
        const currentDestBalance = destSnap.data()?.balance || 0;

        transaction.update(sourceRef, {
          balance: currentSourceBalance - numericAmount - numericCharges,
        });
        transaction.update(destRef, { balance: currentDestBalance + numericAmount });

        // 2. Create Bank Transactions
        const txIdDebit = getNextBankId();
        transaction.set(doc(db, 'bankTransaction', txIdDebit), {
          amount: numericAmount,
          bankPortalName: sourceLabel,
          date: txDateObj,
          description: `${description} TO ${destLabel}`,
          status: true,
          transactionId: txIdDebit,
          type: 'Debit',
        });

        const txIdCredit = getNextBankId();
        transaction.set(doc(db, 'bankTransaction', txIdCredit), {
          amount: numericAmount,
          bankPortalName: destLabel,
          date: txDateObj,
          description: `${description} FROM ${sourceLabel}`,
          status: true,
          transactionId: txIdCredit,
          type: 'Credit',
        });

        // 3. Handle Charges
        let oexId = '';
        let chargesBankTxId = '';
        if (numericCharges > 0) {
          oexId = getNextOexId();
          transaction.set(doc(db, 'operationExpenses', oexId), {
            amount: numericCharges,
            category: 'Transfer Fee', // Assuming a generic category or we could let user pick
            date: txDateObj,
            description: `Transfer Charges: ${sourceLabel} to ${destLabel}`,
            notes: 'Internal Transfer Fee',
            paymentSource: sourceLabel,
            status: true,
            transactionId: oexId,
          });

          chargesBankTxId = getNextBankId();
          transaction.set(doc(db, 'bankTransaction', chargesBankTxId), {
            amount: numericCharges,
            bankPortalName: sourceLabel,
            date: txDateObj,
            description: `Transfer Charges: ${description}`,
            status: true,
            transactionId: chargesBankTxId,
            type: 'Debit',
          });
        }

        // 4. Update Counters
        transaction.update(countersRef, {
          lastBankTransaction: lastBankTxId,
          lastOperationExpenses: lastOexId,
        });

        return { txIdDebit, txIdCredit, oexId, sourceLabel, destLabel };
      });

      // Send Google Chat Notification
      try {
        await sendGoogleChatNotification({
          header: {
            title: '🔄 Portal to Portal Transfer',
            subtitle: 'Marakish Group',
          },
          sections: [
            {
              widgets: [
                {
                  keyValue: {
                    topLabel: 'Source',
                    content: result.sourceLabel,
                    icon: 'ACCOUNT_BALANCE',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Destination',
                    content: result.destLabel,
                    icon: 'ACCOUNT_BALANCE_WALLET',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Amount',
                    content: formatCurrency(numericAmount),
                    icon: 'DOLLAR',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Charges',
                    content: formatCurrency(numericCharges),
                    icon: 'MONEY',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Date',
                    content: dayjs(date).format('DD/MM/YYYY'),
                    icon: 'CLOCK',
                  },
                },
              ],
            },
          ],
        });
      } catch (chatError) {
        console.error('Google Chat notification failed (non-critical):', chatError);
      }

      // Send Internal Notification
      try {
        await addNotification({
          title: 'Bank Portal Transfer',
          description: `Transferred ${formatCurrency(numericAmount)} from ${result.sourceLabel} to ${result.destLabel}`,
          type: 'bank-transaction',
        });
      } catch (notifError) {
        console.error('Internal notification failed (non-critical):', notifError);
      }

      setSnackbar({ open: true, message: t('bankPortals.transfer.messages.transferSuccess'), severity: 'success' });
      if (onUpdate) onUpdate();
      onClose();
    } catch (e: any) {
      console.error('Transfer transaction failed: ', e);
      setSnackbar({ open: true, message: `Failed: ${e.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const selectedSource = bankPortals.find((b) => b.id === sourcePortalId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {t('bankPortals.transfer.title')}
        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label={t('bankPortals.transfer.labels.date')}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Box>
            <Autocomplete
              options={bankPortals.filter((b) => b.id !== destinationPortalId)}
              getOptionLabel={(o) => o.label}
              value={bankPortals.find((b) => b.id === sourcePortalId) || null}
              onChange={(e, v) => setSourcePortalId(v ? v.id : '')}
              renderInput={(params) => <TextField {...params} label={t('bankPortals.transfer.labels.sourcePortal')} required />}
            />
            {selectedSource && (
              <Box
                sx={{
                  mt: 1,
                  p: 0.5,
                  px: 1,
                  borderRadius: 0.5,
                  bgcolor: selectedSource.balance >= 0 ? 'success.lighter' : 'error.lighter',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: selectedSource.balance >= 0 ? 'success.darker' : 'error.darker',
                    fontWeight: 'bold',
                  }}
                >
                  {t('vehicles.purchase.labels.availableBalance')}: {selectedSource.balance?.toLocaleString()} AED
                </Typography>
              </Box>
            )}
          </Box>

          <Autocomplete
            options={bankPortals.filter((b) => b.id !== sourcePortalId)}
            getOptionLabel={(o) => o.label}
            value={bankPortals.find((b) => b.id === destinationPortalId) || null}
            onChange={(e, v) => setDestinationPortalId(v ? v.id : '')}
            renderInput={(params) => (
              <TextField {...params} label={t('bankPortals.transfer.labels.destPortal')} required />
            )}
          />

          <TextField
            fullWidth
            label={t('bankPortals.transfer.labels.amount')}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label={t('bankPortals.transfer.labels.charges')}
            type="number"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
            placeholder="0"
          />

          <TextField
            fullWidth
            label={t('bankPortals.transfer.labels.description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
        <Button onClick={onClose} variant="outlined">
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading} color="primary">
          {loading ? t('bankPortals.transfer.messages.processing') : t('bankPortals.transfer.buttons.transferNow')}
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
