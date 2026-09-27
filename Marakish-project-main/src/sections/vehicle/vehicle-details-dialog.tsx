import type { Vehicle } from 'src/types/vehicle';

import dayjs from 'dayjs';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState, useEffect, useCallback } from 'react';
import { doc, query, where, getDocs, collection, runTransaction } from 'firebase/firestore';

import Box from '@mui/material/Box';
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
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';

import { db } from 'src/firebase';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { VehicleExpenseDialog } from './vehicle-expense-dialog';

// ----------------------------------------------------------------------

type Props = {
    open: boolean;
    onClose: () => void;
    vehicle: Vehicle | null;
};

export function VehicleDetailsDialog({ open, onClose, vehicle }: Props) {
    const [expenses, setExpenses] = useState<any[]>([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<any>(null);

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });
    const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; expense: any | null }>({ open: false, expense: null });

    const fetchExpenses = useCallback(async () => {
        if (!vehicle) return;
        try {
            const q = query(
                collection(db, 'vehicleExpenses'),
                where('serialNumber', '==', vehicle.serialNumber.trim())
            );
            const snap = await getDocs(q);
            const list = snap.docs.map((d) => d.data());
            // Sort in-memory instead of query to avoid composite index requirement
            list.sort((a, b) => {
                const dateA = a.date?.seconds || 0;
                const dateB = b.date?.seconds || 0;
                return dateB - dateA;
            });
            setExpenses(list);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }, [vehicle]);

    useEffect(() => {
        if (open && vehicle) {
            fetchExpenses();
        }
    }, [open, vehicle, fetchExpenses]);

    const totalExpenses = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalCost = (vehicle?.vehiclePurchaseCost || 0) + totalExpenses;

    const handleDeleteExpense = (expense: any) => {
        setDeleteConfirm({ open: true, expense });
    };

    const performDeleteExpense = async () => {
        const expense = deleteConfirm.expense;
        if (!expense) return;
        setDeleteConfirm({ open: false, expense: null });

        try {
            // Find Bank Transaction ID beforehand
            const btQ = query(
                collection(db, 'bankTransaction'),
                where('amount', '==', expense.amount),
                where('bankPortalName', '==', expense.bankPortalName),
                where('type', '==', 'Debit')
            );
            const btSnap = await getDocs(btQ);
            const btToDelete = btSnap.docs.find(d => d.data().description.includes(expense.serialNumber));
            const btToDeleteId = btToDelete ? btToDelete.id : null;

            await runTransaction(db, async (transaction) => {
                // Fetch counters
                const countersRef = doc(db, 'setting', 'counter');
                const countersDoc = await transaction.get(countersRef);
                const counters = countersDoc.exists() ? countersDoc.data() : {};

                // Helper to decrement ID
                const decrementId = (id: string) => {
                    const prefix = id.match(/^[A-Z]+/)?.[0] || '';
                    const numberPart = id.match(/\d+$/)?.[0] || '0';
                    if (Number(numberPart) <= 0) return id;
                    const newNumber = String(Number(numberPart) - 1).padStart(numberPart.length, '0');
                    return prefix + newNumber;
                };

                // Helper to check and decrement
                const checkAndDecrement = (
                    idsToDelete: string[],
                    currentLastId: string | undefined
                ) => {
                    if (!currentLastId) return currentLastId;
                    let tempLast = currentLastId;
                    const sorted = [...idsToDelete].sort().reverse();
                    for (const id of sorted) {
                        if (id === tempLast) {
                            tempLast = decrementId(tempLast);
                        }
                    }
                    return tempLast;
                };

                // Calculate new counters
                const newLastVehicleExpenses = checkAndDecrement([expense.transactionId], counters.lastVehicleExpenses);
                const newLastBankTransaction = btToDeleteId
                    ? checkAndDecrement([btToDeleteId], counters.lastBankTransaction)
                    : counters.lastBankTransaction;

                // 1. Find Bank Portal and reverse balance
                // Optimally we should just get the doc if we knew the ID, but we query by name.
                // Since this is existing logic, we keep the query pattern but we must use it carefully.
                // We'll trust the name is unique or we take the first one.
                const bankQ = query(collection(db, 'bankPortal'), where('bankPortalName', '==', expense.bankPortalName));
                const bankSnap = await getDocs(bankQ);
                if (!bankSnap.empty) {
                    const bankRef = bankSnap.docs[0].ref;
                    const bankDoc = await transaction.get(bankRef);
                    const bal = bankDoc.data()?.balance || 0;
                    transaction.update(bankRef, { balance: bal + expense.amount });
                }

                // 2. Find Vehicle and reverse totalAccruedCost
                const vehQ = query(collection(db, 'vehicles'), where('serialNumber', '==', expense.serialNumber));
                const vehSnap = await getDocs(vehQ);
                if (!vehSnap.empty) {
                    const vehRef = vehSnap.docs[0].ref;
                    const vehDoc = await transaction.get(vehRef);
                    const totalAccrued = vehDoc.data()?.totalAccruedCost || 0;
                    transaction.update(vehRef, { totalAccruedCost: totalAccrued - expense.amount });
                }

                // 3. Delete Bank Transaction
                if (btToDeleteId) {
                    transaction.delete(doc(db, 'bankTransaction', btToDeleteId));
                }

                // 4. Delete Vehicle Expense
                transaction.delete(doc(db, 'vehicleExpenses', expense.transactionId));

                // 5. Update Counters
                const updates: any = {};
                if (newLastVehicleExpenses !== counters.lastVehicleExpenses) updates.lastVehicleExpenses = newLastVehicleExpenses;
                if (newLastBankTransaction !== counters.lastBankTransaction) updates.lastBankTransaction = newLastBankTransaction;

                if (Object.keys(updates).length > 0) {
                    transaction.update(countersRef, updates);
                }
            });

            setSnackbar({ open: true, message: 'Expense deleted successfully.', severity: 'success' });
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
            setSnackbar({ open: true, message: 'Failed to delete expense.', severity: 'error' });
        }
    };

    const handlePrint = () => {
        if (!vehicle) return;

        const pdfDoc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdfDoc.internal.pageSize.width;

        // Header
        pdfDoc.setFontSize(22);
        pdfDoc.setTextColor(33, 43, 54);
        pdfDoc.text('Marakish Group', 14, 20);

        pdfDoc.setFontSize(9);
        pdfDoc.setTextColor(145, 158, 171);
        pdfDoc.text(`Generated on: ${dayjs().format('DD MMM YYYY, HH:mm')}`, pageWidth - 14, 20, { align: 'right' });

        pdfDoc.setFontSize(16);
        pdfDoc.setTextColor(33, 43, 54);
        pdfDoc.text('Vehicle Financial Statement', 14, 32);

        // --- Vehicle Identification ---
        pdfDoc.setFillColor(244, 246, 248);
        pdfDoc.roundedRect(14, 38, pageWidth - 28, 25, 2, 2, 'F');

        pdfDoc.setFontSize(9);
        pdfDoc.setTextColor(99, 115, 129);
        pdfDoc.text('SERIAL NUMBER', 20, 46);
        pdfDoc.text('VEHICLE DETAILS', 20, 52);
        pdfDoc.text('VIN / CHASSIS', 20, 58);

        pdfDoc.setTextColor(33, 43, 54);
        pdfDoc.setFont('helvetica', 'bold');
        pdfDoc.text(vehicle.serialNumber, 60, 46);
        pdfDoc.text(`${vehicle.manufacturer} ${vehicle.model} (${vehicle.modelYear})`, 60, 52);
        pdfDoc.text(vehicle.vinChassisNumber || '-', 60, 58);

        // --- Summary Figures ---
        const currentY = 70;
        const boxWidth = (pageWidth - 42) / 3;

        // Purchase Box
        pdfDoc.setFillColor(244, 246, 248);
        pdfDoc.roundedRect(14, currentY, boxWidth, 20, 1, 1, 'F');
        pdfDoc.setFontSize(8);
        pdfDoc.setTextColor(99, 115, 129);
        pdfDoc.text('PURCHASE PRICE', 18, currentY + 7);
        pdfDoc.setFontSize(11);
        pdfDoc.setTextColor(33, 43, 54);
        pdfDoc.text(`${vehicle?.vehiclePurchaseCost?.toLocaleString()} AED`, 18, currentY + 15);

        // Expenses Box
        pdfDoc.setFillColor(255, 247, 247);
        pdfDoc.roundedRect(14 + boxWidth + 7, currentY, boxWidth, 20, 1, 1, 'F');
        pdfDoc.setFontSize(8);
        pdfDoc.setTextColor(183, 29, 24);
        pdfDoc.text('ADDITIONAL EXPENSES', 18 + boxWidth + 7, currentY + 7);
        pdfDoc.setFontSize(11);
        pdfDoc.text(`${totalExpenses.toLocaleString()} AED`, 18 + boxWidth + 7, currentY + 15);

        // Total Accrued
        pdfDoc.setFillColor(33, 43, 54);
        pdfDoc.roundedRect(14 + (boxWidth + 7) * 2, currentY, boxWidth, 20, 1, 1, 'F');
        pdfDoc.setFontSize(8);
        pdfDoc.setTextColor(255, 255, 255);
        pdfDoc.text('TOTAL ACCRUED COST', 18 + (boxWidth + 7) * 2, currentY + 7);
        pdfDoc.setFontSize(11);
        pdfDoc.text(`${totalCost.toLocaleString()} AED`, 18 + (boxWidth + 7) * 2, currentY + 15);

        // --- Table Section ---
        const tableBody: any[] = [
            [{ content: '1. VEHICLE ACQUISITION', colSpan: 5, styles: { fillColor: [244, 246, 248], fontStyle: 'bold' as any, textColor: [33, 43, 54] } }],
            ['Initial Purchase', dayjs(vehicle.purchasingDate?.seconds * 1000 || vehicle.purchasingDate).format('DD MMM YYYY'), vehicle.vendor || '-', '-', { content: `${vehicle.vehiclePurchaseCost?.toLocaleString()} AED`, styles: { fontStyle: 'bold' as any } }],
        ];

        if (expenses.length > 0) {
            tableBody.push([{ content: '2. MAINTENANCE & OTHER EXPENSES', colSpan: 5, styles: { fillColor: [244, 246, 248], fontStyle: 'bold' as any, textColor: [33, 43, 54] } }]);
            expenses.forEach(e => {
                tableBody.push([
                    e.category || 'Misc',
                    dayjs(e.date?.seconds * 1000 || e.date).format('DD MMM YYYY'),
                    e.bankPortalName || '-',
                    e.notes || '-',
                    `${e.amount?.toLocaleString()} AED`
                ]);
            });
        }

        autoTable(pdfDoc, {
            startY: currentY + 30,
            head: [['Description', 'Date', 'Source / Vendor', 'Observations', 'Amount (AED)']],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [33, 43, 54], fontSize: 9, halign: 'center' },
            styles: { fontSize: 8.5, cellPadding: 3, textColor: [33, 43, 54] },
            columnStyles: {
                4: { halign: 'right' }
            },
            foot: [['GRAND TOTAL ACCRUED COST', '', '', '', `${totalCost.toLocaleString()} AED`]],
            footStyles: { fillColor: [33, 43, 54], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'right', fontSize: 10 }
        });

        window.open(pdfDoc.output('bloburl'), '_blank');
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ m: 0, p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Vehicle Statement: <Box component="span" sx={{ color: 'primary.main' }}>{vehicle?.serialNumber}</Box>
                </Typography>
                <IconButton onClick={onClose} sx={{ color: 'text.disabled' }}>
                    <Iconify icon="mingcute:close-line" />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 3, bgcolor: 'background.default' }}>
                <Stack spacing={4}>
                    {/* Identification Header */}
                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(5, 1fr)' }}
                        gap={3}
                        sx={{
                            p: 2.5,
                            bgcolor: 'background.neutral',
                            borderRadius: 1.5,
                            border: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Box>
                            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Vehicle Identity</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{vehicle?.manufacturer} {vehicle?.model}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Model Year</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{vehicle?.modelYear}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Chassis Number</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>{vehicle?.vinChassisNumber || 'N/A'}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Parking</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{vehicle?.parkingLocation || 'N/A'}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Mubaya Status</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{vehicle?.mubayaStatus || 'N/A'}</Typography>
                        </Box>
                    </Box>

                    {/* Financial Blocks */}
                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }}
                        gap={3}
                    >
                        <Card sx={{ p: 2.5, position: 'relative', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', boxShadow: (theme: any) => theme.customShadows?.card }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Iconify icon={"solar:cart-bold" as any} width={32} sx={{ color: 'primary.main', opacity: 0.8 }} />
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>PURCHASE PRICE</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800 }}>{vehicle?.vehiclePurchaseCost?.toLocaleString()} <Typography component="span" variant="caption">AED</Typography></Typography>
                                </Box>
                            </Stack>
                        </Card>

                        <Card sx={{ p: 2.5, position: 'relative', bgcolor: 'error.lighter', border: '1px solid', borderColor: 'error.light', boxShadow: 'none' }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Iconify icon={"solar:ruler-cross-pen-bold" as any} width={32} sx={{ color: 'error.main', opacity: 0.8 }} />
                                <Box>
                                    <Typography variant="caption" color="error.dark" sx={{ fontWeight: 700 }}>OTHER EXPENSES</Typography>
                                    <Typography variant="h5" color="error.darker" sx={{ fontWeight: 800 }}>{totalExpenses.toLocaleString()} <Typography component="span" variant="caption">AED</Typography></Typography>
                                </Box>
                            </Stack>
                        </Card>

                        <Card sx={{ p: 2.5, position: 'relative', bgcolor: 'primary.darker', border: 'none', boxShadow: (theme: any) => theme.customShadows?.primary }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Iconify icon={"solar:box-minimalistic-bold" as any} width={32} sx={{ color: 'primary.lighter', opacity: 0.8 }} />
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'primary.lighter', fontWeight: 700, opacity: 0.8 }}>TOTAL ACCRUED</Typography>
                                    <Typography variant="h5" sx={{ color: 'common.white', fontWeight: 800 }}>{totalCost.toLocaleString()} <Typography component="span" variant="caption">AED</Typography></Typography>
                                </Box>
                            </Stack>
                        </Card>
                    </Box>

                    {/* Detailed Analysis Table */}
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Iconify icon={"solar:bill-list-bold" as any} />
                            Financial Breakdown
                        </Typography>

                        <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, overflow: 'hidden', bgcolor: 'background.paper' }}>
                            <Scrollbar>
                                <Table size="small">
                                    <TableHead sx={{ bgcolor: 'background.neutral' }}>
                                        <TableRow>
                                            <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Description</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Date</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Provider / Bank</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Note</TableCell>
                                            <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 700 }}>Amount</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Acquisition Section */}
                                        <TableRow sx={{ bgcolor: 'action.hover' }}>
                                            <TableCell colSpan={6} sx={{ py: 1, fontWeight: 800, color: 'text.primary', fontSize: '0.75rem', letterSpacing: 1 }}>
                                                1. VEHICLE ACQUISITION
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell sx={{ fontWeight: 600 }}>Initial Purchase Cost</TableCell>
                                            <TableCell>{vehicle?.purchasingDate ? dayjs(vehicle.purchasingDate.seconds * 1000 || vehicle.purchasingDate).format('DD MMM YYYY') : '-'}</TableCell>
                                            <TableCell>{vehicle?.vendor || 'Unknown'}</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 800 }}>{vehicle?.vehiclePurchaseCost?.toLocaleString()} AED</TableCell>
                                            <TableCell>-</TableCell>
                                        </TableRow>

                                        {/* Maintenance Section */}
                                        {expenses.length > 0 && (
                                            <>
                                                <TableRow sx={{ bgcolor: 'action.hover' }}>
                                                    <TableCell colSpan={6} sx={{ py: 1, fontWeight: 800, color: 'text.primary', fontSize: '0.75rem', letterSpacing: 1, mt: 2 }}>
                                                        2. MAINTENANCE & REHABILITATION
                                                    </TableCell>
                                                </TableRow>
                                                {expenses.map((exp, index) => (
                                                    <TableRow key={index} hover>
                                                        <TableCell sx={{ pl: 3 }}>{exp.category}</TableCell>
                                                        <TableCell>{dayjs(exp.date.seconds * 1000 || exp.date).format('DD MMM YYYY')}</TableCell>
                                                        <TableCell>{exp.bankPortalName}</TableCell>
                                                        <TableCell sx={{ color: 'text.secondary', fontStyle: 'italic' }}>{exp.notes || '-'}</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 600 }}>{exp.amount?.toLocaleString()} AED</TableCell>
                                                        <TableCell>
                                                            <Stack direction="row" spacing={1}>
                                                                <IconButton
                                                                    size="small"
                                                                    color="primary"
                                                                    onClick={() => {
                                                                        setSelectedExpense(exp);
                                                                        setOpenEditDialog(true);
                                                                    }}
                                                                >
                                                                    <Iconify icon="solar:pen-bold" />
                                                                </IconButton>
                                                                <IconButton
                                                                    size="small"
                                                                    color="error"
                                                                    onClick={() => handleDeleteExpense(exp)}
                                                                >
                                                                    <Iconify icon="solar:trash-bin-trash-bold" />
                                                                </IconButton>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                        )}

                                        {expenses.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.disabled', fontStyle: 'italic' }}>
                                                    No additional maintenance expenses recorded.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </TableContainer>
                    </Box>
                </Stack>
            </DialogContent>

            <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'flex-end', gap: 1.5, bgcolor: 'background.default' }}>
                <Button variant="outlined" color="inherit" onClick={onClose} sx={{ px: 3 }}>
                    Close
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Iconify icon={"solar:printer-minimalistic-bold" as any} />}
                    onClick={handlePrint}
                    sx={{ px: 3, boxShadow: (theme: any) => theme.customShadows?.primary }}
                >
                    Print Statement
                </Button>
            </Box>

            {openEditDialog && (
                <VehicleExpenseDialog
                    open={openEditDialog}
                    onClose={() => {
                        setOpenEditDialog(false);
                        setSelectedExpense(null);
                    }}
                    onUpdate={() => {
                        fetchExpenses();
                    }}
                    editData={selectedExpense}
                />
            )}
            
            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, expense: null })}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this expense? This will also revert bank and vehicle balances.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirm({ open: false, expense: null })}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={performDeleteExpense}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <MuiAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </Dialog>
    );
}

const Card = ({ children, sx }: any) => (
    <Box sx={{ borderRadius: 1.5, ...sx }}>
        {children}
    </Box>
);
