import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { query, where, getDocs, orderBy, collection, runTransaction } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { formatCurrency } from 'src/utils/google-chat';

import { db } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { VehicleSellDialog } from '../../vehicle/vehicle-sell-dialog';

// ----------------------------------------------------------------------

type ClientSummary = {
    clientName: string;
    totalSales: number;
    totalPayments: number;
    balance: number;
    vehicleCount: number;
    lastTransaction?: any;
};

type LedgerEntry = {
    id: string;
    date: any;
    description: string;
    debitSale: number;
    creditPayment: number;
    balance: number;
    serialNumber?: string;
    notes?: string;
};

type SoldVehicle = {
    id: string;
    serialNumber: string;
    vehicleDetails: string;
    saleDate: any;
    sellingPrice: number;
    clientName: string;
};

export function ClientLedgerView() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [clients, setClients] = useState<ClientSummary[]>([]);
    const [soldVehicles, setSoldVehicles] = useState<SoldVehicle[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [searchQuery, setSearchQuery] = useState('');

    // Statement Dialog
    const [statementOpen, setStatementOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<string>('');
    const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
    const [clientVehicles, setClientVehicles] = useState<SoldVehicle[]>([]);

    // Edit Sale Dialog
    const [editSaleOpen, setEditSaleOpen] = useState(false);
    const [editingSaleData, setEditingSaleData] = useState<any>(null);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [saleToDelete, setSaleToDelete] = useState<{ saleId: string, serialNumber: string, clientName: string } | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            await Promise.all([fetchClients(), fetchSoldVehicles()]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClients = async () => {
        try {
            const ledgerSnap = await getDocs(collection(db, 'clientLedger'));
            const ledgerData = ledgerSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];

            // Group by client
            const clientMap = new Map<string, ClientSummary>();

            ledgerData.forEach((entry: any) => {
                const clientName = entry.clientName || 'Unknown';
                const existing = clientMap.get(clientName) || {
                    clientName,
                    totalSales: 0,
                    totalPayments: 0,
                    balance: 0,
                    vehicleCount: 0,
                    lastTransaction: entry.date,
                };

                existing.totalSales += entry.debitSale || 0;
                existing.totalPayments += entry.creditPayment || 0;
                existing.balance = entry.balance || 0; // Latest balance
                if (entry.debitSale > 0) existing.vehicleCount += 1;

                // Track latest transaction
                if (
                    !existing.lastTransaction ||
                    (entry.date?.seconds || 0) > (existing.lastTransaction?.seconds || 0)
                ) {
                    existing.lastTransaction = entry.date;
                }

                clientMap.set(clientName, existing);
            });

            setClients(Array.from(clientMap.values()).sort((a, b) => b.balance - a.balance));
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const fetchSoldVehicles = async () => {
        try {
            const soldSnap = await getDocs(collection(db, 'soldVehicles'));
            const vehicles = soldSnap.docs.map((d) => {
                const data = d.data();
                return {
                    id: d.id,
                    serialNumber: data.serialNumber || '',
                    vehicleDetails: `${data.manufacturer} ${data.model} (${data.modelYear})`,
                    saleDate: data.saleDate,
                    sellingPrice: data.sellingPrice || 0,
                    clientName: data.clientName || 'Unknown',
                };
            }) as SoldVehicle[];

            setSoldVehicles(vehicles.sort((a, b) => (b.saleDate?.seconds || 0) - (a.saleDate?.seconds || 0)));
        } catch (error) {
            console.error('Error fetching sold vehicles:', error);
        }
    };

    const handleViewStatement = async (clientName: string) => {
        setSelectedClient(clientName);
        setLoading(true);

        try {
            // Ensure sold vehicles are loaded (may be empty if view opened early)
            if (soldVehicles.length === 0) {
                await fetchSoldVehicles();
            }

            // Fetch ledger entries – use orderBy only if an index exists, otherwise fallback to simple get
            let ledgerQuery = query(
                collection(db, 'clientLedger'),
                where('clientName', '==', clientName)
            );
            // Attempt to add ordering; if it fails Firestore will throw, we catch below
            try {
                ledgerQuery = query(ledgerQuery, orderBy('date', 'asc'));
            } catch (e) {
                console.warn('OrderBy index not available, fetching without ordering');
            }
            const snap = await getDocs(ledgerQuery);
            const entries = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as LedgerEntry[];
            setLedgerEntries(entries);

            // Fetch client's vehicles from already‑loaded soldVehicles
            const vehicles = soldVehicles.filter((v) => v.clientName === clientName);
            setClientVehicles(vehicles);

            setStatementOpen(true);
        } catch (error) {
            console.error('Error fetching statement:', error);
            setSnackbar({ open: true, message: 'Failed to load client statement', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handlePrintStatement = () => {
        if (!selectedClient || ledgerEntries.length === 0) return;

        const pdfDoc = new jsPDF();
        const pageWidth = pdfDoc.internal.pageSize.getWidth();

        // Header
        pdfDoc.setFontSize(20);
        pdfDoc.setFont('helvetica', 'bold');
        pdfDoc.text('MARAKISH GROUP', pageWidth / 2, 20, { align: 'center' });

        pdfDoc.setFontSize(14);
        pdfDoc.text('Client Statement', pageWidth / 2, 30, { align: 'center' });

        // Client Info
        pdfDoc.setFontSize(10);
        pdfDoc.setFont('helvetica', 'normal');
        pdfDoc.text(`Client: ${selectedClient}`, 14, 45);
        pdfDoc.text(`Date: ${dayjs().format('DD/MM/YYYY')}`, 14, 52);

        const clientData = clients.find((c) => c.clientName === selectedClient);
        if (clientData) {
            pdfDoc.text(`Total Sales: ${formatCurrency(clientData.totalSales)}`, 14, 59);
            pdfDoc.text(`Total Payments: ${formatCurrency(clientData.totalPayments)}`, 14, 66);
            pdfDoc.setFont('helvetica', 'bold');
            pdfDoc.text(`Outstanding Balance: ${formatCurrency(clientData.balance)}`, 14, 73);
        }

        // Vehicles Table
        if (clientVehicles.length > 0) {
            pdfDoc.setFont('helvetica', 'bold');
            pdfDoc.setFontSize(12);
            pdfDoc.text('Sold Vehicles', 14, 85);

            autoTable(pdfDoc, {
                startY: 90,
                head: [['Serial', 'Vehicle', 'Sale Date', 'Price']],
                body: clientVehicles.map((v) => [
                    v.serialNumber,
                    v.vehicleDetails,
                    dayjs(v.saleDate?.seconds * 1000).format('DD/MM/YYYY'),
                    formatCurrency(v.sellingPrice),
                ]),
                theme: 'grid',
                headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
                styles: { fontSize: 9 },
            });
        }

        // Ledger Table
        const finalY = (pdfDoc as any).lastAutoTable?.finalY || 100;
        pdfDoc.setFont('helvetica', 'bold');
        pdfDoc.setFontSize(12);
        pdfDoc.text('Transaction History', 14, finalY + 15);

        autoTable(pdfDoc, {
            startY: finalY + 20,
            head: [['Date', 'Description', 'Debit (Sale)', 'Credit (Payment)', 'Balance']],
            body: ledgerEntries.map((entry) => [
                dayjs(entry.date?.seconds * 1000).format('DD/MM/YYYY'),
                entry.description || '-',
                entry.debitSale > 0 ? formatCurrency(entry.debitSale) : '-',
                entry.creditPayment > 0 ? formatCurrency(entry.creditPayment) : '-',
                formatCurrency(entry.balance),
            ]),
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            styles: { fontSize: 9 },
            columnStyles: {
                2: { halign: 'right' },
                3: { halign: 'right' },
                4: { halign: 'right', fontStyle: 'bold' },
            },
        });

        // Footer
        const pageCount = pdfDoc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i += 1) {
            pdfDoc.setPage(i);
            pdfDoc.setFontSize(8);
            pdfDoc.setFont('helvetica', 'normal');
            pdfDoc.text(
                `Page ${i} of ${pageCount}`,
                pageWidth / 2,
                pdfDoc.internal.pageSize.getHeight() - 10,
                { align: 'center' }
            );
        }

        pdfDoc.save(`${selectedClient}_Statement_${dayjs().format('DDMMYYYY')}.pdf`);
    };

    const handleEditSale = async (vehicle: SoldVehicle) => {
        setLoading(true);
        try {
            // Fetch the sold vehicle data
            const soldVehicleSnap = await getDocs(
                query(collection(db, 'soldVehicles'), where('transactionId', '==', vehicle.id))
            );

            if (soldVehicleSnap.empty) {
                setSnackbar({ open: true, message: 'Sale record not found', severity: 'warning' });
                return;
            }

            const saleData = soldVehicleSnap.docs[0].data();

            // Fetch related ledger entries
            const ledgerQuery = query(
                collection(db, 'clientLedger'),
                where('clientName', '==', vehicle.clientName),
                where('serialNumber', '==', vehicle.serialNumber)
            );
            const ledgerSnap = await getDocs(ledgerQuery);
            const saleLedgerEntries = ledgerSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

            // Find the sale entry and payment entry (if exists)
            const saleEntry = saleLedgerEntries.find((e: any) => e.debitSale > 0);
            const paymentEntry = saleLedgerEntries.find((e: any) => e.creditPayment > 0);

            // Fetch the vehicle data
            const vehicleQuery = query(
                collection(db, 'vehicles'),
                where('serialNumber', '==', vehicle.serialNumber)
            );
            const vehicleSnap = await getDocs(vehicleQuery);
            const vehicleData = vehicleSnap.empty ? null : { id: vehicleSnap.docs[0].id, ...vehicleSnap.docs[0].data() };

            // Prepare edit data
            const editData = {
                saleId: vehicle.id,
                soldVehicleDocId: soldVehicleSnap.docs[0].id,
                vehicleData,
                saleDate: saleData.saleDate,
                clientName: saleData.clientName,
                sellingPrice: saleData.sellingPrice,
                paymentReceived: paymentEntry?.creditPayment || 0,
                paymentSource: paymentEntry?.notes || '',
                serialNumber: vehicle.serialNumber,
                ledgerSaleId: saleEntry?.id,
                ledgerPaymentId: paymentEntry?.id,
            };

            setEditingSaleData(editData);
            setEditSaleOpen(true);
        } catch (error: any) {
            console.error('Error fetching sale data:', error);
            setSnackbar({ open: true, message: `Failed to load sale data: ${error.message}`, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSale = async (saleId: string, serialNumber: string, clientName: string) => {
        setSaleToDelete({ saleId, serialNumber, clientName });
        setDeleteConfirmOpen(true);
    };

    const confirmDeleteSale = async () => {
        if (!saleToDelete) return;
        const { saleId, serialNumber, clientName } = saleToDelete;

        setLoading(true);
        try {
            // Get the sold vehicle data
            const soldVehicleSnap = await getDocs(
                query(collection(db, 'soldVehicles'), where('transactionId', '==', saleId))
            );

            if (soldVehicleSnap.empty) {
                setSnackbar({ open: true, message: 'Sale record not found', severity: 'warning' });
                setDeleteConfirmOpen(false);
                setSaleToDelete(null);
                setLoading(false);
                return;
            }

            const saleData = soldVehicleSnap.docs[0].data();

            // Get all ledger entries for this client and serial number
            const ledgerQuery = query(
                collection(db, 'clientLedger'),
                where('clientName', '==', clientName),
                where('serialNumber', '==', serialNumber)
            );
            const ledgerSnap = await getDocs(ledgerQuery);

            // Get bank transactions related to this sale
            const bankTxQuery = query(
                collection(db, 'bankTransaction'),
                where('description', '>=', `Client Payment - ${serialNumber}`),
                where('description', '<=', `Client Payment - ${serialNumber}\uf8ff`)
            );
            const bankTxSnap = await getDocs(bankTxQuery);

            // Execute deletion in a transaction
            await runTransaction(db, async (transaction) => {
                // 1. Delete sold vehicle record
                const soldVehicleRef = soldVehicleSnap.docs[0].ref;
                transaction.delete(soldVehicleRef);

                // 2. Update vehicle status back to Available
                const vehicleQuery = query(
                    collection(db, 'vehicles'),
                    where('serialNumber', '==', serialNumber)
                );
                const vehicleSnap = await getDocs(vehicleQuery);
                if (!vehicleSnap.empty) {
                    const vehicleRef = vehicleSnap.docs[0].ref;
                    transaction.update(vehicleRef, { soldStatus: 'Available' });
                }

                // 3. Delete all related ledger entries
                ledgerSnap.docs.forEach((ledgerDoc) => {
                    transaction.delete(ledgerDoc.ref);
                });

                // 4. Reverse bank transactions
                bankTxSnap.docs.forEach((bankTxDoc) => {
                    const txData = bankTxDoc.data();

                    // Update bank balance (reverse the credit)
                    if (txData.type === 'Credit' && txData.bankPortalName) {
                        const bankQuery2 = query(
                            collection(db, 'bankPortal'),
                            where('bankPortalName', '==', txData.bankPortalName)
                        );
                        getDocs(bankQuery2).then((bankSnap) => {
                            if (!bankSnap.empty) {
                                const bankRef = bankSnap.docs[0].ref;
                                const currentBalance = bankSnap.docs[0].data().balance || 0;
                                transaction.update(bankRef, {
                                    balance: currentBalance - (txData.amount || 0),
                                });
                            }
                        });
                    }

                    // Delete bank transaction
                    transaction.delete(bankTxDoc.ref);
                });
            });

            setSnackbar({ open: true, message: `Sale of ${serialNumber} has been successfully deleted.\n\nVehicle restored to Available status.`, severity: 'success' });

            // Refresh data
            await fetchData();
        } catch (error: any) {
            console.error('Error deleting sale:', error);
            setSnackbar({ open: true, message: `Failed to delete sale: ${error.message}`, severity: 'error' });
        } finally {
            setLoading(false);
            setDeleteConfirmOpen(false);
            setSaleToDelete(null);
        }
    };


    const filteredClients = clients.filter((c) =>
        c.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pendingClients = clients.filter((c) => c.balance > 0);

    const displayData = currentTab === 0 ? filteredClients : currentTab === 1 ? pendingClients : soldVehicles;

    return (
        <DashboardContent maxWidth={false}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h4">Client Ledger</Typography>
                <Stack direction="row" spacing={2}>
                    <TextField
                        size="small"
                        placeholder="Search clients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <Iconify icon="eva:search-fill" sx={{ mr: 1, color: 'text.disabled' }} />,
                        }}
                    />
                </Stack>
            </Stack>

            <Card sx={{ mb: 3 }}>
                <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
                    <Tab label={`All Clients (${clients.length})`} />
                    <Tab
                        label={
                            <Box display="flex" alignItems="center" gap={1}>
                                Pending Clients
                                <Label color="error">{pendingClients.length}</Label>
                            </Box>
                        }
                    />
                    <Tab label={`Sold Vehicles (${soldVehicles.length})`} />
                </Tabs>
            </Card>

            <Card>
                {currentTab === 2 ? (
                    // Sold Vehicles Tab
                    <>
                        <Scrollbar>
                            <TableContainer sx={{ overflow: 'unset' }}>
                                <Table sx={{ minWidth: 800 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Serial Number</TableCell>
                                            <TableCell>Vehicle</TableCell>
                                            <TableCell>Client</TableCell>
                                            <TableCell>Sale Date</TableCell>
                                            <TableCell align="right">Selling Price</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {soldVehicles
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((vehicle) => (
                                                <TableRow key={vehicle.id} hover>
                                                    <TableCell>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                            {vehicle.serialNumber}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{vehicle.vehicleDetails}</TableCell>
                                                    <TableCell>{vehicle.clientName}</TableCell>
                                                    <TableCell>
                                                        {dayjs(vehicle.saleDate?.seconds * 1000).format('DD MMM YYYY')}
                                                    </TableCell>
                                                    <TableCell align="right">{formatCurrency(vehicle.sellingPrice)}</TableCell>
                                                    <TableCell align="right">
                                                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => handleEditSale(vehicle)}
                                                                title="Edit Sale"
                                                            >
                                                                <Iconify icon="solar:pen-bold" />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={() => handleDeleteSale(vehicle.id, vehicle.serialNumber, vehicle.clientName)}
                                                                title="Delete Sale"
                                                            >
                                                                <Iconify icon="solar:trash-bin-trash-bold" />
                                                            </IconButton>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => handleViewStatement(vehicle.clientName)}
                                                                startIcon={<Iconify icon={"solar:document-text-bold" as any} />}
                                                            >
                                                                Statement
                                                            </Button>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                        <TablePagination
                            component="div"
                            count={soldVehicles.length}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10));
                                setPage(0);
                            }}
                        />
                    </>
                ) : (
                    // Clients Tab
                    <>
                        <Scrollbar>
                            <TableContainer sx={{ overflow: 'unset' }}>
                                <Table sx={{ minWidth: 800 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Client Name</TableCell>
                                            <TableCell align="right">Vehicles Sold</TableCell>
                                            <TableCell align="right">Total Sales</TableCell>
                                            <TableCell align="right">Total Payments</TableCell>
                                            <TableCell align="right">Balance</TableCell>
                                            <TableCell>Last Transaction</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(displayData as ClientSummary[])
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((client) => (
                                                <TableRow key={client.clientName} hover>
                                                    <TableCell>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                            {client.clientName}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">{client.vehicleCount}</TableCell>
                                                    <TableCell align="right">{formatCurrency(client.totalSales)}</TableCell>
                                                    <TableCell align="right">{formatCurrency(client.totalPayments)}</TableCell>
                                                    <TableCell align="right">
                                                        <Label color={client.balance > 0 ? 'error' : 'success'} sx={{ fontWeight: 700 }}>
                                                            {formatCurrency(client.balance)}
                                                        </Label>
                                                    </TableCell>
                                                    <TableCell>
                                                        {client.lastTransaction
                                                            ? dayjs(client.lastTransaction.seconds * 1000).format('DD MMM YYYY')
                                                            : '-'}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            onClick={() => handleViewStatement(client.clientName)}
                                                            startIcon={<Iconify icon={"solar:printer-bold" as any} />}
                                                        >
                                                            Statement
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        {displayData.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                                                    <Typography variant="h6" color="text.secondary">
                                                        No clients found
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                        <TablePagination
                            component="div"
                            count={displayData.length}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10));
                                setPage(0);
                            }}
                        />
                    </>
                )}
            </Card>

            {/* Statement Dialog */}
            <Dialog open={statementOpen} onClose={() => setStatementOpen(false)} maxWidth="lg" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h6">Client Statement</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {selectedClient}
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon={"solar:printer-bold" as any} />}
                            onClick={handlePrintStatement}
                        >
                            Print PDF
                        </Button>
                        <IconButton onClick={() => setStatementOpen(false)}>
                            <Iconify icon="mingcute:close-line" />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent dividers>
                    {/* Summary Cards */}
                    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} sx={{ mb: 3 }}>
                        {(() => {
                            const clientData = clients.find((c) => c.clientName === selectedClient);
                            return (
                                <>
                                    <Card sx={{ p: 2, bgcolor: 'primary.lighter' }}>
                                        <Typography variant="caption" color="primary.darker">
                                            Vehicles Sold
                                        </Typography>
                                        <Typography variant="h4" color="primary.darker">
                                            {clientData?.vehicleCount || 0}
                                        </Typography>
                                    </Card>
                                    <Card sx={{ p: 2, bgcolor: 'info.lighter' }}>
                                        <Typography variant="caption" color="info.darker">
                                            Total Sales
                                        </Typography>
                                        <Typography variant="h5" color="info.darker">
                                            {formatCurrency(clientData?.totalSales || 0)}
                                        </Typography>
                                    </Card>
                                    <Card sx={{ p: 2, bgcolor: 'success.lighter' }}>
                                        <Typography variant="caption" color="success.darker">
                                            Total Payments
                                        </Typography>
                                        <Typography variant="h5" color="success.darker">
                                            {formatCurrency(clientData?.totalPayments || 0)}
                                        </Typography>
                                    </Card>
                                    <Card sx={{ p: 2, bgcolor: 'error.lighter' }}>
                                        <Typography variant="caption" color="error.darker">
                                            Outstanding Balance
                                        </Typography>
                                        <Typography variant="h5" color="error.darker">
                                            {formatCurrency(clientData?.balance || 0)}
                                        </Typography>
                                    </Card>
                                </>
                            );
                        })()}
                    </Box>

                    {/* Sold Vehicles */}
                    {clientVehicles.length > 0 && (
                        <>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Sold Vehicles
                            </Typography>
                            <TableContainer sx={{ mb: 3 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Serial</TableCell>
                                            <TableCell>Vehicle</TableCell>
                                            <TableCell>Sale Date</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {clientVehicles.map((v) => (
                                            <TableRow key={v.id}>
                                                <TableCell>{v.serialNumber}</TableCell>
                                                <TableCell>{v.vehicleDetails}</TableCell>
                                                <TableCell>{dayjs(v.saleDate?.seconds * 1000).format('DD MMM YYYY')}</TableCell>
                                                <TableCell align="right">{formatCurrency(v.sellingPrice)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Divider sx={{ my: 3 }} />
                        </>
                    )}

                    {/* Transaction History */}
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Transaction History
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Debit (Sale)</TableCell>
                                    <TableCell align="right">Credit (Payment)</TableCell>
                                    <TableCell align="right">Balance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ledgerEntries.map((entry) => (
                                    <TableRow key={entry.id}>
                                        <TableCell>{dayjs(entry.date?.seconds * 1000).format('DD MMM YYYY')}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{entry.description}</Typography>
                                            {entry.notes && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {entry.notes}
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {entry.debitSale > 0 ? formatCurrency(entry.debitSale) : '-'}
                                        </TableCell>
                                        <TableCell align="right">
                                            {entry.creditPayment > 0 ? formatCurrency(entry.creditPayment) : '-'}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                {formatCurrency(entry.balance)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>

            {/* Edit Sale Dialog */}
            <VehicleSellDialog
                open={editSaleOpen}
                onClose={() => {
                    setEditSaleOpen(false);
                    setEditingSaleData(null);
                }}
                onUpdate={() => {
                    fetchData();
                }}
                editData={editingSaleData}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        ⚠️ Are you sure you want to delete the sale of {saleToDelete?.serialNumber}?
                        <br /><br />
                        This will:
                        <br />- Remove the sale record
                        <br />- Delete all related ledger entries
                        <br />- Reverse bank transactions
                        <br />- Restore vehicle to Available status
                        <br /><br />
                        This action cannot be undone!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteSale} variant="contained" color="error">
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
