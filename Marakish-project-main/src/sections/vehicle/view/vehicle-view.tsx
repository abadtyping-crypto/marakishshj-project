import type { Vehicle } from 'src/types/vehicle';
import type { Theme } from '@mui/material/styles';

import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';
import { useTranslation } from 'react-i18next';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  collection,
  onSnapshot,
  runTransaction,
} from 'firebase/firestore';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { addNotification } from 'src/utils/notifications';
import { sendGoogleChatNotification } from 'src/utils/google-chat';

import { db } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useSearch } from 'src/components/search-context';

import { VehicleCard } from '../vehicle-card';
import { TableNoData } from '../table-no-data';
import { TableEmptyRows } from '../table-empty-rows';
import { VehicleTableRow } from '../vehicle-table-row';
import { VehicleTableHead } from '../vehicle-table-head';
import { VehicleSellDialog } from '../vehicle-sell-dialog';
import { VehicleTableToolbar } from '../vehicle-table-toolbar';
import { VehicleExpenseDialog } from '../vehicle-expense-dialog';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { VehicleDetailsDialog } from '../vehicle-details-dialog';
import { VehicleParkingDialog } from '../vehicle-parking-dialog';
import { VehiclePurchaseDialog } from '../vehicle-purchase-dialog';

// ----------------------------------------------------------------------

function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('serialNumber');
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return useMemo(
    () => ({
      page,
      order,
      onSort,
      orderBy,
      selected,
      rowsPerPage,
      onSelectRow,
      onResetPage,
      onChangePage,
      onSelectAllRows,
      onChangeRowsPerPage,
    }),
    [
      page,
      order,
      onSort,
      orderBy,
      selected,
      rowsPerPage,
      onSelectRow,
      onResetPage,
      onChangePage,
      onSelectAllRows,
      onChangeRowsPerPage,
    ]
  );
}

