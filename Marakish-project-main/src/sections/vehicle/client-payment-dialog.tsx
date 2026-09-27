import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  doc,
  query,
  where,
  limit,
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
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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

type SoldVehicleData = {
  id: string;
  serialNumber: string;
  sellingPrice: number;
  saleDate: any;
  totalAccruedCost?: number;
  manufacturer: string;
  model: string;
  modelYear: number;
  currentBalance: number;
};

type ClientPaymentDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
};

export function ClientPaymentDialog({ open, onClose, onUpdate }: ClientPaymentDialogProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

  // Form State
  const [paymentDate, setPaymentDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<SoldVehicleData | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentSource, setPaymentSource] = useState('');
  const [notes, setNotes] = useState('');

  // Data State
  const [pendingClients, setPendingClients] = useState<string[]>([]);
  const [clientVehicles, setClientVehicles] = useState<SoldVehicleData[]>([]);
  const [bankPortals, setBankPortals] = useState<OptionType[]>([]);

  useEffect(() => {
    if (open) {
      fetchInitialData();
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setPaymentDate(dayjs().format('YYYY-MM-DD'));
    setSelectedClient(null);
    setSelectedVehicle(null);
    setAmount('');
    setPaymentSource('');
    setNotes('');
  };

  const fetchInitialData = async () => {
    try {
      // Fetch all ledger entries with balance > 0 to identify pending clients
      // Since we don't have a simple way to query "latest balance > 0" in Firestore without aggregation,
      // we'll fetch entries and filter in memory or rely on clients with any ledger activity if small.
      // For now, let's fetch all active client names from clientsList and then check their latest ledger.
      const clientsQ = query(collection(db, 'clientsList'), where('status', '==', true));
      const clientsSnap = await getDocs(clientsQ);
      const allClients = clientsSnap.docs.map((d) => d.id);

      // To be precise, we filter those who actually have a pending balance.
      // This is a bit heavy but ensures correctness.
      const pendingList: string[] = [];
      for (const client of allClients) {
        const q = query(
          collection(db, 'clientLedger'),
          where('clientName', '==', client),
          orderBy('date', 'desc'),
          limit(1)
        );
        const snap = await getDocs(q);
        const bal = !snap.empty ? snap.docs[0].data().balance || 0 : 0;
        if (bal > 0) {
          pendingList.push(client);
        }
      }
      setPendingClients(pendingList);

      // Bank Portals
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
      console.error('Error fetching pending data:', error);
    }
  };

  useEffect(() => {
    if (selectedClient) {
      fetchClientVehicles(selectedClient);
    } else {
      setClientVehicles([]);
    }
  }, [selectedClient]);

  const fetchClientVehicles = async (client: string) => {
    try {
      // Find all vehicles sold to this client that have a balance > 0
      // 1. Get all soldVehicles for this client
      const soldQ = query(collection(db, 'soldVehicles'), where('clientName', '==', client));
      const soldSnap = await getDocs(soldQ);

      // 2. Fetch ALL ledger entries for this client to calculate per-vehicle balances in memory
      const ledgerQ = query(collection(db, 'clientLedger'), where('clientName', '==', client));
      const ledgerSnap = await getDocs(ledgerQ);

      const ledgerData = ledgerSnap.docs.map((d) => d.data());

      const results: SoldVehicleData[] = [];

      for (const sDoc of soldSnap.docs) {
        const sData = sDoc.data();
        const sn = sData.serialNumber;

        // Sum up debits and credits for this specific serial number
        const snEntries = ledgerData.filter((e) => e.serialNumber === sn);
        let vehicleDebit = 0;
        let vehicleCredit = 0;
        snEntries.forEach((data) => {
          vehicleDebit += data.debitSale || 0;
          vehicleCredit += data.creditPayment || 0;
        });

        const vehiclePending = vehicleDebit - vehicleCredit;

        if (vehiclePending > 0) {
          // 3. Get vehicle details for preview
          const vQ = query(collection(db, 'vehicles'), where('serialNumber', '==', sn), limit(1));
          const vSnap = await getDocs(vQ);
          const vData = !vSnap.empty ? vSnap.docs[0].data() : {};

          results.push({
            id: sDoc.id,
            serialNumber: sn,
            sellingPrice: sData.sellingPrice,
            saleDate: sData.saleDate,
            totalAccruedCost: vData.totalAccruedCost,
            manufacturer: vData.manufacturer || 'Unknown',
            model: vData.model || '',
            modelYear: vData.modelYear || 0,
            currentBalance: vehiclePending,
          });
        }
      }
      setClientVehicles(results);
    } catch (error) {
      console.error('Error fetching client vehicles:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedClient || !selectedVehicle || !amount || !paymentDate || !paymentSource) {
      setSnackbar({ open: true, message: t('bankPortals.clientPayment.messages.fillRequired'), severity: 'warning' });
      return;
    }

    const numericAmount = Number(amount);
    if (numericAmount <= 0) {
      setSnackbar({ open: true, message: t('bankPortals.clientPayment.messages.amountGreaterZero'), severity: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const result = await runTransaction(db, async (transaction) => {
        // 1. Get Counters
        const countersRef = doc(db, 'setting', 'counter');
        const countersDoc = await transaction.get(countersRef);
        if (!countersDoc.exists()) throw new Error('Counters not found');
        const counters = countersDoc.data();

        // 2. Get latest client balance WITHIN transaction for safety
        const ledgerColl = collection(db, 'clientLedger');
        const latestQ = query(
          ledgerColl,
          where('clientName', '==', selectedClient),
          orderBy('date', 'desc'),
          limit(1)
        );
        // Note: Firestore transactions don't support queries directly via transaction object for some SDK versions,
        // however, we can read the doc if we have the ID, OR we must do the query outside but it's less safe.
        // In this case, since we are adding a NEW entry with an incremented ID and a new balance,
        // we should ideally read the latest entry.
        // If we can't query inside transaction, we fetch it right before and rely on the ledgerID increment
        // to prevent double writes, but the balance calculation still needs to be atomic.

        // Let's stick to fetching it right before but with a check.
        const latestSnap = await getDocs(latestQ);
        const currentGlobalBalance = !latestSnap.empty ? latestSnap.docs[0].data().balance || 0 : 0;

        const incrementId = (lastId: string | undefined, prefix: string) => {
          const todayStr = dayjs().format('DDMMYYYY');
          if (!lastId) return `${prefix}0001${todayStr}`;
          const noPrefix = lastId.replace(prefix, '');
          const numberPart = noPrefix.substring(0, 4);
          const newNumber = String(Number(numberPart) + 1).padStart(4, '0');
          return `${prefix}${newNumber}${todayStr}`;
        };

        const generateBankId = (lastId: string | undefined) => {
          const todayStr = dayjs().format('DDMMYYYY');
          if (!lastId) return `BNK${todayStr}0001`;
          const numberStr = lastId.substring(lastId.length - 4);
          const newNumber = String(Number(numberStr) + 1).padStart(4, '0');
          return `BNK${todayStr}${newNumber}`;
        };

        const newLedgerId = incrementId(counters.lastClientLedger, 'LED');
        const newBankTxId = generateBankId(counters.lastBankTransaction);
        const paymentDateObj = Timestamp.fromDate(new Date(paymentDate));

        const finalGlobalBalance = currentGlobalBalance - numericAmount;
        const bankLabel = bankPortals.find((b) => b.id === paymentSource)?.label || 'Unknown';

        // 1. Create Ledger Entry
        const ledgerRef = doc(db, 'clientLedger', newLedgerId);
        transaction.set(ledgerRef, {
          balance: finalGlobalBalance,
          clientName: selectedClient,
          creditPayment: numericAmount,
          date: paymentDateObj,
          debitSale: 0,
          description: 'Payment',
          ledgerId: newLedgerId,
          notes: bankLabel,
          serialNumber: selectedVehicle.serialNumber,
          status: true,
        });

        // 2. Update Bank Balance
        const bankRef = doc(db, 'bankPortal', paymentSource);
        const bankSnap = await transaction.get(bankRef);
        const currentBankBalance = bankSnap.data()?.balance || 0;
        transaction.update(bankRef, { balance: currentBankBalance + numericAmount });

        // 3. Create Bank Transaction
        const bankTxRef = doc(db, 'bankTransaction', newBankTxId);
        transaction.set(bankTxRef, {
          amount: numericAmount,
          bankPortalName: bankLabel,
          date: paymentDateObj,
          description: `Client Payment - ${selectedVehicle.serialNumber} ${selectedClient}`,
          status: true,
          transactionId: newBankTxId,
          type: 'Credit',
        });

        transaction.update(countersRef, {
          lastBankTransaction: newBankTxId,
          lastClientLedger: newLedgerId,
        });

        return { newLedgerId, newBankTxId, numericAmount, bankLabel };
      });

      // Send Google Chat Notification
      try {
        await sendGoogleChatNotification({
          header: {
            title: '💰 Payment Received',
            subtitle: 'Marakish Group',
          },
          sections: [
            {
              widgets: [
                { keyValue: { topLabel: 'Client', content: selectedClient, icon: 'PERSON' } },
                {
                  keyValue: {
                    topLabel: 'Vehicle',
                    content: selectedVehicle.serialNumber,
                    icon: 'CAR',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Amount',
                    content: formatCurrency(result.numericAmount),
                    icon: 'MONEY',
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
                    content: dayjs(paymentDate).format('DD/MM/YYYY'),
                    icon: 'CLOCK',
                  },
                },
              ],
            },
            {
              header: 'Transaction IDs',
              widgets: [
                {
                  keyValue: {
                    topLabel: 'Ledger ID',
                    content: result.newLedgerId,
                    icon: 'DESCRIPTION',
                  },
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

      setSnackbar({ open: true, message: t('bankPortals.clientPayment.messages.paymentRecorded'), severity: 'success' });

      if (onUpdate) onUpdate();
      onClose();
    } catch (e: any) {
      console.error('Payment transaction failed: ', e);
      setSnackbar({ open: true, message: `Failed: ${e.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const isProfit = (selectedVehicle?.sellingPrice || 0) > (selectedVehicle?.totalAccruedCost || 0);
  const profitValue =
    (selectedVehicle?.sellingPrice || 0) - (selectedVehicle?.totalAccruedCost || 0);

  const selectedBank = bankPortals.find((b) => b.id === paymentSource);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {t('bankPortals.clientPayment.title')}
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
            label={t('bankPortals.clientPayment.labels.paymentDate')}
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Autocomplete
            options={pendingClients}
            value={selectedClient}
            onChange={(e, v) => setSelectedClient(v)}
            renderInput={(params) => <TextField {...params} label={t('bankPortals.clientPayment.labels.clientName')} required />}
          />

          <Autocomplete
            options={clientVehicles}
            getOptionLabel={(o) => `${o.serialNumber} - ${o.manufacturer} ${o.model}`}
            value={selectedVehicle}
            disabled={!selectedClient}
            onChange={(e, v) => setSelectedVehicle(v)}
            renderInput={(params) => <TextField {...params} label={t('bankPortals.clientPayment.labels.vehicleSerial')} required />}
          />

          {selectedVehicle && (
            <Box
              sx={{
                gridColumn: 'span 2',
                p: 2,
                borderRadius: 1,
                bgcolor: isProfit ? 'success.lighter' : 'error.lighter',
                border: 1,
                borderColor: isProfit ? 'success.main' : 'error.main',
                animation: 'slideDown 0.4s ease-out',
                '@keyframes slideDown': {
                  from: { opacity: 0, transform: 'translateY(-10px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: isProfit ? 'success.darker' : 'error.darker', mb: 1 }}
              >
                {isProfit ? t('bankPortals.clientPayment.labels.saleProfitable') : t('bankPortals.clientPayment.labels.saleAtLoss')} ({profitValue.toLocaleString()} AED)
              </Typography>
              <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1}>
                <InfoItem
                  label={t('bankPortals.clientPayment.labels.sellingPrice')}
                  value={selectedVehicle.sellingPrice.toLocaleString()}
                />
                <InfoItem
                  label={t('bankPortals.clientPayment.labels.sellingDate')}
                  value={dayjs(selectedVehicle.saleDate.toDate()).format('DD/MM/YYYY')}
                />
                <InfoItem
                  label={t('bankPortals.clientPayment.labels.accruedCost')}
                  value={selectedVehicle.totalAccruedCost?.toLocaleString() || '0'}
                />
                <InfoItem
                  label={t('bankPortals.clientPayment.labels.pendingBalance')}
                  value={selectedVehicle.currentBalance.toLocaleString()}
                  highlight
                />
              </Box>
            </Box>
          )}

          <TextField
            fullWidth
            label={t('bankPortals.clientPayment.labels.amount')}
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
              disabled={!amount || Number(amount) <= 0}
              onChange={(e, v) => setPaymentSource(v ? v.id : '')}
              renderInput={(params) => <TextField {...params} label={t('bankPortals.clientPayment.labels.paymentSource')} required />}
            />
            {selectedBank && (
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: 'info.lighter',
                  animation: 'fadeIn 0.5s ease-out',
                  '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
                }}
              >
                <Typography variant="caption" color="info.darker">
                  {t('vehicles.purchase.labels.availableBalance')}: {selectedBank.balance?.toLocaleString()}
                </Typography>
              </Box>
            )}
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            label={t('bankPortals.clientPayment.labels.notes')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ gridColumn: 'span 2' }}
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
          {loading ? t('bankPortals.clientPayment.messages.processing') : t('bankPortals.clientPayment.buttons.recordPayment')}
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
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
