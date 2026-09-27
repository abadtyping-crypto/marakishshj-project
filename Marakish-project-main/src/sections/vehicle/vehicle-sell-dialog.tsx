import type { Vehicle } from 'src/types/vehicle';

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

type VehicleSellDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
  initialVehicle?: Vehicle | null;
  editData?: any;
};

export function VehicleSellDialog({
  open,
  onClose,
  onUpdate,
  initialVehicle,
  editData,
}: VehicleSellDialogProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });
  const [showAccruedCost, setShowAccruedCost] = useState(false);
  const [showProfitLoss, setShowProfitLoss] = useState(false);

  // Form State
  const [saleDate, setSaleDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [paymentReceived, setPaymentReceived] = useState('');
  const [paymentSource, setPaymentSource] = useState('');
  const [notes, setNotes] = useState('');

  // Data Options State
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
  const [clients, setClients] = useState<OptionType[]>([]);
  const [bankPortals, setBankPortals] = useState<OptionType[]>([]);

  useEffect(() => {
    if (open) {
      fetchInitialData().then(() => {
        if (editData) {
          // Edit mode - populate form with existing data
          setSelectedVehicle(editData.vehicleData);
          setSaleDate(dayjs(editData.saleDate?.seconds * 1000 || editData.saleDate).format('YYYY-MM-DD'));
          setClientName(editData.clientName);
          setSellingPrice(String(editData.sellingPrice));
          setPaymentReceived(String(editData.paymentReceived || ''));
          setNotes(editData.notes || '');
          // Payment source will be set after bank portals are loaded
        } else if (initialVehicle) {
          setSelectedVehicle(initialVehicle);
          setSaleDate(dayjs().format('YYYY-MM-DD'));
          setClientName('');
          setSellingPrice('');
          setPaymentReceived('');
          setPaymentSource('');
          setNotes('');
        } else {
          // Reset fields for new sale
          setSelectedVehicle(null);
          setSaleDate(dayjs().format('YYYY-MM-DD'));
          setClientName('');
          setSellingPrice('');
          setPaymentReceived('');
          setPaymentSource('');
          setNotes('');
        }
      });
    }
  }, [open, initialVehicle, editData]);

  const fetchInitialData = async () => {
    try {
      // Available Vehicles
      const vQ = query(collection(db, 'vehicles'), where('soldStatus', '==', 'Available'));
      const vSnap = await getDocs(vQ);
      const vList = vSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Vehicle[];
      setAvailableVehicles(vList);

      // Clients
      const cQ = query(collection(db, 'clientsList'), where('status', '==', true));
      const cSnap = await getDocs(cQ);
      setClients(cSnap.docs.map((d) => ({ id: d.id, label: d.id })));

      // Bank Portals
      const bankQ = query(collection(db, 'bankPortal'), where('status', '==', true));
      const bankSnapshot = await getDocs(bankQ);
      const bankList = bankSnapshot.docs.map((d) => ({
        id: d.id,
        label: d.data().bankPortalName,
        balance: d.data().balance,
      }));
      setBankPortals(bankList);

      // If in edit mode and payment source exists, find the bank portal ID
      if (editData?.paymentSource) {
        const bankPortal = bankList.find(b => b.label === editData.paymentSource);
        if (bankPortal) {
          setPaymentSource(bankPortal.id);
        }
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedVehicle || !clientName || !sellingPrice || !saleDate) {
      setSnackbar({ open: true, message: t('vehicles.sell.messages.fillRequired'), severity: 'warning' });
      return;
    }

    if (Number(paymentReceived) > 0 && !paymentSource) {
      setSnackbar({ open: true, message: 'Please select a payment source for the received amount.', severity: 'warning' });
      return;
    }

    setLoading(true);

    try {
      // ===== EDIT MODE =====
      if (editData) {
        const numericPrice = Number(sellingPrice);
        const numericReceived = Number(paymentReceived);
        const saleDateObj = Timestamp.fromDate(new Date(saleDate));

        await runTransaction(db, async (transaction) => {
          // ===== ALL READS FIRST =====
          // 1. Read old payment bank portal (if exists)
          let oldBankRef: any = null;
          let oldBankBalance = 0;
          if (editData.paymentReceived > 0 && editData.paymentSource) {
            const oldBankQ = query(
              collection(db, 'bankPortal'),
              where('bankPortalName', '==', editData.paymentSource)
            );
            const oldBankSnap = await getDocs(oldBankQ);
            if (!oldBankSnap.empty) {
              oldBankRef = oldBankSnap.docs[0].ref;
              const oldBankDoc = await transaction.get(oldBankRef);
              oldBankBalance = (oldBankDoc.data() as any)?.balance || 0;
            }
          }

          // 2. Read new payment bank portal (if exists)
          let newBankRef: any = null;
          let newBankBalance = 0;
          if (numericReceived > 0 && paymentSource) {
            newBankRef = doc(db, 'bankPortal', paymentSource);
            const newBankDoc = await transaction.get(newBankRef);
            newBankBalance = (newBankDoc.data() as any)?.balance || 0;
          }

          // 3. Get all ledger entries for this client to recalculate balances
          const allLedgerQ = query(
            collection(db, 'clientLedger'),
            where('clientName', '==', clientName),
            orderBy('date', 'asc')
          );
          const allLedgerSnap = await getDocs(allLedgerQ);
          const allLedgerEntries = allLedgerSnap.docs.map(d => ({ ref: d.ref, id: d.id, ...d.data() })) as any[];

          // ===== ALL WRITES SECOND =====
          // 4. Update sold vehicle record
          const soldVehicleRef = doc(db, 'soldVehicles', editData.soldVehicleDocId);
          transaction.update(soldVehicleRef, {
            clientName,
            saleDate: saleDateObj,
            sellingPrice: numericPrice,
          });

          // 5. Update sale ledger entry
          if (editData.ledgerSaleId) {
            const ledgerSaleRef = doc(db, 'clientLedger', editData.ledgerSaleId);
            transaction.update(ledgerSaleRef, {
              clientName,
              date: saleDateObj,
              debitSale: numericPrice,
              description: `Vehicle Sold: ${selectedVehicle.serialNumber} - ${selectedVehicle.manufacturer} ${selectedVehicle.model} (${selectedVehicle.modelYear})`,
            });
          }

          // 6. Handle payment changes
          const bankLabel = numericReceived > 0 ? (bankPortals.find((b) => b.id === paymentSource)?.label || 'Unknown') : '';

          if (editData.ledgerPaymentId && numericReceived > 0) {
            // Update existing payment entry
            const ledgerPayRef = doc(db, 'clientLedger', editData.ledgerPaymentId);
            transaction.update(ledgerPayRef, {
              clientName,
              date: saleDateObj,
              creditPayment: numericReceived,
              notes: bankLabel,
            });
          } else if (editData.ledgerPaymentId && numericReceived === 0) {
            // Delete payment entry if payment removed
            const ledgerPayRef = doc(db, 'clientLedger', editData.ledgerPaymentId);
            transaction.delete(ledgerPayRef);
          } else if (!editData.ledgerPaymentId && numericReceived > 0) {
            // Create new payment entry
            const countersRef = doc(db, 'setting', 'counter');
            const countersDoc = await transaction.get(countersRef);
            const counters = countersDoc.data() || {};
            const incrementId = (lastId: string | undefined, prefix: string) => {
              const todayStr = dayjs().format('DDMMYYYY');
              if (!lastId) return `${prefix}0001${todayStr}`;
              const numberPart = lastId.substring(prefix.length, prefix.length + 4);
              const newNumber = String(Number(numberPart) + 1).padStart(4, '0');
              return `${prefix}${newNumber}${todayStr}`;
            };
            const newLedgerPayId = incrementId(counters.lastClientLedger, 'LED');
            const ledgerPayRef = doc(db, 'clientLedger', newLedgerPayId);
            transaction.set(ledgerPayRef, {
              balance: 0, // Will be recalculated below
              clientName,
              creditPayment: numericReceived,
              date: saleDateObj,
              debitSale: 0,
              description: 'Payment',
              ledgerId: newLedgerPayId,
              notes: bankLabel,
              serialNumber: selectedVehicle.serialNumber,
              status: true,
            });
            transaction.update(countersRef, { lastClientLedger: newLedgerPayId });
          }

          // 7. Recalculate all ledger balances for this client
          let runningBalance = 0;
          for (const entry of allLedgerEntries) {
            // Update values if this is the sale or payment entry we're editing
            let debit = entry.debitSale || 0;
            let credit = entry.creditPayment || 0;

            if (entry.id === editData.ledgerSaleId) {
              debit = numericPrice;
            } else if (entry.id === editData.ledgerPaymentId) {
              credit = numericReceived;
            }

            runningBalance += debit - credit;
            transaction.update(entry.ref, { balance: runningBalance });
          }

          // 8. Update bank balances
          // Reverse old payment
          if (oldBankRef && editData.paymentReceived > 0) {
            transaction.update(oldBankRef, { balance: oldBankBalance - editData.paymentReceived });
          }
          // Apply new payment
          if (newBankRef && numericReceived > 0) {
            transaction.update(newBankRef, { balance: newBankBalance + numericReceived });
          }

          // 9. Handle bank transactions
          // Find and update/delete old bank transaction
          if (editData.paymentReceived > 0) {
            const oldBankTxQ = query(
              collection(db, 'bankTransaction'),
              where('description', '>=', `Client Payment - ${editData.serialNumber}`),
              where('description', '<=', `Client Payment - ${editData.serialNumber}\uf8ff`)
            );
            const oldBankTxSnap = await getDocs(oldBankTxQ);
            if (!oldBankTxSnap.empty) {
              const oldBankTxRef = oldBankTxSnap.docs[0].ref;
              if (numericReceived > 0) {
                // Update existing bank transaction
                transaction.update(oldBankTxRef, {
                  amount: numericReceived,
                  bankPortalName: bankLabel,
                  date: saleDateObj,
                  description: `Client Payment - ${selectedVehicle.serialNumber} ${clientName}`,
                });
              } else {
                // Delete bank transaction if payment removed
                transaction.delete(oldBankTxRef);
              }
            }
          } else if (numericReceived > 0) {
            // Create new bank transaction
            const countersRef = doc(db, 'setting', 'counter');
            const countersDoc = await transaction.get(countersRef);
            const counters = countersDoc.data() || {};
            const generateBankId = (lastId: string | undefined) => {
              const todayStr = dayjs().format('DDMMYYYY');
              if (!lastId) return `BNK${todayStr}0001`;
              const numberStr = lastId.substring(lastId.length - 4);
              const newNumber = String(Number(numberStr) + 1).padStart(4, '0');
              return `BNK${todayStr}${newNumber}`;
            };
            const newBankTxId = generateBankId(counters.lastBankTransaction);
            const bankTxRef = doc(db, 'bankTransaction', newBankTxId);
            transaction.set(bankTxRef, {
              amount: numericReceived,
              bankPortalName: bankLabel,
              date: saleDateObj,
              description: `Client Payment - ${selectedVehicle.serialNumber} ${clientName}`,
              status: true,
              transactionId: newBankTxId,
              type: 'Credit',
            });
            transaction.update(countersRef, { lastBankTransaction: newBankTxId });
          }
        });

        setSnackbar({ open: true, message: '✅ Sale updated successfully!', severity: 'success' });
        if (onUpdate) onUpdate();
        onClose();
        setLoading(false);
        return;
      }

      // ===== CREATE MODE (Original Logic) =====
      // Fetch latest ledger entry for balance calculation before transaction
      const lastLedgerQ = query(
        collection(db, 'clientLedger'),
        where('clientName', '==', clientName),
        orderBy('date', 'desc'),
        limit(1)
      );
      const ledgerSnap = await getDocs(lastLedgerQ);
      let currentBalance = 0;
      if (!ledgerSnap.empty) {
        currentBalance = ledgerSnap.docs[0].data().balance || 0;
      }

      const result = await runTransaction(db, async (transaction) => {
        // ===== ALL READS FIRST =====
        // 1. Get Counters
        const countersRef = doc(db, 'setting', 'counter');
        const countersDoc = await transaction.get(countersRef);

        if (!countersDoc.exists()) {
          throw new Error('Counters document does not exist!');
        }

        const counters = countersDoc.data();

        // Calculate values first
        const numericPrice = Number(sellingPrice);
        const numericReceived = Number(paymentReceived);
        const saleDateObj = Timestamp.fromDate(new Date(saleDate));

        // 2. Get Bank Balance (if payment received)
        let currentBankBalance = 0;
        const bankRef = numericReceived > 0 ? doc(db, 'bankPortal', paymentSource) : null;
        if (bankRef) {
          const bankSnap = await transaction.get(bankRef);
          currentBankBalance = bankSnap.data()?.balance || 0;
        }

        // ===== PREPARE IDs =====
        const incrementId = (lastId: string | undefined, prefix: string) => {
          const todayStr = dayjs().format('DDMMYYYY');
          if (!lastId) return `${prefix}0001${todayStr}`;
          const numberPart = lastId.substring(prefix.length, prefix.length + 4);
          const newNumber = String(Number(numberPart) + 1).padStart(4, '0');
          return `${prefix}${newNumber}${todayStr}`;
        };

        const newSoldId = incrementId(counters.lastSoldVehicles, 'SEL');
        const newLedgerSaleId = incrementId(counters.lastClientLedger, 'LED');

        const lastBankTx = counters.lastBankTransaction;
        const generateBankId = (lastId: string | undefined) => {
          const todayStr = dayjs().format('DDMMYYYY');
          if (!lastId) return `BNK${todayStr}0001`;
          const numberStr = lastId.substring(lastId.length - 4);
          const newNumber = String(Number(numberStr) + 1).padStart(4, '0');
          return `BNK${todayStr}${newNumber}`;
        };
        const newBankTxId = generateBankId(lastBankTx);

        // ===== ALL WRITES SECOND =====
        // 3. Update Vehicle Status
        const vehicleRef = doc(db, 'vehicles', selectedVehicle.id);
        transaction.update(vehicleRef, { soldStatus: 'Sold' });

        // 4. Create Sold Vehicle Entry
        const soldRef = doc(db, 'soldVehicles', newSoldId);
        transaction.set(soldRef, {
          clientName,
          saleDate: saleDateObj,
          sellingPrice: numericPrice,
          serialNumber: selectedVehicle.serialNumber,
          manufacturer: selectedVehicle.manufacturer,
          model: selectedVehicle.model,
          modelYear: selectedVehicle.modelYear,
          vinChassisNumber: selectedVehicle.vinChassisNumber,
          status: true,
          transactionId: newSoldId,
        });

        // 5. Create Client Ledger (Debit Sale)
        const saleBalance = currentBalance + numericPrice;
        const ledgerSaleRef = doc(db, 'clientLedger', newLedgerSaleId);
        transaction.set(ledgerSaleRef, {
          balance: saleBalance,
          clientName,
          date: saleDateObj,
          debitSale: numericPrice,
          description: `Vehicle Sold: ${selectedVehicle.serialNumber} - ${selectedVehicle.manufacturer} ${selectedVehicle.model} (${selectedVehicle.modelYear})`,
          ledgerId: newLedgerSaleId,
          serialNumber: selectedVehicle.serialNumber,
          status: true,
        });

        // 6. If Payment Received > 0
        if (numericReceived > 0) {
          const finalBalance = saleBalance - numericReceived;
          const newLedgerPayId = incrementId(newLedgerSaleId, 'LED');
          const ledgerPayRef = doc(db, 'clientLedger', newLedgerPayId);
          const bankLabel = bankPortals.find((b) => b.id === paymentSource)?.label || 'Unknown';

          transaction.set(ledgerPayRef, {
            balance: finalBalance,
            clientName,
            creditPayment: numericReceived,
            date: saleDateObj,
            debitSale: 0,
            description: 'Payment',
            ledgerId: newLedgerPayId,
            notes: bankLabel,
            serialNumber: selectedVehicle.serialNumber,
            status: true,
          });

          // Update Bank Balance
          if (bankRef) {
            transaction.update(bankRef, { balance: currentBankBalance + numericReceived });
          }

          // Create Bank Transaction
          const bankTxRef = doc(db, 'bankTransaction', newBankTxId);
          transaction.set(bankTxRef, {
            amount: numericReceived,
            bankPortalName: bankLabel,
            date: saleDateObj,
            description: `Client Payment - ${selectedVehicle.serialNumber} ${clientName}`,
            status: true,
            transactionId: newBankTxId,
            type: 'Credit',
          });

          // Update Counters
          transaction.update(countersRef, {
            lastBankTransaction: newBankTxId,
            lastClientLedger: newLedgerPayId,
            lastSoldVehicles: newSoldId,
          });
        } else {
          // Update Counters only for Sale
          transaction.update(countersRef, {
            lastClientLedger: newLedgerSaleId,
            lastSoldVehicles: newSoldId,
          });
        }

        return { newSoldId, newBankTxId, numericPrice, numericReceived, clientName };
      });

      // Send Google Chat Notification
      try {
        await sendGoogleChatNotification({
          header: {
            title: '🤝 Vehicle Sold',
            subtitle: 'Marakish Group',
          },
          sections: [
            {
              widgets: [
                { keyValue: { topLabel: 'Client', content: result.clientName, icon: 'PERSON' } },
                {
                  keyValue: {
                    topLabel: 'Vehicle',
                    content: `${selectedVehicle.serialNumber} - ${selectedVehicle.manufacturer} ${selectedVehicle.model}`,
                    icon: 'CAR',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Sale Price',
                    content: formatCurrency(result.numericPrice),
                    icon: 'DOLLAR',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Received',
                    content: formatCurrency(result.numericReceived),
                    icon: 'MONEY',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Date',
                    content: dayjs(saleDate).format('DD/MM/YYYY'),
                    icon: 'CLOCK',
                  },
                },
              ],
            },
            {
              header: 'Transaction IDs',
              widgets: [
                { keyValue: { topLabel: 'Sale ID', content: result.newSoldId, icon: 'DESCRIPTION' } },
                {
                  keyValue: {
                    topLabel: 'Bank ID',
                    content: result.newBankTxId || 'N/A',
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
          title: 'Vehicle Sold',
          description: `${selectedVehicle.manufacturer} ${selectedVehicle.model} (${selectedVehicle.serialNumber}) sold to ${result.clientName} for ${formatCurrency(result.numericPrice)}`,
          type: 'vehicle-sale',
        });
      } catch (notifError) {
        console.error('Internal notification failed (non-critical):', notifError);
      }
      console.log('Transaction committed successfully!');
      setSnackbar({ open: true, message: t('vehicles.sell.messages.sellSuccess'), severity: 'success' });
      if (onUpdate) onUpdate();
      onClose();
    } catch (e: any) {
      console.error('Sale transaction failed: ', e);
      setSnackbar({ open: true, message: `Failed to sell vehicle: ${e.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const selectedBank = bankPortals.find((b) => b.id === paymentSource);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {editData ? 'Edit Sale' : t('vehicles.sell.title')}
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
            label={t('vehicles.sell.labels.transactionDate')}
            type="date"
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Autocomplete
            options={availableVehicles}
            getOptionLabel={(option) =>
              `${option.serialNumber} - ${option.manufacturer} ${option.model} (${option.modelYear})`
            }
            value={selectedVehicle}
            onChange={(event, newValue) => setSelectedVehicle(newValue)}
            disabled={!!editData}
            renderInput={(params) => <TextField {...params} label={t('vehicles.sell.labels.vehicleSerial')} required />}
          />

          {selectedVehicle && (
            <Box
              sx={{ gridColumn: 'span 2', p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="subtitle2">
                  {t('vehicles.sell.labels.vehiclePreview')}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setShowAccruedCost(!showAccruedCost)}
                  sx={{
                    bgcolor: showAccruedCost ? 'primary.lighter' : 'action.hover',
                    '&:hover': { bgcolor: showAccruedCost ? 'primary.light' : 'action.selected' },
                  }}
                >
                  <Iconify
                    icon={showAccruedCost ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    width={18}
                  />
                </IconButton>
              </Box>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                <DetailBox label={t('vehicles.table.vin')} value={selectedVehicle.vinChassisNumber} />
                <DetailBox label={t('vehicles.table.vendor')} value={selectedVehicle.vendor} />
                <DetailBox label={t('vehicles.table.crn')} value={selectedVehicle.crn} />
                <DetailBox label={t('vehicles.table.parking')} value={selectedVehicle.parkingLocation} />
                <DetailBox label={t('vehicles.table.mubaya')} value={selectedVehicle.mubayaStatus} />
                {showAccruedCost && (
                  <DetailBox
                    label={t('vehicles.sell.labels.accruedCost')}
                    value={selectedVehicle.totalAccruedCost?.toLocaleString()}
                  />
                )}
              </Box>
            </Box>
          )}

          <Autocomplete
            options={clients}
            getOptionLabel={(option) => option.label}
            value={clients.find((c) => c.id === clientName) || null}
            onChange={(event, newValue) => setClientName(newValue ? newValue.id : '')}
            renderInput={(params) => <TextField {...params} label={t('vehicles.sell.labels.clientName')} required />}
          />


          <Box>
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                label={t('vehicles.sell.labels.sellingPrice')}
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                required
              />
              {selectedVehicle && sellingPrice && Number(sellingPrice) > 0 && (
                <IconButton
                  size="small"
                  onClick={() => setShowProfitLoss(!showProfitLoss)}
                  sx={{
                    mt: 1,
                    bgcolor: showProfitLoss ? 'primary.lighter' : 'action.hover',
                    '&:hover': { bgcolor: showProfitLoss ? 'primary.light' : 'action.selected' },
                  }}
                >
                  <Iconify
                    icon={showProfitLoss ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    width={18}
                  />
                </IconButton>
              )}
            </Box>
            {selectedVehicle && sellingPrice && Number(sellingPrice) > 0 && showProfitLoss && (
              <Box
                sx={{
                  mt: 1,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor:
                    Number(sellingPrice) >= (selectedVehicle.totalAccruedCost || 0)
                      ? 'success.lighter'
                      : 'warning.lighter',
                  border: 1,
                  borderColor:
                    Number(sellingPrice) >= (selectedVehicle.totalAccruedCost || 0)
                      ? 'success.main'
                      : 'warning.main',
                  animation: 'slideIn 0.3s ease-out',
                  '@keyframes slideIn': {
                    from: { opacity: 0, transform: 'translateY(-5px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Iconify
                    icon={
                      (Number(sellingPrice) >= (selectedVehicle.totalAccruedCost || 0)
                        ? 'solar:check-circle-bold'
                        : 'solar:danger-triangle-bold') as any
                    }
                    width={20}
                    sx={{
                      color:
                        Number(sellingPrice) >= (selectedVehicle.totalAccruedCost || 0)
                          ? 'success.main'
                          : 'warning.main',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color:
                        Number(sellingPrice) >= (selectedVehicle.totalAccruedCost || 0)
                          ? 'success.darker'
                          : 'warning.darker',
                    }}
                  >
                    {Number(sellingPrice) >= (selectedVehicle.totalAccruedCost || 0)
                      ? `✓ Profitable Sale: +${(
                        Number(sellingPrice) - (selectedVehicle.totalAccruedCost || 0)
                      ).toLocaleString()} AED profit`
                      : `⚠️ Loss Sale: ${(
                        Number(sellingPrice) - (selectedVehicle.totalAccruedCost || 0)
                      ).toLocaleString()} AED loss`}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          <TextField
            fullWidth
            label={t('vehicles.sell.labels.paymentReceived')}
            type="number"
            value={paymentReceived}
            onChange={(e) => setPaymentReceived(e.target.value)}
          />

          <Box>
            <Autocomplete
              options={bankPortals}
              getOptionLabel={(option) => option.label}
              value={bankPortals.find((b) => b.id === paymentSource) || null}
              disabled={!paymentReceived || Number(paymentReceived) <= 0}
              onChange={(event, newValue) => setPaymentSource(newValue ? newValue.id : '')}
              renderInput={(params) => <TextField {...params} label={t('vehicles.sell.labels.paymentSource')} />}
            />
            {selectedBank && (
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: 'success.lighter',
                  animation: 'fadeIn 0.5s ease-out',
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(-5px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                <Typography variant="caption" color="success.darker">
                  {t('vehicles.purchase.labels.availableBalance')}: {selectedBank.balance?.toLocaleString()}
                </Typography>
              </Box>
            )}
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            label={t('vehicles.sell.labels.remarks')}
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
        <Button onClick={handleSubmit} variant="contained" disabled={loading} color="primary">
          {loading ? t('vehicles.sell.messages.processing') : t('vehicles.sell.buttons.sellVehicle')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DetailBox({ label, value }: { label: string; value: any }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2">{value || '-'}</Typography>
    </Box>
  );
}
