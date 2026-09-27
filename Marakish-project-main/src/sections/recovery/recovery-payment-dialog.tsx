import dayjs from 'dayjs';
import { useState, useEffect, useCallback } from 'react';
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
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { db } from 'src/firebase';


// ----------------------------------------------------------------------

type RecoveryPaymentDialogProps = {
    open: boolean;
    onClose: () => void;
    onUpdate?: () => void;
    recoveryPerson: string;
    selectedRecoveryIds?: string[];
};

export function RecoveryPaymentDialog({ open, onClose, onUpdate, recoveryPerson, selectedRecoveryIds }: RecoveryPaymentDialogProps) {
    const [loading, setLoading] = useState(false);
    const [pendingRecoveries, setPendingRecoveries] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [paymentSource, setPaymentSource] = useState('');
    const [bankPortals, setBankPortals] = useState<any[]>([]);
    const [paymentDate, setPaymentDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

    const fetchData = useCallback(async () => {
        try {
            const q = query(
                collection(db, 'recovery'),
                where('Recovery Person', '==', recoveryPerson),
                where('Payment Status', '==', false)
            );
            const snap = await getDocs(q);
            setPendingRecoveries(snap.docs.map(d => ({ id: d.id, ...d.data() })));

            const bankQ = query(collection(db, 'bankPortal'), where('status', '==', true));
            const bankSnap = await getDocs(bankQ);
            setBankPortals(bankSnap.docs.map(d => ({ id: d.id, label: d.data().bankPortalName, balance: d.data().balance })));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [recoveryPerson]);

    useEffect(() => {
        if (open && recoveryPerson) {
            fetchData();
            setSelectedIds(selectedRecoveryIds || []);
            setPaymentSource('');
            setPaymentDate(dayjs().format('YYYY-MM-DD'));
        }
    }, [open, recoveryPerson, selectedRecoveryIds, fetchData]);

    const handleToggle = (id: string) => {
        const currentIndex = selectedIds.indexOf(id);
        const newSelected = [...selectedIds];
        if (currentIndex === -1) {
            newSelected.push(id);
        } else {
            newSelected.splice(currentIndex, 1);
        }
        setSelectedIds(newSelected);
    };

    const calculateTotal = () => pendingRecoveries
        .filter(r => selectedIds.includes(r.id))
        .reduce((acc, curr) => acc + (curr.Amount || 0), 0);

    const handleSubmit = async () => {
        if (!paymentSource || selectedIds.length === 0) {
            setSnackbar({ open: true, message: 'Please select payment source and at least one transaction', severity: 'warning' });
            return;
        }

        setLoading(true);
        const totalAmount = calculateTotal();
        const selectedBank = bankPortals.find(b => b.id === paymentSource);

        try {
            // Pre-fetch vehicle mapping (serialNumber -> docId)
            const selectedRecoveries = pendingRecoveries.filter(r => selectedIds.includes(r.id));
            const serialNumbers = Array.from(new Set(selectedRecoveries.map(r => r['Serial Number'])));

            const vehicleMapping: Record<string, string> = {};
            if (serialNumbers.length > 0) {
                const vQ = query(collection(db, 'vehicles'), where('serialNumber', 'in', serialNumbers));
                const vSnap = await getDocs(vQ);
                vSnap.forEach(d => {
                    vehicleMapping[d.data().serialNumber] = d.id;
                });
            }

            await runTransaction(db, async (transaction) => {
                const countersRef = doc(db, 'setting', 'counter');
                const countersDoc = await transaction.get(countersRef);
                const counters = countersDoc.data() || {};

                let lastBankId = counters.lastBankTransaction || '';
                const generateBankId = (lastId: string) => {
                    const todayStr = dayjs().format('DDMMYYYY');
                    const numberPart = lastId.substring(lastId.length - 4);
                    const newNumber = String(Number(numberPart || 0) + 1).padStart(4, '0');
                    return `BNK${todayStr}${newNumber}`;
                };

                const paymentDateObj = Timestamp.fromDate(new Date(paymentDate));

                for (const r of selectedRecoveries) {
                    const recoveryRef = doc(db, 'recovery', r.id);

                    // 1. Update Recovery Status
                    transaction.update(recoveryRef, { 'Payment Status': true });

                    // 2. Update Vehicle Expense
                    if (r.VEXID) {
                        const vexRef = doc(db, 'vehicleExpenses', r.VEXID);
                        transaction.update(vexRef, {
                            status: true,
                            bankPortalName: selectedBank.label
                        });
                    }

                    // 3. Update Vehicle totalAccruedCost
                    const vDocId = vehicleMapping[r['Serial Number']];
                    if (vDocId) {
                        const vRef = doc(db, 'vehicles', vDocId);
                        const vSnap = await transaction.get(vRef);
                        if (vSnap.exists()) {
                            const currentCost = vSnap.data().totalAccruedCost || 0;
                            transaction.update(vRef, { totalAccruedCost: currentCost + (r.Amount || 0) });
                        }
                    }

                    // 4. Create Bank Transaction
                    const newBankId = generateBankId(lastBankId);
                    const bankTxRef = doc(db, 'bankTransaction', newBankId);
                    transaction.set(bankTxRef, {
                        amount: r.Amount,
                        bankPortalName: selectedBank.label,
                        date: paymentDateObj,
                        description: `Recovery Payment: ${r['Serial Number']} - ${r.From} to ${r.To}`,
                        status: true,
                        transactionId: newBankId,
                        type: 'Debit',
                    });
                    lastBankId = newBankId;
                }

                // 5. Update Bank Balance
                const bankRef = doc(db, 'bankPortal', paymentSource);
                const freshBank = await transaction.get(bankRef);
                const currentBalance = freshBank.data()?.balance || 0;
                transaction.update(bankRef, { balance: currentBalance - totalAmount });

                // 6. Update Counters
                transaction.update(countersRef, { lastBankTransaction: lastBankId });
            });

            setSnackbar({ open: true, message: 'Payment recorded successfully', severity: 'success' });
            if (onUpdate) onUpdate();
            onClose();
        } catch (error: any) {
            console.error('Payment failed:', error);
            setSnackbar({ open: true, message: `Payment failed: ${error.message}`, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const selectedBankData = bankPortals.find(b => b.id === paymentSource);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Pay Recoveries: {recoveryPerson}
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Payment Date"
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                    />
                    <Autocomplete
                        options={bankPortals}
                        getOptionLabel={(o) => o.label}
                        value={selectedBankData || null}
                        onChange={(e, v) => setPaymentSource(v ? v.id : '')}
                        renderInput={(params) => <TextField {...params} label="Payment Source" required />}
                    />
                    {selectedBankData && (
                        <Box
                            sx={{
                                mt: 1,
                                p: 0.5,
                                px: 1,
                                borderRadius: 0.5,
                                bgcolor: selectedBankData.balance >= 0 ? 'success.lighter' : 'error.lighter',
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    color: selectedBankData.balance >= 0 ? 'success.darker' : 'error.darker',
                                    fontWeight: 'bold'
                                }}
                            >
                                Current Balance: {selectedBankData.balance.toLocaleString()} AED
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Pending Transactions:</Typography>
                <Card variant="outlined">
                    <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                        {pendingRecoveries.map((r) => (
                            <ListItem
                                key={r.id}
                                dense
                                onClick={() => handleToggle(r.id)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selectedIds.indexOf(r.id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={`${r['Serial Number']} - ${r.Amount} AED`}
                                    secondary={`${dayjs(r.Date?.seconds * 1000).format('DD/MM/YYYY')} | ${r.From} -> ${r.To}`}
                                />
                            </ListItem>
                        ))}
                        {pendingRecoveries.length === 0 && (
                            <ListItem><ListItemText primary="No pending transactions found" /></ListItem>
                        )}
                    </List>
                </Card>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total: {calculateTotal()} AED</Typography>
                <Box gap={1} display="flex">
                    <Button onClick={onClose} variant="outlined">Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={loading || selectedIds.length === 0}
                    >
                        {loading ? 'Processing...' : 'Pay Selected'}
                    </Button>
                </Box>
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
