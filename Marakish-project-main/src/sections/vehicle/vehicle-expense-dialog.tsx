import type { Vehicle } from 'src/types/vehicle';

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  doc,
  query,
  where,
  getDocs,
  orderBy,
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
  [key: string]: any;
};

type VehicleExpenseDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
  editData?: any;
};

export function VehicleExpenseDialog({ open, onClose, onUpdate, editData }: VehicleExpenseDialogProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

  // Form State
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [expenseCategory, setExpenseCategory] = useState<string>('Garage Expenses ');
  const [amount, setAmount] = useState('');
  const [paymentSource, setPaymentSource] = useState<string>('');
  const [notes, setNotes] = useState('Manual');

  // Data State
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [bankPortals, setBankPortals] = useState<OptionType[]>([]);

  useEffect(() => {
    if (open) {
      fetchInitialData().then(() => {
        resetForm();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editData, vehicles.length, bankPortals.length]);

  const resetForm = () => {
    if (editData) {
      setDate(dayjs(editData.date.seconds * 1000 || editData.date).format('YYYY-MM-DD'));
      const veh = vehicles.find((v) => v.serialNumber === editData.serialNumber);
      setSelectedVehicle(veh || null);
      setExpenseCategory(editData.category);
      setAmount(String(editData.amount));
      const portal = bankPortals.find((p) => p.label === editData.bankPortalName);
      setPaymentSource(portal?.id || '');
      setNotes(editData.notes || '');
    } else {
      setDate(dayjs().format('YYYY-MM-DD'));
      setSelectedVehicle(null);
      setExpenseCategory('Garage Expenses ');
      setAmount('');
      setPaymentSource('');
      setNotes('Manual');
    }
  };

  const fetchInitialData = async () => {
    try {
      // Fetch Vehicles (new to old)
      const vehicleQ = query(collection(db, 'vehicles'), orderBy('purchasingDate', 'desc'));
      const vehicleSnapshot = await getDocs(vehicleQ);
      setVehicles(vehicleSnapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Vehicle[]);

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
      console.error('Error fetching expense data:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedVehicle || !expenseCategory || !amount || !date || !paymentSource) {
      setSnackbar({ open: true, message: t('vehicles.expense.messages.fillRequired'), severity: 'warning' });
      return;
    }

    const numericAmount = Number(amount);
    if (numericAmount <= 0) {
      setSnackbar({ open: true, message: 'Amount must be greater than 0.', severity: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const result = await runTransaction(db, async (transaction) => {
        // ===== ALL READS FIRST =====
        // 1. Get Counters
        const countersRef = doc(db, 'setting', 'counter');
        const countersDoc = await transaction.get(countersRef);
        if (!countersDoc.exists()) throw new Error('Counters not found');
        const counters = countersDoc.data();

        // 2. Get current bank balance
        const bankRef = doc(db, 'bankPortal', paymentSource);
        const bankSnap = await transaction.get(bankRef);
        const currentBankBalance = bankSnap.data()?.balance || 0;

        // 3. Get current vehicle accrued cost
        const vehicleRef = doc(db, 'vehicles', selectedVehicle.id);
        const vehicleSnap = await transaction.get(vehicleRef);
        const currentAccruedCost = vehicleSnap.data()?.totalAccruedCost || 0;

        // 4. If editing, get old bank and vehicle data
        let oldBankBalance = 0;
        let oldBankRef: any = null;
        let oldVehicleAccrued = 0;
        let oldVehicleRef: any = null;

        if (editData) {
          // Get old bank portal
          const oldBankQ = query(collection(db, 'bankPortal'), where('bankPortalName', '==', editData.bankPortalName));
          const oldBankSnap = await getDocs(oldBankQ);
          if (!oldBankSnap.empty) {
            oldBankRef = oldBankSnap.docs[0].ref;
            const oldBankDoc = await transaction.get(oldBankRef);
            oldBankBalance = (oldBankDoc.data() as any)?.balance || 0;
          }

          // Get old vehicle
          const oldVehQ = query(collection(db, 'vehicles'), where('serialNumber', '==', editData.serialNumber));
          const oldVehSnap = await getDocs(oldVehQ);
          if (!oldVehSnap.empty) {
            oldVehicleRef = oldVehSnap.docs[0].ref;
            const oldVehDoc = await transaction.get(oldVehicleRef);
            oldVehicleAccrued = (oldVehDoc.data() as any)?.totalAccruedCost || 0;
          }
        }

        // ===== PREPARE DATA =====
        const incrementId = (lastId: string | undefined, prefix: string) => {
          const todayStr = dayjs().format('DDMMYYYY');
          if (!lastId) return `${prefix}${todayStr}0001`;
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

        const bankPortal = bankPortals.find((b) => b.id === paymentSource);
        const bankLabel = bankPortal?.label || 'Unknown';
        const expenseDateObj = Timestamp.fromDate(new Date(date));

        let currentBankTxId = '';
        if (editData) {
          const btQ = query(
            collection(db, 'bankTransaction'),
            where('amount', '==', editData.amount),
            where('bankPortalName', '==', editData.bankPortalName)
          );
          const btSnap = await getDocs(btQ);
          const btToUpdate = btSnap.docs.find(d => d.data().description.includes(editData.serialNumber));
          if (btToUpdate) {
            currentBankTxId = btToUpdate.id;
          }
        }

        const newVexId = editData ? editData.transactionId : incrementId(counters.lastVehicleExpenses, 'VEX');
        const newBankTxId = currentBankTxId || generateBankId(counters.lastBankTransaction);

        // ===== ALL WRITES SECOND =====
        // If editing, reverse the old impact first
        if (editData && oldBankRef) {
          transaction.update(oldBankRef, { balance: oldBankBalance + editData.amount });
        }
        if (editData && oldVehicleRef) {
          transaction.update(oldVehicleRef, { totalAccruedCost: oldVehicleAccrued - editData.amount });
        }

        // 1. Create/Update Vehicle Expense Entry
        const vexRef = doc(db, 'vehicleExpenses', newVexId);
        const vexData = {
          amount: numericAmount,
          bankPortalName: bankLabel,
          category: expenseCategory,
          date: expenseDateObj,
          notes,
          serialNumber: selectedVehicle.serialNumber,
          status: true,
          transactionId: newVexId,
        };
        if (editData) {
          transaction.update(vexRef, vexData);
        } else {
          transaction.set(vexRef, vexData);
        }

        // 2. Update Bank Balance (Debit)
        transaction.update(bankRef, { balance: currentBankBalance - numericAmount });

        // 3. Update Vehicle totalAccruedCost
        transaction.update(vehicleRef, { totalAccruedCost: currentAccruedCost + numericAmount });

        // 4. Create/Update Bank Transaction
        const bankTxRef = doc(db, 'bankTransaction', newBankTxId);
        const bankTxData = {
          amount: numericAmount,
          bankPortalName: bankLabel,
          date: expenseDateObj,
          description: `${expenseCategory}: ${selectedVehicle.serialNumber} - ${selectedVehicle.manufacturer} ${selectedVehicle.model}${notes ? ` - ${notes}` : ''}`,
          status: true,
          transactionId: newBankTxId,
          type: 'Debit',
        };
        if (currentBankTxId) {
          transaction.update(bankTxRef, bankTxData);
        } else {
          transaction.set(bankTxRef, bankTxData);
        }

        // 5. Update Counters if NOT editing
        if (!editData) {
          transaction.update(countersRef, {
            lastVehicleExpenses: newVexId,
            lastBankTransaction: newBankTxId,
          });
        }

        return { newVexId, newBankTxId, bankLabel };
      });

      // Send Google Chat Notification
      try {
        await sendGoogleChatNotification({
          header: {
            title: '💸 New Vehicle Expense',
            subtitle: 'Marakish Group',
          },
          sections: [
            {
              widgets: [
                {
                  keyValue: {
                    topLabel: 'Vehicle',
                    content: `${selectedVehicle.serialNumber} - ${selectedVehicle.manufacturer} ${selectedVehicle.model}`,
                    icon: 'CAR',
                  },
                },
                { keyValue: { topLabel: 'Expense Type', content: expenseCategory, icon: 'TICKET' } },
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
                  keyValue: { topLabel: 'Expense ID', content: result.newVexId, icon: 'DESCRIPTION' },
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

      // Send Internal Notification
      try {
        await addNotification({
          title: 'Vehicle Expense Recorded',
          description: `${expenseCategory} of ${formatCurrency(numericAmount)} for ${selectedVehicle.serialNumber}`,
          type: 'vehicle-expense',
        });
      } catch (notifError) {
        console.error('Internal notification failed (non-critical):', notifError);
      }

      setSnackbar({ open: true, message: t('vehicles.expense.messages.expenseRecorded'), severity: 'success' });
      if (onUpdate) onUpdate();
      onClose();
    } catch (e: any) {
      console.error('Expense transaction failed: ', e);
      setSnackbar({ open: true, message: `Failed: ${e.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const selectedBank = bankPortals.find((b) => b.id === paymentSource);
  const isSold = selectedVehicle?.soldStatus === 'Sold';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {t('vehicles.expense.title')}
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
            label={t('vehicles.expense.labels.expenseDate')}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Box sx={{ position: 'relative' }}>
            <Autocomplete
              options={vehicles}
              getOptionLabel={(o) =>
                `${o.serialNumber} - ${o.manufacturer} ${o.model} (${o.modelYear})`
              }
              value={selectedVehicle}
              onChange={(e, v) => setSelectedVehicle(v)}
              renderInput={(params) => <TextField {...params} label={t('vehicles.expense.labels.vehicleSerial')} required />}
            />
            {isSold && (
              <Typography
                variant="caption"
                color="error"
                sx={{ position: 'absolute', bottom: -18, left: 0 }}
              >
                Warning: This is a Sold vehicle.
              </Typography>
            )}
          </Box>

          {selectedVehicle && (
            <Box
              sx={{
                gridColumn: 'span 2',
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.neutral',
                border: '1px dashed',
                borderColor: 'divider',
                animation: 'slideDown 0.4s ease-out',
                '@keyframes slideDown': {
                  from: { opacity: 0, transform: 'translateY(-10px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                <InfoItem label={t('vehicles.table.vin')} value={selectedVehicle.vinChassisNumber || 'N/A'} />
                <InfoItem label={t('vehicles.table.vendor')} value={selectedVehicle.vendor || 'N/A'} />
                <InfoItem label={t('vehicles.table.crn')} value={String(selectedVehicle.crn || 'N/A')} />
                <InfoItem label={t('vehicles.table.parking')} value={selectedVehicle.parkingLocation || 'N/A'} />
                <InfoItem
                  label={t('vehicles.expense.labels.accruedCost')}
                  value={selectedVehicle.totalAccruedCost?.toLocaleString() || '0'}
                  highlight
                />
              </Box>
            </Box>
          )}

          <Autocomplete
            options={categories}
            value={expenseCategory}
            onChange={(e, v) => setExpenseCategory(v || '')}
            renderInput={(params) => <TextField {...params} label={t('vehicles.expense.labels.expenseCategory')} required />}
          />

          <TextField
            fullWidth
            label={t('vehicles.expense.labels.amount')}
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
              renderInput={(params) => <TextField {...params} label={t('vehicles.expense.labels.paymentSource')} required />}
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
            label={t('vehicles.expense.labels.description')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Box>
      </DialogContent>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <MuiAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
        <Button onClick={onClose} variant="outlined">
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
          {loading ? t('vehicles.expense.messages.processing') : t('vehicles.expense.buttons.recordExpense')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function InfoItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: highlight ? 'bold' : 'normal',
          color: highlight ? 'primary.main' : 'inherit',
          fontSize: '0.8rem',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
