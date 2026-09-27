import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
  collection,
} from 'firebase/firestore';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { db } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { generatePDF } from '../utils';

// ----------------------------------------------------------------------

export function ReportsView() {
  const { t } = useTranslation();
  const [reportType, setReportType] = useState('bank');

  // Date Selection Mode: 'month' or 'range'
  const [dateMode, setDateMode] = useState<'month' | 'range'>('month');

  // States
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));
  const [startDate, setStartDate] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));

  // Dropdown Data
  const [bankPortals, setBankPortals] = useState<any[]>([]);
  const [vendors, setVendors] = useState<string[]>([]);
  const [clients, setClients] = useState<string[]>([]);

  // Selected Filter
  const [selectedEntity, setSelectedEntity] = useState('All');

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
    try {
      // Banks
      const bankSnap = await getDocs(collection(db, 'bankPortal'));
      setBankPortals(bankSnap.docs.map((d) => ({ id: d.id, name: d.data().bankPortalName })));

      // Vendors (From vehiclePurchasing) - distinct names
      const purSnap = await getDocs(collection(db, 'vehiclePurchasing'));
      const vendorSet = new Set<string>();
      purSnap.docs.forEach((d) => {
        if (d.data().vendor) vendorSet.add(d.data().vendor);
      });
      setVendors(Array.from(vendorSet).sort());

      // Clients (from soldVehicles) - distinct clientName
      const soldSnap = await getDocs(collection(db, 'soldVehicles'));
      const clientSet = new Set<string>();
      soldSnap.docs.forEach((d) => {
        if (d.data().clientName) clientSet.add(d.data().clientName);
      });
      setClients(Array.from(clientSet).sort());
    } catch (e) {
      console.error(e);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedMonth(val);
    setStartDate(dayjs(val).startOf('month').format('YYYY-MM-DD'));
    setEndDate(dayjs(val).endOf('month').format('YYYY-MM-DD'));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const start = Timestamp.fromDate(new Date(startDate));
      // End date should be end of that day
      const endObj = new Date(endDate);
      endObj.setHours(23, 59, 59, 999);
      const end = Timestamp.fromDate(endObj);

      if (reportType === 'bank') {
        await generateBankReport(start, end);
      } else if (reportType === 'purchase') {
        await generatePurchaseReport(start, end);
      } else if (reportType === 'sold') {
        await generateSoldReport(start, end);
      } else if (reportType === 'expenses') {
        await generateExpenseReport(start, end);
      } else if (reportType === 'profit') {
        await generateProfitReport(start, end);
      }
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error generating report: ' + (error as any).message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const generateBankReport = async (start: Timestamp, end: Timestamp) => {
    // 1. Fetch current portal(s) data
    const bankSnap = await getDocs(collection(db, 'bankPortal'));
    const portals = bankSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

    // 2. Fetch all transactions from Start onwards (to calculate opening balance relative to current)
    // Actually, it's easier to query ALL transactions for the selected portals to build a timeline,
    // but that's expensive. Let's stick to the Net Change logic.
    const allTransFromStartQ = query(
      collection(db, 'bankTransaction'),
      where('date', '>=', start),
      orderBy('date', 'desc')
    );
    const allTransFromStartSnap = await getDocs(allTransFromStartQ);
    let allFromStart = allTransFromStartSnap.docs.map((d) => d.data());

    if (selectedEntity !== 'All') {
      allFromStart = allFromStart.filter((d) => d.bankPortalName === selectedEntity);
    }

    // 3. Calculate Balances
    const currentPortals = selectedEntity === 'All'
      ? portals
      : portals.filter(p => p.bankPortalName === selectedEntity);

    const currentBalanceSum = currentPortals.reduce((sum, p) => sum + (Number(p.balance) || 0), 0);

    // netChangeSinceStart = (Credits >= Start) - (Debits >= Start)
    const netChangeSinceStart = allFromStart.reduce((sum, trans) => {
      const amt = Number(trans.amount) || 0;
      return trans.type === 'Credit' ? sum + amt : sum - amt;
    }, 0);

    const openingBalance = currentBalanceSum - netChangeSinceStart;

    // Period Transactions (Filter from allFromStart)
    const periodTrans = allFromStart.filter(trans => trans.date.seconds <= end.seconds);

    const periodCredits = periodTrans.reduce((sum, trans) => trans.type === 'Credit' ? sum + (Number(trans.amount) || 0) : sum, 0);
    const periodDebits = periodTrans.reduce((sum, trans) => trans.type === 'Debit' ? sum + (Number(trans.amount) || 0) : sum, 0);
    const closingBalance = openingBalance + periodCredits - periodDebits;

    const showPortalColumn = selectedEntity === 'All';

    const columns = ['Date', 'ID', 'Description', 'Type', 'Amount'];
    if (showPortalColumn) columns.push('Portal');

    // Fetch matching expenses to enrich description with notes
    const noteMap = new Map<string, string>();
    try {
      const vexQ = query(collection(db, 'vehicleExpenses'), where('date', '>=', start), where('date', '<=', end));
      const oexQ = query(collection(db, 'operationExpenses'), where('date', '>=', start), where('date', '<=', end));
      const [vexSnap, oexSnap] = await Promise.all([getDocs(vexQ), getDocs(oexQ)]);

      const addToMap = (docs: any[]) => {
        docs.forEach((doc) => {
          const data = doc.data();
          if (data.date && data.amount && data.notes && data.notes !== 'Manual') {
            const key = `${data.date.seconds}_${Number(data.amount)}`;
            // Avoid overwriting if multiple matches (rare), just keep first or overwrite
            noteMap.set(key, data.notes);
          }
        });
      };
      addToMap(vexSnap.docs);
      addToMap(oexSnap.docs);
    } catch (e) {
      console.error('Error fetching expenses for enrichment:', e);
    }

    const tableData = periodTrans.map((d) => {
      let desc = d.description || '';

      // Attempt using noteMap
      if (d.date && d.amount) {
        const key = `${d.date.seconds}_${Number(d.amount)}`;
        const note = noteMap.get(key);
        if (note && !desc.includes(note)) {
          desc += ` - ${note}`;
        }
      }

      const row = [
        dayjs(d.date.seconds * 1000).format('DD/MM/YYYY'),
        d.transactionId || '-',
        desc,
        d.type,
        d.amount?.toLocaleString() || '0',
      ];
      if (showPortalColumn) row.push(d.bankPortalName);
      return row;
    });

    const summaries: any[] = [
      { label: 'Transactions', value: periodTrans.length },
      { label: 'Opening Balance', value: `${openingBalance.toLocaleString()} AED`, isBold: true },
      { label: 'Total Credits', value: `${periodCredits.toLocaleString()} AED`, color: 'green' },
      { label: 'Total Debits', value: `${periodDebits.toLocaleString()} AED`, color: 'red' },
      { label: 'Closing Balance', value: `${closingBalance.toLocaleString()} AED`, isBold: true },
    ];

    generatePDF(
      'Bank Transaction Statement',
      `Period: ${dayjs(startDate).format('DD MMM YYYY')} to ${dayjs(endDate).format('DD MMM YYYY')} | Portal: ${selectedEntity}`,
      columns,
      tableData,
      summaries as any
    );
  };

  const generatePurchaseReport = async (start: Timestamp, end: Timestamp) => {
    const q = query(
      collection(db, 'vehicles'),
      where('purchasingDate', '>=', start),
      where('purchasingDate', '<=', end)
    );
    const snap = await getDocs(q);
    let data = snap.docs.map((d) => d.data());

    if (selectedEntity !== 'All') {
      data = data.filter((d) => d.vendor === selectedEntity);
    }

    const tableData = data.map((d) => [
      d.purchasingDate?.seconds ? dayjs(d.purchasingDate.seconds * 1000).format('DD/MM/YYYY') : '-',
      d.serialNumber,
      `${d.manufacturer || 'Unknown'} ${d.model || ''} (${d.modelYear || 'N/A'})`,
      d.vinChassisNumber || '-',
      d.vendor || '-',
      `${(Number(d.vehiclePurchaseCost || d.purchasePrice) || 0).toLocaleString()} AED`,
    ]);

    const totalInvestment = data.reduce((sum, d: any) => sum + (Number(d.vehiclePurchaseCost || d.purchasePrice) || 0), 0);

    const summaries: any[] = [
      { label: 'Total Vehicles', value: data.length },
      { label: 'Total Investment', value: `${totalInvestment.toLocaleString()} AED`, color: 'green' },
    ];

    generatePDF(
      'Vehicle Purchase Statement',
      `Period: ${dayjs(startDate).format('DD MMM YYYY')} to ${dayjs(endDate).format('DD MMM YYYY')} | Vendor: ${selectedEntity}`,
      ['Date', 'Serial', 'Vehicle', 'VIN', 'Vendor', 'Price'],
      tableData,
      summaries as any
    );
  };

  const generateSoldReport = async (start: Timestamp, end: Timestamp) => {
    const q = query(
      collection(db, 'soldVehicles'),
      where('saleDate', '>=', start),
      where('saleDate', '<=', end)
    );
    const snap = await getDocs(q);
    let soldData = snap.docs.map((d) => d.data());

    if (selectedEntity !== 'All') {
      soldData = soldData.filter((d) => d.clientName === selectedEntity);
    }

    // Fetch vehicles to fill in missing details for existing records
    const vSnap = await getDocs(collection(db, 'vehicles'));
    const vehicleMap = new Map();
    vSnap.docs.forEach(d => {
      const v = d.data();
      vehicleMap.set(v.serialNumber, v);
    });

    const tableData = soldData.map((d) => {
      const v = vehicleMap.get(d.serialNumber);

      // Explicitly check for falsy values to avoid "undefined" string literal
      const manufacturer = d.manufacturer || v?.manufacturer || 'Unknown';
      const model = d.model || v?.model || 'Unknown';
      const modelYear = d.modelYear || v?.modelYear || 'N/A';

      // Robust price check: check all possible field names
      const price = Number(d.sellingPrice || d.salePrice || d.price || 0);

      return [
        d.saleDate?.seconds ? dayjs(d.saleDate.seconds * 1000).format('DD/MM/YYYY') : '-',
        d.serialNumber || '-',
        `${manufacturer} ${model} (${modelYear})`,
        d.clientName || 'Walk-in',
        `${price.toLocaleString()} AED`,
      ];
    });

    const totalSales = soldData.reduce((sum, d: any) => sum + (Number(d.sellingPrice || d.salePrice || d.price) || 0), 0);

    const summaries: any[] = [
      { label: 'Vehicles Sold', value: soldData.length },
      { label: 'Total Revenue', value: `${totalSales.toLocaleString()} AED`, color: 'green' },
    ];

    if (selectedEntity !== 'All') {
      summaries.push({ label: 'Average Ticket', value: `${(totalSales / (soldData.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED` });
    }

    const reportTitle = selectedEntity === 'All' ? 'Sold Vehicles Statement' : 'Client Sales Statement';
    const reportSubtitle = `Period: ${dayjs(startDate).format('DD MMM YYYY')} to ${dayjs(endDate).format('DD MMM YYYY')} | ${selectedEntity === 'All' ? 'All Clients' : `Client: ${selectedEntity}`}`;

    generatePDF(
      reportTitle,
      reportSubtitle,
      ['Date', 'Serial', 'Vehicle', 'Client', 'Sale Price'],
      tableData,
      summaries
    );
  };

  const generateExpenseReport = async (start: Timestamp, end: Timestamp) => {
    const vexQ = query(
      collection(db, 'vehicleExpenses'),
      where('date', '>=', start),
      where('date', '<=', end)
    );
    const vexSnap = await getDocs(vexQ);
    const vexData = vexSnap.docs.map((d) => ({ ...d.data(), type: 'Vehicle Expense' }));

    const oexQ = query(
      collection(db, 'operationExpenses'),
      where('date', '>=', start),
      where('date', '<=', end)
    );
    const oexSnap = await getDocs(oexQ);
    const oexData = oexSnap.docs.map((d) => ({ ...d.data(), type: 'Operation Expense' }));

    const all = [...vexData, ...oexData].sort((a: any, b: any) => b.date.seconds - a.date.seconds);

    const tableData = all.map((d: any) => {
      let desc = d.description || '';
      if (!desc && d.notes) desc = d.notes;
      if (!desc) desc = `Vehicle: ${d.serialNumber || ''}`;
      // Append notes if they exist and aren't already the description
      if (d.notes && d.notes !== desc) {
        desc += ` - ${d.notes}`;
      }

      return [
        dayjs(d.date.seconds * 1000).format('DD/MM/YYYY'),
        d.type,
        d.category,
        desc,
        `${(Number(d.amount) || 0).toLocaleString()} AED`,
      ];
    });

    const total = all.reduce((sum, curr: any) => sum + (Number(curr.amount) || 0), 0);
    const vehicleTotal = vexData.reduce((sum, d: any) => sum + (Number(d.amount) || 0), 0);
    const opTotal = oexData.reduce((sum, d: any) => sum + (Number(d.amount) || 0), 0);

    const summaries: any[] = [
      { label: 'Total Records', value: all.length },
      { label: 'Vehicle Exp.', value: `${vehicleTotal.toLocaleString()} AED` },
      { label: 'Operation Exp.', value: `${opTotal.toLocaleString()} AED` },
      { label: 'Total Expense', value: `${total.toLocaleString()} AED`, color: 'red' },
    ];

    generatePDF(
      'Expenses Statement',
      `Period: ${dayjs(startDate).format('DD MMM YYYY')} to ${dayjs(endDate).format('DD MMM YYYY')}`,
      ['Date', 'Type', 'Category', 'Description/Ref', 'Amount'],
      tableData,
      summaries as any
    );
  };

  const generateProfitReport = async (start: Timestamp, end: Timestamp) => {
    // Get sold vehicles in the period
    const soldQ = query(
      collection(db, 'soldVehicles'),
      where('saleDate', '>=', start),
      where('saleDate', '<=', end)
    );
    const soldSnap = await getDocs(soldQ);
    const soldData = soldSnap.docs.map((d) => d.data());

    // Get all vehicles to match with sold vehicles for accurate costs
    const vehiclesSnap = await getDocs(collection(db, 'vehicles'));
    const vehiclesMap = new Map();
    vehiclesSnap.docs.forEach(d => {
      const v = d.data();
      vehiclesMap.set(v.serialNumber, v);
    });

    // Calculate totals
    let totalSales = 0;
    let totalCostOfSold = 0;

    soldData.forEach((sale: any) => {
      // Get selling price
      const salePrice = Number(sale.sellingPrice || sale.salePrice || sale.price || 0);
      totalSales += salePrice;

      // Get cost from vehicles collection (more accurate)
      const vehicle = vehiclesMap.get(sale.serialNumber);
      const cost = vehicle
        ? Number(vehicle.totalAccruedCost || vehicle.vehiclePurchaseCost || vehicle.purchasePrice || 0)
        : Number(sale.totalAccruedCost || sale.purchasePrice || sale.vehiclePurchaseCost || 0);

      totalCostOfSold += cost;
    });

    // Get operation expenses for the period
    const oexQ = query(
      collection(db, 'operationExpenses'),
      where('date', '>=', start),
      where('date', '<=', end)
    );
    const oexSnap = await getDocs(oexQ);
    const totalOpExpenses = oexSnap.docs.reduce(
      (sum, d) => sum + (Number(d.data().amount) || 0),
      0
    );

    const grossProfit = totalSales - totalCostOfSold;
    const netProfit = grossProfit - totalOpExpenses;

    const tableData = [
      ['Total Sales Revenue', `Receipts from ${soldData.length} vehicles`, `+ ${totalSales.toLocaleString()} AED`],
      ['Cost of Goods Sold', 'Purchase & Maintenance Costs', `- ${totalCostOfSold.toLocaleString()} AED`],
      ['GROSS PROFIT', 'Sales - COGS', `= ${grossProfit.toLocaleString()} AED`],
      ['Operation Expenses', 'Office, Staff, Utilities, Misc.', `- ${totalOpExpenses.toLocaleString()} AED`],
    ];

    const summaries: any[] = [
      { label: 'Vehicles Sold', value: soldData.length },
      { label: 'Gross Profit', value: `${grossProfit.toLocaleString()} AED`, color: grossProfit >= 0 ? 'green' : 'red' },
      { label: 'Op Expenses', value: `${totalOpExpenses.toLocaleString()} AED`, color: 'red' },
      { label: 'NET PROFIT', value: `${netProfit.toLocaleString()} AED`, color: netProfit >= 0 ? 'green' : 'red', isBold: true },
    ];

    generatePDF(
      'Profit & Loss Statement',
      `Period: ${dayjs(startDate).format('DD MMM YYYY')} to ${dayjs(endDate).format('DD MMM YYYY')}`,
      ['Description', 'Details', 'Amount (AED)'],
      tableData,
      summaries as any
    );
  };

  return (
    <DashboardContent maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('reports.title')}
      </Typography>

      <Card>
        <Tabs
          value={reportType}
          onChange={(e, v) => {
            setReportType(v);
            setSelectedEntity('All');
          }}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
        >
          <Tab label={t('reports.tabs.bank')} value="bank" />
          <Tab label={t('reports.tabs.purchase')} value="purchase" />
          <Tab label={t('reports.tabs.sold')} value="sold" />
          <Tab label={t('reports.tabs.expenses')} value="expenses" />
          <Tab label={t('reports.tabs.profit')} value="profit" />
        </Tabs>

        <CardContent>
          <Grid container spacing={3} alignItems="center">
            {/* Date Mode Toggle */}
            <Grid size={{ xs: 12 }}>
              <Box display="flex" gap={2} mb={1}>
                <Button
                  variant={dateMode === 'month' ? 'contained' : 'outlined'}
                  onClick={() => setDateMode('month')}
                >
                  {t('reports.dateModes.monthly')}
                </Button>
                <Button
                  variant={dateMode === 'range' ? 'contained' : 'outlined'}
                  onClick={() => setDateMode('range')}
                >
                  {t('reports.dateModes.customRange')}
                </Button>
              </Box>
            </Grid>

            {/* Date Inputs */}
            {dateMode === 'month' ? (
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label={t('reports.labels.selectMonth')}
                  type="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            ) : (
              <>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    label={t('reports.labels.startDate')}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ max: dayjs().format('YYYY-MM-DD') }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    label={t('reports.labels.endDate')}
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ max: dayjs().format('YYYY-MM-DD') }}
                  />
                </Grid>
              </>
            )}

            {/* Conditional Filters */}
            {reportType === 'bank' && (
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label={t('reports.labels.bankPortal')}
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                >
                  <MenuItem value="All">{t('reports.labels.allPortals')}</MenuItem>
                  {bankPortals.map((b) => (
                    <MenuItem key={b.id} value={b.name}>
                      {b.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}

            {reportType === 'purchase' && (
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label={t('reports.labels.vendor')}
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                >
                  <MenuItem value="All">{t('reports.labels.allVendors')}</MenuItem>
                  {vendors.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}

            {reportType === 'sold' && (
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label={t('reports.labels.client')}
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                >
                  <MenuItem value="All">{t('reports.labels.allClients')}</MenuItem>
                  {clients.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handleGenerate}
                disabled={loading}
                startIcon={<Iconify icon={'solar:printer-minimalistic-bold-duotone' as any} />}
                sx={{ gap: 1, px: 3 }}
              >
                {loading ? t('reports.generating') : t('reports.generate')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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

      {/* Visual Guide / Preview could go here */}
    </DashboardContent>
  );
}
