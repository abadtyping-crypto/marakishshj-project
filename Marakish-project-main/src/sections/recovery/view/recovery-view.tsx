import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState, useEffect, useCallback } from 'react';
import { doc, query, orderBy, collection, onSnapshot, runTransaction } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';

import { db } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { RecoveryCard } from '../recovery-card';
import { RecoveryTableRow } from '../recovery-table-row';
import { TableNoData } from '../../vehicle/table-no-data';
import { TableEmptyRows } from '../../vehicle/table-empty-rows';
import { RecoveryNewEditForm } from '../recovery-new-edit-form';
import { RecoveryPaymentDialog } from '../recovery-payment-dialog';

// ----------------------------------------------------------------------

export function RecoveryView() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [recoveries, setRecoveries] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderByField, setOrderByField] = useState('Date');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState<string[]>([]);

    const [filterPerson, setFilterPerson] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const [openForm, setOpenForm] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [selectedRecovery, setSelectedRecovery] = useState<any | null>(null);
    const [selectedPersonForPayment, setSelectedPersonForPayment] = useState('');
    
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        const q = query(collection(db, 'recovery'), orderBy('Date', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            setRecoveries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        const unsubVehicles = onSnapshot(collection(db, 'vehicles'), (snapshot) => {
            setVehicles(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return () => unsubVehicles();
    }, []);

    const dataEnriched = recoveries.map(rec => {
        const vehicle = vehicles.find(v => v.serialNumber === rec['Serial Number']);
        return {
            ...rec,
            vehicleDetails: vehicle || null
        };
    });

    const handleSort = useCallback((id: string) => {
        const isAsc = orderByField === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderByField(id);
    }, [order, orderByField]);

    const handleChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const handleDeleteRow = useCallback((id: string) => {
        setRecordToDelete(id);
        setDeleteConfirmOpen(true);
    }, []);

    const confirmDelete = async () => {
        if (recordToDelete) {
            try {
                await runTransaction(db, async (transaction) => {
                    const countersRef = doc(db, 'setting', 'counter');
                    const countersDoc = await transaction.get(countersRef);
                    const counters = countersDoc.data() || {};

                    const decrementId = (strId: string) => {
                        const prefix = strId.match(/^[A-Z]+/)?.[0] || '';
                        const numberPart = strId.match(/\d+$/)?.[0] || '0';
                        if (Number(numberPart) <= 0) return strId;
                        const newNumber = String(Number(numberPart) - 1).padStart(numberPart.length, '0');
                        return prefix + newNumber;
                    };

                    if (counters.lastRecovery === recordToDelete) {
                        transaction.update(countersRef, {
                            lastRecovery: decrementId(recordToDelete)
                        });
                    }

                    transaction.delete(doc(db, 'recovery', recordToDelete));
                });
                setSnackbar({ open: true, message: 'Recovery record deleted successfully', severity: 'success' });
            } catch (error: any) {
                console.error('Delete failed:', error);
                setSnackbar({ open: true, message: `Delete failed: ${error.message}`, severity: 'error' });
            } finally {
                setDeleteConfirmOpen(false);
                setRecordToDelete(null);
            }
        }
    };

    const handleEditRow = useCallback((row: any) => {
        setSelectedRecovery(row);
        setOpenForm(true);
    }, []);

    const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
        if (checked) {
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }, []);

    const onSelectRow = useCallback((inputValue: string) => {
        const newSelected = selected.includes(inputValue)
            ? selected.filter((value) => value !== inputValue)
            : [...selected, inputValue];
        setSelected(newSelected);
    }, [selected]);

    const handlePrintPdf = () => {
        const pdfDoc = new jsPDF('landscape', 'mm', 'a4');
        const pageWidth = pdfDoc.internal.pageSize.width;

        pdfDoc.setFontSize(18);
        pdfDoc.setTextColor(40, 48, 60);
        pdfDoc.text('Marakish Group', 14, 15);

        pdfDoc.setFontSize(10);
        pdfDoc.setTextColor(100);
        const dateStr = new Date().toLocaleString();
        pdfDoc.text(`Generated on: ${dateStr}`, pageWidth - 14, 15, { align: 'right' });

        pdfDoc.setFontSize(14);
        pdfDoc.setTextColor(0);
        pdfDoc.text('Recovery Management Report', 14, 20);
        pdfDoc.setFontSize(10);
        pdfDoc.text(`Total: ${dataFiltered.length} records`, 14, 25);

        autoTable(pdfDoc, {
            startY: 30,
            head: [['ID', 'Date', 'Vehicle Details', 'Person', 'Route', 'Amount', 'Status']],
            body: dataFiltered.map((row) => {
                const rDate = row.Date?.seconds
                    ? dayjs(row.Date.seconds * 1000).format('DD MMM YYYY')
                    : dayjs(row.Date).format('DD MMM YYYY');

                const vInfo = row.vehicleDetails
                    ? `${row['Serial Number']} - ${row.vehicleDetails.manufacturer} ${row.vehicleDetails.model} (${row.vehicleDetails.modelYear})`
                    : row['Serial Number'];

                return [
                    row.RecoveryID,
                    rDate,
                    vInfo,
                    row['Recovery Person'],
                    `${row.From} -> ${row.To}`,
                    `${row.Amount} AED`,
                    row['Payment Status'] ? 'Paid' : 'Pending'
                ];
            }),
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [40, 48, 60], textColor: [255, 255, 255] },
            theme: 'grid',
        });

        pdfDoc.save(`Recovery_Report_${dayjs().format('YYYYMMDD')}.pdf`);
    };

    const dataFiltered = dataEnriched.filter(item => {
        if (filterPerson !== 'All' && item['Recovery Person'] !== filterPerson) return false;
        if (filterStatus !== 'All') {
            const isPaid = item['Payment Status'] === true;
            if (filterStatus === 'Paid' && !isPaid) return false;
            if (filterStatus === 'Pending' && isPaid) return false;
        }
        return true;
    });

    const recoveryPersons = ['All', ...Array.from(new Set(recoveries.map(r => r['Recovery Person']).filter(Boolean)))];

    return (
        <DashboardContent maxWidth={false}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
                <Typography variant="h4">Recovery Management</Typography>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        color="info"
                        startIcon={<Iconify icon={"solar:printer-minimalistic-bold" as any} />}
                        onClick={handlePrintPdf}
                    >
                        Print
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => {
                            setSelectedRecovery(null);
                            setOpenForm(true);
                        }}
                        sx={{ px: { xs: 1, sm: 2 } }}
                    >
                        {isMobile ? 'Add' : 'Add Recovery'}
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Iconify icon={"solar:card-send-bold" as any} />}
                        onClick={() => {
                            if (filterPerson !== 'All') {
                                setSelectedPersonForPayment(filterPerson);
                                setOpenPayment(true);
                            } else {
                                setSnackbar({ open: true, message: 'Please select a specific person from the filter to process payment.', severity: 'warning' });
                            }
                        }}
                        disabled={filterPerson === 'All'}
                        sx={{ px: { xs: 1, sm: 2 } }}
                    >
                        {selected.length > 0 ? `Pay Selected (${selected.length})` : `Pay ${filterPerson !== 'All' ? filterPerson : 'Person'}`}
                    </Button>
                </Stack>
            </Stack>

            <Card sx={{ p: 2, mb: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Autocomplete
                        fullWidth
                        options={recoveryPersons}
                        value={filterPerson}
                        onChange={(e, v) => setFilterPerson(v || 'All')}
                        renderInput={(params) => <TextField {...params} label="Filter by Person" />}
                    />
                    <Autocomplete
                        fullWidth
                        options={['All', 'Paid', 'Pending']}
                        value={filterStatus}
                        onChange={(e, v) => setFilterStatus(v || 'All')}
                        renderInput={(params) => <TextField {...params} label="Filter by Status" />}
                    />
                </Stack>
            </Card>

            {isMobile ? (
                <Box>
                    {dataFiltered
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <RecoveryCard
                                key={row.id}
                                row={row}
                                selected={selected.includes(row.id)}
                                onSelectRow={() => onSelectRow(row.id)}
                                onEditRow={() => handleEditRow(row)}
                                onDeleteRow={() => handleDeleteRow(row.id)}
                            />
                        ))}
                    {dataFiltered.length === 0 && <TableNoData searchQuery="" />}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={dataFiltered.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            ) : (
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ overflow: 'unset' }}>
                            <Table sx={{ minWidth: 800 }}>
                                <TableHeadCustom
                                    order={order}
                                    orderByColumn={orderByField}
                                    onSort={handleSort}
                                    numSelected={selected.length}
                                    rowCount={dataFiltered.length}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            dataFiltered.map((row) => row.id)
                                        )
                                    }
                                    headLabel={[
                                        { id: 'RecoveryID', label: 'ID' },
                                        { id: 'Date', label: 'Date' },
                                        { id: 'Serial Number', label: 'Vehicle Serial' },
                                        { id: 'Recovery Person', label: 'Person' },
                                        { id: 'From', label: 'From' },
                                        { id: 'To', label: 'To' },
                                        { id: 'Amount', label: 'Amount' },
                                        { id: 'Payment Status', label: 'Status' },
                                        { id: '' },
                                    ]}
                                />
                                <TableBody>
                                    {dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <RecoveryTableRow
                                                key={row.id}
                                                row={row}
                                                selected={selected.includes(row.id)}
                                                onSelectRow={() => onSelectRow(row.id)}
                                                onEditRow={() => handleEditRow(row)}
                                                onDeleteRow={() => handleDeleteRow(row.id)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={68}
                                        emptyRows={rowsPerPage - Math.min(rowsPerPage, dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length)}
                                    />

                                    {dataFiltered.length === 0 && <TableNoData searchQuery="" />}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={dataFiltered.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            )}

            <RecoveryNewEditForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                recovery={selectedRecovery}
            />

            <RecoveryPaymentDialog
                open={openPayment}
                onClose={() => setOpenPayment(false)}
                recoveryPerson={selectedPersonForPayment}
                selectedRecoveryIds={selected}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this recovery record?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} variant="contained" color="error">
                        Delete
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

// ----------------------------------------------------------------------

type TableHeadCustomProps = {
    order: 'asc' | 'desc';
    orderByColumn: string;
    headLabel: any[];
    onSort: (id: string) => void;
    numSelected: number;
    rowCount: number;
    onSelectAllRows: (checked: boolean) => void;
};

function TableHeadCustom({ order, orderByColumn, headLabel, onSort, numSelected, rowCount, onSelectAllRows }: TableHeadCustomProps) {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            onSelectAllRows(event.target.checked)
                        }
                    />
                </TableCell>
                {headLabel.map((headCell: any) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align || 'left'}
                        sortDirection={orderByColumn === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderByColumn === headCell.id}
                            direction={orderByColumn === headCell.id ? order : 'asc'}
                            onClick={() => onSort(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