export function VehicleView() {
  const table = useTable();
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery } = useSearch();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  // const [filterName, setFilterName] = useState(''); // REMOVED
  const filterName = searchQuery; // Use global search
  const setFilterName = setSearchQuery; // Alias for compatibility with existing code
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [openSellDialog, setOpenSellDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const [openParkingDialog, setOpenParkingDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [sellingVehicle, setSellingVehicle] = useState<Vehicle | null>(null);
  const [detailsVehicle, setDetailsVehicle] = useState<Vehicle | null>(null);

  const [manufacturersData, setManufacturersData] = useState<Record<string, { logoUrl?: string; color?: string }>>({});
  const [vendorsData, setVendorsData] = useState<Record<string, string>>({});

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; row: Vehicle | null }>({ open: false, row: null });

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mubayaFilter = searchParams.get('mubayaStatus');

  const [filterManufacturer, setFilterManufacturer] = useState('All');
  const [filterModel, setFilterModel] = useState('All');
  const [filterModelYear, setFilterModelYear] = useState('All');
  const [filterSoldStatus, setFilterSoldStatus] = useState('All');
  const [filterMubaya, setFilterMubaya] = useState('All');
  const [filterVendor, setFilterVendor] = useState('All');
  
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    table.onResetPage();
  }, [searchQuery, table]);

  useEffect(() => {
    if (mubayaFilter) {
      setFilterMubaya(mubayaFilter);
    }
  }, [mubayaFilter]);

  useEffect(() => {
    if (location.pathname === '/vehicles/purchase') {
      setOpenPurchaseDialog(true);
    } else if (location.pathname === '/vehicles/sell') {
      setOpenSellDialog(true);
    } else if (location.pathname === '/vehicles/expense') {
      setOpenExpenseDialog(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const q = query(collection(db, 'vehicles'));
    const unsubscribeVehicles = onSnapshot(q, (snapshot) => {
      const vehicleData = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Vehicle[];
      setVehicles(vehicleData);
    });

    const unsubscribeManuf = onSnapshot(collection(db, 'manufacturers'), (snapshot) => {
      const data: Record<string, { logoUrl?: string; color?: string }> = {};
      snapshot.forEach(d => { 
        data[d.id] = { logoUrl: d.data().logoUrl, color: d.data().color }; 
      });
      setManufacturersData(data);
    });

    const unsubscribeVendors = onSnapshot(collection(db, 'vendorsList'), (snapshot) => {
      const data: Record<string, string> = {};
      snapshot.forEach(d => { if (d.data().logoUrl && d.data().name) data[d.data().name] = d.data().logoUrl; });
      setVendorsData(data);
    });

    return () => {
      unsubscribeVehicles();
      unsubscribeManuf();
      unsubscribeVendors();
    };
  }, []);

  // Delete Logic
  const handleDeleteRow = (row: Vehicle) => {
    if (row.soldStatus === 'Sold') {
      setSnackbar({ open: true, message: 'Cannot delete a Sold vehicle.', severity: 'warning' });
      return;
    }
    setDeleteConfirm({ open: true, row });
  };

  const performDelete = async () => {
    const row = deleteConfirm.row;
    if (!row) return;
    setDeleteConfirm({ open: false, row: null });
    
    try {
      // 1. Find Related Documents
      const vpQ = query(
        collection(db, 'vendorsPayment'),
        where('Serial_Number', '==', row.serialNumber)
      );
      const purQ = query(
        collection(db, 'vehiclePurchasing'),
        where('serialNumber', '==', row.serialNumber)
      );
      const btQ = query(
        collection(db, 'bankTransaction'),
        where('description', '>=', `Purchase: ${row.serialNumber} `),
        where('description', '<=', `Purchase: ${row.serialNumber} \uf8ff`)
      );

      const [vpSnap, purSnap, btSnap] = await Promise.all([
        getDocs(vpQ),
        getDocs(purQ),
        getDocs(btQ),
      ]);

      // 2. Find all bank portals that need to be updated (BEFORE transaction)
      const bankUpdates: Map<string, { ref: any; amount: number }> = new Map();

      for (const vpDoc of vpSnap.docs) {
        const vpData = vpDoc.data();
        const bankName = vpData.paidPortal;
        const amount = Number(vpData.paidAmount) || 0;

        if (bankName && amount > 0 && !bankUpdates.has(bankName)) {
          const bankQ = query(
            collection(db, 'bankPortal'),
            where('bankPortalName', '==', bankName)
          );
          const bankSnap = await getDocs(bankQ);

          if (!bankSnap.empty) {
            const existingAmount = bankUpdates.get(bankName)?.amount || 0;
            bankUpdates.set(bankName, {
              ref: bankSnap.docs[0].ref,
              amount: existingAmount + amount,
            });
          }
        } else if (bankName && amount > 0) {
          const existing = bankUpdates.get(bankName)!;
          existing.amount += amount;
        }
      }

      // 3. Run transaction with all data prepared
      await runTransaction(db, async (transaction) => {
        // ===== ALL READS FIRST =====

        // Read counters
        const countersRef = doc(db, 'setting', 'counter');
        const countersDoc = await transaction.get(countersRef);
        const counters = countersDoc.exists() ? countersDoc.data() : {};

        // Read all bank balances
        const bankBalances = new Map<string, number>();
        for (const [bankName, { ref: bankRef }] of bankUpdates.entries()) {
          const freshBank = await transaction.get(bankRef);
          const bankData = freshBank.data() as { balance?: number } | undefined;
          bankBalances.set(bankName, bankData?.balance || 0);
        }

        // ===== CALCULATIONS =====

        // Helper to decrement ID
        const decrementId = (id: string) => {
          const prefix = id.match(/^[A-Z]+/)?.[0] || '';
          const numberPart = id.match(/\d+$/)?.[0] || '0';
          if (Number(numberPart) <= 0) return id;
          const newNumber = String(Number(numberPart) - 1).padStart(numberPart.length, '0');
          return prefix + newNumber;
        };

        // Helper to check and decrement if deleted IDs match the last counter
        const checkAndDecrement = (
          idsToDelete: string[],
          currentLastId: string | undefined
        ) => {
          if (!currentLastId) return currentLastId;
          let tempLast = currentLastId;
          // Sort descending to handle contiguous block at the tip
          const sorted = [...idsToDelete].sort().reverse();
          for (const id of sorted) {
            if (id === tempLast) {
              tempLast = decrementId(tempLast);
            }
          }
          return tempLast;
        };

        // Calculate new counters
        const newLastSerialNumber = checkAndDecrement([row.serialNumber], counters.lastSerialNumber);
        const newLastVehiclePurchasing = checkAndDecrement(
          purSnap.docs.map((d) => d.id),
          counters.lastVehiclePurchasing
        );
        const newLastVendorsPayment = checkAndDecrement(
          vpSnap.docs.map((d) => d.id),
          counters.lastVendorsPayment
        );
        const newLastBankTransaction = checkAndDecrement(
          btSnap.docs.map((d) => d.id),
          counters.lastBankTransaction
        );

        // ===== ALL WRITES SECOND =====

        // Refund Bank Balance(s)
        for (const [bankName, { ref: bankRef, amount }] of bankUpdates.entries()) {
          const currentBalance = bankBalances.get(bankName) || 0;
          transaction.update(bankRef, {
            balance: currentBalance + amount,
          });
        }

        // Delete Vehicle
        transaction.delete(doc(db, 'vehicles', row.id));

        // Delete Vendors Payment
        vpSnap.forEach((d) => transaction.delete(d.ref));

        // Delete Vehicle Purchasing
        purSnap.forEach((d) => transaction.delete(d.ref));

        // Delete Bank Transactions
        btSnap.forEach((d) => transaction.delete(d.ref));

        // Update Counters if changed
        const counterUpdates: any = {};
        if (newLastSerialNumber !== counters.lastSerialNumber)
          counterUpdates.lastSerialNumber = newLastSerialNumber;
        if (newLastVehiclePurchasing !== counters.lastVehiclePurchasing)
          counterUpdates.lastVehiclePurchasing = newLastVehiclePurchasing;
        if (newLastVendorsPayment !== counters.lastVendorsPayment)
          counterUpdates.lastVendorsPayment = newLastVendorsPayment;
        if (newLastBankTransaction !== counters.lastBankTransaction)
          counterUpdates.lastBankTransaction = newLastBankTransaction;

        if (Object.keys(counterUpdates).length > 0) {
          transaction.update(countersRef, counterUpdates);
        }
      });

      setSnackbar({ open: true, message: 'Vehicle deleted successfully.', severity: 'success' });
    } catch (e: any) {
      console.error('Delete error:', e);
      setSnackbar({ open: true, message: `Failed to delete vehicle: ${e.message || 'Unknown error'}`, severity: 'error' });
    }
  };

  const handleEditRow = (row: Vehicle) => {
    if (row.soldStatus === 'Sold') {
      setSnackbar({ open: true, message: 'Cannot edit a Sold vehicle.', severity: 'warning' });
      return;
    }
    setEditingVehicle(row);
    setOpenPurchaseDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenPurchaseDialog(false);
    setEditingVehicle(null);
    if (location.pathname === '/vehicles/purchase') {
      navigate('/vehicles');
    }
  };

  const handleSellRow = (row: Vehicle) => {
    if (row.soldStatus === 'Sold') {
      setSnackbar({ open: true, message: 'This vehicle is already sold.', severity: 'warning' });
      return;
    }
    setSellingVehicle(row);
    setOpenSellDialog(true);
  };

  const handleCloseSellDialog = () => {
    setOpenSellDialog(false);
    setSellingVehicle(null);
    if (location.pathname === '/vehicles/sell') {
      navigate('/vehicles');
    }
  };

  const handleUpdateMubaya = async (
    row: Vehicle,
    direction: 'forward' | 'backward' = 'forward'
  ) => {
    const statusProgression = ['Not Requested', 'Requested', 'Arrived', 'Handed Over'];
    const currentStatus = row.mubayaStatus || 'Not Requested';
    const currentIndex = statusProgression.indexOf(currentStatus);

    let nextStatus = '';

    if (direction === 'forward' && currentIndex < statusProgression.length - 1) {
      nextStatus = statusProgression[currentIndex + 1];
    } else if (direction === 'backward' && currentIndex > 0) {
      nextStatus = statusProgression[currentIndex - 1];
    }

    if (nextStatus) {
      try {
        const vehicleRef = doc(db, 'vehicles', row.id);
        await updateDoc(vehicleRef, { mubayaStatus: nextStatus });

        // Send Google Chat Notification
        try {
          await sendGoogleChatNotification({
            header: {
              title:
                direction === 'forward' ? '📄 Mubaya Status Updated' : '🔄 Mubaya Status Reversed',
              subtitle: 'Marakish Group',
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      topLabel: 'Serial Number',
                      content: row.serialNumber,
                      icon: 'TICKET',
                    },
                  },
                  {
                    keyValue: {
                      topLabel: 'Vehicle',
                      content: `${row.manufacturer} ${row.model} `,
                      icon: 'CAR',
                    },
                  },
                  { keyValue: { topLabel: 'From', content: currentStatus, icon: 'PENDING' } },
                  { keyValue: { topLabel: 'To', content: nextStatus, icon: 'CHECK_CIRCLE' } },
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
            title: direction === 'forward' ? 'Mubaya Status Updated' : 'Mubaya Status Reversed',
            description: `${row.serialNumber} - ${nextStatus} `,
            type: 'vehicle-status',
          });
        } catch (notifError) {
          console.error('Internal notification failed (non-critical):', notifError);
        }
      } catch (error) {
        console.error('Error updating Mubaya Status:', error);
        setSnackbar({ open: true, message: 'Failed to update Mubaya status.', severity: 'error' });
      }
    }
  };

  const handleMoveParking = (row: Vehicle) => {
    setEditingVehicle(row);
    setOpenParkingDialog(true);
  };

  const handleOpenDetails = (row: Vehicle) => {
    setDetailsVehicle(row);
    setOpenDetailsDialog(true);
  };

  const dataFiltered: Vehicle[] = applyFilter({
    inputData: vehicles,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filters: {
      manufacturer: filterManufacturer,
      model: filterModel,
      modelYear: filterModelYear,
      soldStatus: filterSoldStatus,
      mubayaStatus: filterMubaya,
      vendor: filterVendor,
    },
  });

  const getFilteredUniqueValues = (key: keyof Vehicle, activeFilters: any) => {
    let filtered = vehicles;

    Object.keys(activeFilters).forEach((fKey) => {
      if (fKey !== key && activeFilters[fKey] !== 'All') {
        filtered = filtered.filter((v: any) => {
          const val = fKey === 'mubayaStatus' ? v[fKey] || 'Not Requested' : v[fKey];
          return String(val || '') === String(activeFilters[fKey]);
        });
      }
    });

    const values = Array.from(
      new Set(
        filtered
          .map((v) => (key === 'mubayaStatus' ? v[key] || 'Not Requested' : v[key]))
          .filter(Boolean)
      )
    );

    if (key === 'modelYear') {
      return [
        'All',
        ...values.sort((a: any, b: any) => {
          const numA = Number(a);
          const numB = Number(b);
          if (isNaN(numA) || isNaN(numB)) return String(a).localeCompare(String(b));
          return numB - numA;
        }),
      ];
    }

    return ['All', ...values.sort((a: any, b: any) => String(a).localeCompare(String(b)))];
  };

  const currentFilters = {
    manufacturer: filterManufacturer,
    model: filterModel,
    modelYear: filterModelYear,
    vendor: filterVendor,
    soldStatus: filterSoldStatus,
    mubayaStatus: filterMubaya,
  };

  const manufacturers = getFilteredUniqueValues('manufacturer', currentFilters);
  const models = getFilteredUniqueValues('model', currentFilters);
  const modelYears = getFilteredUniqueValues('modelYear', currentFilters);
  const vendors = getFilteredUniqueValues('vendor', currentFilters);
  const soldStatuses = getFilteredUniqueValues('soldStatus', currentFilters);
  const mubayaStatuses = getFilteredUniqueValues('mubayaStatus', currentFilters);

  const notFound = !dataFiltered.length && !!filterName;

  const handlePrintPdf = () => {
    const pdfDoc = new jsPDF('landscape', 'mm', 'a4');
    const pageWidth = pdfDoc.internal.pageSize.width;
    const pageHeight = pdfDoc.internal.pageSize.height;

    // --- Header ---
    pdfDoc.setFontSize(18);
    pdfDoc.setTextColor(40, 48, 60);
    pdfDoc.text('Marakish Group', 14, 15);

    pdfDoc.setFontSize(10);
    pdfDoc.setTextColor(100);
    const dateStr = new Date().toLocaleString();
    pdfDoc.text(`Generated on: ${dateStr} `, pageWidth - 14, 15, { align: 'right' });

    // --- Sub-Header / Title ---
    pdfDoc.setFontSize(14);
    pdfDoc.setTextColor(0);
    pdfDoc.text(t('vehicles.title'), 14, 20);
    pdfDoc.setFontSize(10);
    pdfDoc.text(`Total: ${dataFiltered.length} units`, 14, 25);

    // --- Table ---
    autoTable(pdfDoc, {
      startY: 30,
      head: [[
        t('vehicles.table.serial'),
        t('vehicles.table.date'),
        t('vehicles.table.vehicle'),
        t('vehicles.table.vin'),
        t('vehicles.table.vendor'),
        t('vehicles.table.crn'),
        t('vehicles.table.parking'),
        t('vehicles.table.soldStatus'),
        t('vehicles.table.mubaya')
      ]],
      body: dataFiltered.map((row) => {
        const pDate = row.purchasingDate?.seconds
          ? dayjs(row.purchasingDate.seconds * 1000)
          : dayjs(row.purchasingDate);

        return [
          row.serialNumber,
          pDate.isValid() ? pDate.format('DD MMM YYYY') : '-',
          `${row.manufacturer} ${row.model} (${row.modelYear})`,
          row.vinChassisNumber,
          row.vendor,
          row.crn,
          row.parkingLocation,
          row.soldStatus,
          row.mubayaStatus,
        ];
      }),
      styles: {
        fontSize: 9,
        cellPadding: 3,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [40, 48, 60],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Serial
        1: { cellWidth: 22 }, // Date
        // Vehicle gets auto width
        3: { cellWidth: 35 }, // VIN
        4: { cellWidth: 30 }, // Vendor
        5: { cellWidth: 20 }, // CRN
        6: { cellWidth: 25 }, // Parking
        7: { cellWidth: 20, halign: 'center' }, // Sold
        8: { cellWidth: 25, halign: 'center' }, // Mubaya
      },
      theme: 'grid', // Keeps the requested grid look but refined
      didDrawPage: (data) => {
        // Footer: Page Number
        const str = `Page ${data.pageNumber} `;
        pdfDoc.setFontSize(8);
        pdfDoc.setTextColor(150);
        pdfDoc.text(str, pageWidth - 20, pageHeight - 10, { align: 'right' });
      },
    });

    // eslint-disable-next-line no-useless-escape
    const safeTitle = t('vehicles.title').replace(/[:\/\\]/g, '').replace(/\s+/g, '_');
    pdfDoc.save(`${safeTitle}.pdf`);
  };

  const handleDownloadExcel = () => {
    const tableData = dataFiltered.map((row) => {
      const pDate = row.purchasingDate?.seconds
        ? dayjs(row.purchasingDate.seconds * 1000)
        : dayjs(row.purchasingDate);

      return {
        [t('vehicles.table.serial')]: row.serialNumber,
        [t('vehicles.table.date')]: pDate.isValid() ? pDate.format('DD MMM YYYY') : '-',
        [t('vehicles.table.vehicle')]: `${row.manufacturer} ${row.model} (${row.modelYear})`,
        [t('vehicles.table.vin')]: row.vinChassisNumber,
        [t('vehicles.table.vendor')]: row.vendor,
        [t('vehicles.table.crn')]: row.crn,
        [t('vehicles.table.parking')]: row.parkingLocation,
        [t('vehicles.table.soldStatus')]: row.soldStatus,
        [t('vehicles.table.mubaya')]: row.mubayaStatus,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehicles');

    // Auto-size columns
    const maxWidths = Object.keys(tableData[0] || {}).map((key) =>
      Math.max(key.length, ...tableData.map((row: any) => String(row[key] || '').length))
    );
    worksheet['!cols'] = maxWidths.map((w) => ({ wch: w + 2 }));

    // eslint-disable-next-line no-useless-escape
    const safeTitle = t('vehicles.title').replace(/[:\/\\]/g, '').replace(/\s+/g, '_');
    XLSX.writeFile(workbook, `${safeTitle}.xlsx`);
  };

  const handleClearFilters = () => {
    setFilterName('');
    setFilterManufacturer('All');
    setFilterModel('All');
    setFilterModelYear('All');
    setFilterSoldStatus('All');
    setFilterMubaya('All');
    setFilterVendor('All');
    table.onResetPage();
  };

  const canReset =
    !!filterName ||
    filterManufacturer !== 'All' ||
    filterModel !== 'All' ||
    filterModelYear !== 'All' ||
    filterSoldStatus !== 'All' ||
    filterMubaya !== 'All' ||
    filterVendor !== 'All';

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <DashboardContent maxWidth="xl">
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h4">{t('vehicles.title')}</Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <Button
            fullWidth={isMobile}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setOpenPurchaseDialog(true)}
            sx={{ gap: 1, px: 2 }}
          >
            {t('vehicles.newPurchase')}
          </Button>
          <Button
            fullWidth={isMobile}
            variant="contained"
            color="success"
            startIcon={<Iconify icon="solar:cart-3-bold" />}
            onClick={() => setOpenSellDialog(true)}
            sx={{ gap: 1, px: 2 }}
          >
            {t('vehicles.sellVehicle')}
          </Button>
          <Button
            fullWidth={isMobile}
            variant="contained"
            color="warning"
            startIcon={<Iconify icon={"solar:bill-list-bold" as any} />}
            onClick={() => setOpenExpenseDialog(true)}
            sx={{ gap: 1, px: 2 }}
          >
            {t('vehicles.vehicleExpense')}
          </Button>
        </Stack>
      </Stack>

      {isMobile && (
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
          <Button variant="outlined" startIcon={<Iconify icon={"solar:filter-bold" as any} />} onClick={() => setFilterDrawerOpen(true)}>
            {t('common.filters', 'Filters')}
          </Button>
        </Stack>
      )}

      {isMobile ? (
        <Drawer
          anchor="bottom"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          PaperProps={{ sx: { p: 3, borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '80vh' } }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>{t('common.filters', 'Filters')}</Typography>
          <Scrollbar>
            <Box display="flex" flexDirection="column" gap={2}>
              {canReset && (
                <Button color="error" variant="outlined" onClick={handleClearFilters} startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}>
                  {t('vehicles.clearFilters')}
                </Button>
              )}
              <Autocomplete fullWidth size="small" options={manufacturers} value={filterManufacturer} onChange={(_, nv) => { setFilterManufacturer(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.manufacturer')} />} />
              <Autocomplete fullWidth size="small" options={models} value={filterModel} onChange={(_, nv) => { setFilterModel(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.model')} />} />
              <Autocomplete fullWidth size="small" options={modelYears} value={filterModelYear} onChange={(_, nv) => { setFilterModelYear(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.modelYear')} />} />
              <Autocomplete fullWidth size="small" options={vendors} value={filterVendor} onChange={(_, nv) => { setFilterVendor(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.vendor')} />} />
              <Autocomplete fullWidth size="small" options={soldStatuses} value={filterSoldStatus} onChange={(_, nv) => { setFilterSoldStatus(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.soldStatus')} />} />
              <Autocomplete fullWidth size="small" options={mubayaStatuses} value={filterMubaya} onChange={(_, nv) => { setFilterMubaya(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.mubaya')} />} />
            </Box>
          </Scrollbar>
        </Drawer>
      ) : (
        <Card sx={{ p: 2, mb: 2 }}>
          <Box display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={2}>
            {canReset && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button color="error" variant="outlined" onClick={handleClearFilters} startIcon={<Iconify icon="solar:trash-bin-trash-bold" />} sx={{ flexShrink: 0, height: 40, gap: 1, px: 1.5 }}>
                  {t('vehicles.clearFilters')}
                </Button>
              </Box>
            )}
            <Autocomplete fullWidth size="small" options={manufacturers} value={filterManufacturer} onChange={(_, nv) => { setFilterManufacturer(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.manufacturer')} />} />
            <Autocomplete fullWidth size="small" options={models} value={filterModel} onChange={(_, nv) => { setFilterModel(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.model')} />} />
            <Autocomplete fullWidth size="small" options={modelYears} value={filterModelYear} onChange={(_, nv) => { setFilterModelYear(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.modelYear')} />} />
            <Autocomplete fullWidth size="small" options={vendors} value={filterVendor} onChange={(_, nv) => { setFilterVendor(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.vendor')} />} />
            <Autocomplete fullWidth size="small" options={soldStatuses} value={filterSoldStatus} onChange={(_, nv) => { setFilterSoldStatus(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.soldStatus')} />} />
            <Autocomplete fullWidth size="small" options={mubayaStatuses} value={filterMubaya} onChange={(_, nv) => { setFilterMubaya(nv || 'All'); table.onResetPage(); }} renderInput={(p) => <TextField {...p} label={t('vehicles.filters.mubaya')} />} />
          </Box>
        </Card>
      )}

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {t('vehicles.shownCount', { count: dataFiltered.length })}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="success"
            startIcon={<Iconify icon={"solar:bill-list-bold" as any} />}
            onClick={handleDownloadExcel}
            sx={{ gap: 1, px: 2 }}
          >
            {t('vehicles.downloadExcel')}
          </Button>
          <Button
            variant="outlined"
            color="info"
            startIcon={<Iconify icon={"solar:printer-minimalistic-bold" as any} />}
            onClick={handlePrintPdf}
            sx={{ gap: 1, px: 2 }}
          >
            {t('vehicles.printPdf')}
          </Button>
        </Stack>
      </Stack>

      <VehiclePurchaseDialog
        open={openPurchaseDialog}
        onClose={handleCloseDialog}
        vehicle={editingVehicle}
      />

      <VehicleSellDialog
        open={openSellDialog}
        onClose={handleCloseSellDialog}
        initialVehicle={sellingVehicle}
      />

      <VehicleExpenseDialog
        open={openExpenseDialog}
        onClose={() => {
          setOpenExpenseDialog(false);
          if (location.pathname === '/vehicles/expense') {
            navigate('/vehicles');
          }
        }}
      />

      <VehicleParkingDialog
        open={openParkingDialog}
        onClose={() => {
          setOpenParkingDialog(false);
          setEditingVehicle(null);
        }}
        vehicle={editingVehicle}
      />

      <VehicleDetailsDialog
        open={openDetailsDialog}
        onClose={() => {
          setOpenDetailsDialog(false);
          setDetailsVehicle(null);
        }}
        vehicle={detailsVehicle}
      />

      {!isMobile ? (
        <Card>
          <VehicleTableToolbar
            numSelected={table.selected.length}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 1000 }}>
                <VehicleTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((vehicle) => vehicle.id)
                    )
                  }
                  headLabel={[
                    { id: 'serialNumber', label: 'Serial No.', minWidth: 100 },
                    { id: 'purchasingDate', label: 'Purchase Date', minWidth: 140 },
                    { id: 'manufacturer', label: 'Vehicle Details', minWidth: 180 },
                    { id: 'vinChassisNumber', label: 'VIN / Chassis', minWidth: 160 },
                    { id: 'vendor', label: 'Vendor', minWidth: 160 },
                    { id: 'crn', label: 'CRN', minWidth: 100 },
                    { id: 'soldStatus', label: 'Status', minWidth: 100 },

                    { id: '', minWidth: 50 },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <VehicleTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onEditRow={() => handleEditRow(row)}
                        onDeleteRow={() => handleDeleteRow(row)}
                        onSellRow={() => handleSellRow(row)}
                        onUpdateMubaya={(v, direction) => handleUpdateMubaya(v, direction)}
                        onMoveParking={() => handleMoveParking(row)}
                        onClickSerial={() => handleOpenDetails(row)}
                        brandLogo={manufacturersData[row.manufacturer]?.logoUrl}
                        brandColor={manufacturersData[row.manufacturer]?.color}
                        vendorLogo={vendorsData[row.vendor]}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            component="div"
            page={table.page}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[100, 150, 200]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      ) : (
        <Box>
          <VehicleTableToolbar
            numSelected={table.selected.length}
          />
          {dataFiltered
            .slice(
              table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage
            )
            .map((row) => (
              <VehicleCard
                key={row.id}
                row={row}
                onEditRow={() => handleEditRow(row)}
                onDeleteRow={() => handleDeleteRow(row)}
                onSellRow={() => handleSellRow(row)}
                onUpdateMubaya={(v, direction) => handleUpdateMubaya(v, direction)}
                onMoveParking={() => handleMoveParking(row)}
                onClickSerial={() => handleOpenDetails(row)}
                brandLogo={manufacturersData[row.manufacturer]?.logoUrl}
                brandColor={manufacturersData[row.manufacturer]?.color}
                vendorLogo={vendorsData[row.vendor]}
              />
            ))}
          <TablePagination
            component="div"
            page={table.page}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[100, 150, 200]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, row: null })}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {deleteConfirm.row?.manufacturer} {deleteConfirm.row?.model}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm({ open: false, row: null })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={performDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <MuiAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </DashboardContent>
  );
}
