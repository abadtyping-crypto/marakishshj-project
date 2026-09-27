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
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { addNotification } from 'src/utils/notifications';
import { formatCurrency, sendGoogleChatNotification } from 'src/utils/google-chat';

import { db } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type VendorPaymentRecord = {
    id: string;
    serialNumber: string;
    vehicleDetails: string;
    vendor: string;
    totalCost: number;
    totalPaid: number;
    balance: number;
    lastPaymentDate?: any;
    payments: any[];
};

type BankPortal = {
    id: string;
    label: string;
    balance: number;
};

export function VendorPaymentsView() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });
    const [records, setRecords] = useState<VendorPaymentRecord[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [filterVendor, setFilterVendor] = useState('All');

    // Payment Dialog
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<VendorPaymentRecord | null>(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentSource, setPaymentSource] = useState('');
    const [paymentDate, setPaymentDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [bankPortals, setBankPortals] = useState<BankPortal[]>([]);

    useEffect(() => {
        fetchVendorPayments();
        fetchBankPortals();
    }, []);

    const fetchBankPortals = async () => {
        try {
            const q = query(collection(db, 'bankPortal'), where('status', '==', true));
            const snap = await getDocs(q);
            setBankPortals(
                snap.docs.map((d) => ({
                    id: d.id,
                    label: d.data().bankPortalName,
                    balance: d.data().balance || 0,
                }))
            );
        } catch (error) {
            console.error('Error fetching bank portals:', error);
        }
    };

    const fetchVendorPayments = async () => {
        setLoading(true);
        try {
            // Get all vehicles
            const vehiclesSnap = await getDocs(collection(db, 'vehicles'));
            const vehicles = vehiclesSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];

            // Get all vendor payments
            const paymentsSnap = await getDocs(collection(db, 'vendorsPayment'));
            const allPayments = paymentsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

            // Group by serial number
            const recordsMap = new Map<string, VendorPaymentRecord>();

            for (const vehicle of vehicles) {
                const sn = vehicle.serialNumber;
                const vehiclePayments = allPayments.filter((p: any) => p.Serial_Number === sn);

                if (vehiclePayments.length > 0) {
                    const totalCost = vehicle.vehiclePurchaseCost || 0;
                    const totalPaid = vehiclePayments.reduce((sum, p: any) => sum + (p.paidAmount || 0), 0);
                    const balance = totalCost - totalPaid;

                    // Only show records with pending balance
                    if (balance > 0) {
                        const sortedPayments: any[] = vehiclePayments.sort((a: any, b: any) => {
                            const dateA = a.date?.seconds || 0;
                            const dateB = b.date?.seconds || 0;
                            return dateB - dateA;
                        });

                        recordsMap.set(sn, {
                            id: sn,
                            serialNumber: sn,
                            vehicleDetails: `${vehicle.manufacturer} ${vehicle.model} (${vehicle.modelYear})`,
                            vendor: vehicle.vendor || 'Unknown',
                            totalCost,
                            totalPaid,
                            balance,
                            lastPaymentDate: sortedPayments[0]?.date,
                            payments: sortedPayments,
                        });
                    }
                }
            }

            setRecords(Array.from(recordsMap.values()));
        } catch (error) {
            console.error('Error fetching vendor payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenPayment = (record: VendorPaymentRecord) => {
        setSelectedRecord(record);
        setPaymentAmount(String(record.balance));
        setPaymentDate(dayjs().format('YYYY-MM-DD'));
        setPaymentSource('');
        setOpenPaymentDialog(true);
    };

    const handleClosePayment = () => {
        setOpenPaymentDialog(false);
        setSelectedRecord(null);
        setPaymentAmount('');
        setPaymentSource('');
    };

    const handleSubmitPayment = async () => {
        if (!selectedRecord || !paymentAmount || !paymentSource || !paymentDate) {
            setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'warning' });
            return;
        }

        const amount = Number(paymentAmount);
        if (amount <= 0 || amount > selectedRecord.balance) {
            setSnackbar({ open: true, message: `Payment amount must be between 0 and ${selectedRecord.balance}`, severity: 'warning' });
            return;
        }

        setLoading(true);
        try {
            await runTransaction(db, async (transaction) => {
                const countersRef = doc(db, 'setting', 'counter');
                const countersDoc = await transaction.get(countersRef);
                const counters = countersDoc.data() || {};

                const bankRef = doc(db, 'bankPortal', paymentSource);
                const bankDoc = await transaction.get(bankRef);
                const bankData = bankDoc.data() as { balance?: number; bankPortalName?: string } | undefined;

                const incrementId = (lastId: string | undefined) => {
                    if (!lastId) return '000001';
                    const prefix = lastId.match(/^[A-Z]+/)?.[0] || '';
                    const numberPart = lastId.match(/\d+$/)?.[0] || '0';
                    const newNumber = String(Number(numberPart) + 1).padStart(4, '0');
                    return prefix + newNumber;
                };

                const generateBankId = (lastId: string | undefined) => {
                    const todayStr = dayjs().format('DDMMYYYY');
                    if (!lastId) return `BNK${todayStr}0001`;
                    const numberStr = lastId.substring(lastId.length - 4);
                    const newNumber = String(Number(numberStr) + 1).padStart(4, '0');
                    return `BNK${todayStr}${newNumber}`;
                };

                const newVendorPaymentId = incrementId(counters.lastVendorsPayment);
                const newBankTxId = generateBankId(counters.lastBankTransaction);
                const payDateObj = Timestamp.fromDate(new Date(paymentDate));
                const bankLabel = bankData?.bankPortalName || 'Unknown';

                // Create vendor payment record
                const vpRef = doc(db, 'vendorsPayment', newVendorPaymentId);
                transaction.set(vpRef, {
                    Serial_Number: selectedRecord.serialNumber,
                    balance: selectedRecord.balance - amount,
                    date: payDateObj,
                    paidAmount: amount,
                    paidPortal: bankLabel,
                    status: true,
                    vehiclePurchaseId: selectedRecord.totalCost,
                    vendorName: selectedRecord.vendor,
                    transactionId: newVendorPaymentId,
                });

                // Update bank balance
                const currentBankBalance = bankData?.balance || 0;
                transaction.update(bankRef, { balance: currentBankBalance - amount });

                // Create bank transaction
                const btRef = doc(db, 'bankTransaction', newBankTxId);
                transaction.set(btRef, {
                    transactionId: newBankTxId,
                    amount,
                    bankPortalName: bankLabel,
                    date: payDateObj,
                    description: `Vendor Payment: ${selectedRecord.serialNumber} - ${selectedRecord.vendor}`,
                    status: true,
                    type: 'Debit',
                });

                // Update counters
                transaction.update(countersRef, {
                    lastVendorsPayment: newVendorPaymentId,
                    lastBankTransaction: newBankTxId,
                });
            });

            // Send notification
            try {
                await sendGoogleChatNotification({
                    header: {
                        title: '💰 Vendor Payment Made',
                        subtitle: 'Marakish Group',
                    },
                    sections: [
                        {
                            widgets: [
                                {
                                    keyValue: {
                                        topLabel: 'Vehicle',
                                        content: `${selectedRecord.serialNumber} - ${selectedRecord.vehicleDetails}`,
                                        icon: 'CAR',
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: 'Vendor',
                                        content: selectedRecord.vendor,
                                        icon: 'PERSON',
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: 'Amount Paid',
                                        content: formatCurrency(amount),
                                        icon: 'DOLLAR',
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: 'Remaining Balance',
                                        content: formatCurrency(selectedRecord.balance - amount),
                                        icon: 'PENDING',
                                    },
                                },
                            ],
                        },
                    ],
                });
            } catch (chatError) {
                console.error('Google Chat notification failed:', chatError);
            }

            await addNotification({
                title: 'Vendor Payment Recorded',
                description: `Paid ${formatCurrency(amount)} to ${selectedRecord.vendor} for ${selectedRecord.serialNumber}`,
                type: 'vehicle-expense',
            });

            setSnackbar({ open: true, message: 'Payment recorded successfully!', severity: 'success' });
            handleClosePayment();
            fetchVendorPayments();
        } catch (error: any) {
            console.error('Payment error:', error);
            setSnackbar({ open: true, message: `Failed to record payment: ${error.message}`, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const dataFiltered = records.filter((r) => filterVendor === 'All' || r.vendor === filterVendor);
    const vendors = ['All', ...Array.from(new Set(records.map((r) => r.vendor)))];
    const totalPending = dataFiltered.reduce((sum, r) => sum + r.balance, 0);

    const selectedBank = bankPortals.find((b) => b.id === paymentSource);

    return (
        <DashboardContent maxWidth={false}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
                <Typography variant="h4">Vendor Payments</Typography>
            </Stack>

            <Card sx={{ p: 2, mb: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <Autocomplete
                        fullWidth
                        options={vendors}
                        value={filterVendor}
                        onChange={(e, v) => setFilterVendor(v || 'All')}
                        renderInput={(params) => <TextField {...params} label="Filter by Vendor" />}
                    />
                    <Box
                        sx={{
                            p: 2,
                            minWidth: 250,
                            borderRadius: 1,
                            bgcolor: 'error.lighter',
                            border: '1px solid',
                            borderColor: 'error.main',
                        }}
                    >
                        <Typography variant="caption" color="error.darker" sx={{ fontWeight: 700 }}>
                            TOTAL PENDING
                        </Typography>
                        <Typography variant="h5" color="error.darker" sx={{ fontWeight: 800 }}>
                            {formatCurrency(totalPending)}
                        </Typography>
                    </Box>
                </Stack>
            </Card>

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Serial Number</TableCell>
                                    <TableCell>Vehicle</TableCell>
                                    <TableCell>Vendor</TableCell>
                                    <TableCell align="right">Total Cost</TableCell>
                                    <TableCell align="right">Total Paid</TableCell>
                                    <TableCell align="right">Balance</TableCell>
                                    <TableCell>Last Payment</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                    {row.serialNumber}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{row.vehicleDetails}</TableCell>
                                            <TableCell>{row.vendor}</TableCell>
                                            <TableCell align="right">{formatCurrency(row.totalCost)}</TableCell>
                                            <TableCell align="right">{formatCurrency(row.totalPaid)}</TableCell>
                                            <TableCell align="right">
                                                <Label color="error" sx={{ fontWeight: 700 }}>
                                                    {formatCurrency(row.balance)}
                                                </Label>
                                            </TableCell>
                                            <TableCell>
                                                {row.lastPaymentDate
                                                    ? dayjs(row.lastPaymentDate.seconds * 1000).format('DD MMM YYYY')
                                                    : '-'}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => handleOpenPayment(row)}
                                                    startIcon={<Iconify icon={"solar:card-send-bold" as any} />}
                                                >
                                                    Pay
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                {dataFiltered.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center" sx={{ py: 10 }}>
                                            <Typography variant="h6" color="text.secondary">
                                                No pending vendor payments
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={dataFiltered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                />
            </Card>

            {/* Payment Dialog */}
            <Dialog open={openPaymentDialog} onClose={handleClosePayment} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Make Vendor Payment
                    <IconButton onClick={handleClosePayment}>
                        <Iconify icon="mingcute:close-line" />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    {selectedRecord && (
                        <Box sx={{ mb: 3, p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Vehicle: {selectedRecord.serialNumber} - {selectedRecord.vehicleDetails}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                Vendor: {selectedRecord.vendor}
                            </Typography>
                            <Typography variant="h6" color="error.main" sx={{ mt: 1 }}>
                                Outstanding Balance: {formatCurrency(selectedRecord.balance)}
                            </Typography>
                        </Box>
                    )}

                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="Payment Date *"
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            fullWidth
                            label="Payment Amount *"
                            type="number"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            helperText={`Maximum: ${formatCurrency(selectedRecord?.balance || 0)}`}
                        />

                        <Box>
                            <Autocomplete
                                options={bankPortals}
                                getOptionLabel={(o) => o.label}
                                value={bankPortals.find((b) => b.id === paymentSource) || null}
                                onChange={(e, v) => setPaymentSource(v ? v.id : '')}
                                renderInput={(params) => <TextField {...params} label="Payment Source *" required />}
                            />
                            {selectedBank && (
                                <Box
                                    sx={{
                                        mt: 1,
                                        p: 1,
                                        borderRadius: 1,
                                        bgcolor: selectedBank.balance >= 0 ? 'success.lighter' : 'error.lighter',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: selectedBank.balance >= 0 ? 'success.darker' : 'error.darker',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Available Balance: {formatCurrency(selectedBank.balance)}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
                    <Button onClick={handleClosePayment} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitPayment} variant="contained" color="success" disabled={loading}>
                        {loading ? 'Processing...' : 'Record Payment'}
                    </Button>
                </DialogActions>
            </Dialog>

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
        </DashboardContent>
    );
}
