import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';

import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { db } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { useAuth } from 'src/auth/auth-context';

import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { displayName } = useAuth();

  const [mubayaStats, setMubayaStats] = useState({
    notRequested: 0,
    requested: 0,
    arrived: 0,
    handedOver: 0,
  });

  const [vehicleStats, setVehicleStats] = useState({
    totalAvailable: 0,
    totalSold: 0,
    monthPurchased: 0,
    monthSold: 0,
    prevMonthPurchased: 0,
    prevMonthSold: 0,
  });

  const [portalBalances, setPortalBalances] = useState<{ name: string; balance: number }[]>([]);

  const [monthlyChartData, setMonthlyChartData] = useState({
    purchases: Array(12).fill(0),
    sales: Array(12).fill(0),
  });

  useEffect(() => {
    const startOfMonth = dayjs().startOf('month');
    const startOfPrevMonth = dayjs().subtract(1, 'month').startOf('month');
    const endOfPrevMonth = dayjs().subtract(1, 'month').endOf('month');
    const startOfYear = dayjs().startOf('year');

    const unsubVehicles = onSnapshot(collection(db, 'vehicles'), (snapshot) => {
      let available = 0;
      let sold = 0;
      let purchasedThisMonth = 0;
      let purchasedPrevMonth = 0;
      const purchasesByMonth = Array(12).fill(0);

      snapshot.docs.forEach((doc) => {
        const data = doc.data();

        // Availability Stats
        if (data.soldStatus === 'Sold') sold++;
        else available++;

        // Purchase Stats
        let pDate = null;
        if (data.purchasingDate?.seconds) {
          pDate = dayjs(data.purchasingDate.seconds * 1000);
        } else if (data.purchasingDate) {
          pDate = dayjs(data.purchasingDate);
        }

        if (pDate) {
          if (pDate.isAfter(startOfMonth)) {
            purchasedThisMonth++;
          }
          if (pDate.isAfter(startOfPrevMonth) && pDate.isBefore(endOfPrevMonth)) {
            purchasedPrevMonth++;
          }
          if (pDate.isAfter(startOfYear)) {
            purchasesByMonth[pDate.month()]++;
          }
        }
      });

      setVehicleStats((prev) => ({
        ...prev,
        totalAvailable: available,
        totalSold: sold,
        monthPurchased: purchasedThisMonth,
        prevMonthPurchased: purchasedPrevMonth,
      }));

      setMonthlyChartData((prev) => ({
        ...prev,
        purchases: purchasesByMonth,
      }));

      // Update Mubaya Stats (Logic moved here to avoid double listener if preferred, or keep separate)
      const mStats = { notRequested: 0, requested: 0, arrived: 0, handedOver: 0 };
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const status = data.mubayaStatus || 'Not Requested';
        if (status === 'Not Requested') mStats.notRequested++;
        else if (status === 'Requested') mStats.requested++;
        else if (status === 'Arrived') mStats.arrived++;
        else if (status === 'Handed Over') mStats.handedOver++;
      });
      setMubayaStats(mStats);
    });

    const unsubSold = onSnapshot(collection(db, 'soldVehicles'), (snapshot) => {
      let soldThisMonthCount = 0;
      let soldPrevMonthCount = 0;
      const salesByMonth = Array(12).fill(0);

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        let sDate = null;
        if (data.saleDate?.seconds) {
          sDate = dayjs(data.saleDate.seconds * 1000);
        } else if (data.saleDate) {
          sDate = dayjs(data.saleDate);
        }

        if (sDate) {
          if (sDate.isAfter(startOfMonth)) {
            soldThisMonthCount++;
          }
          if (sDate.isAfter(startOfPrevMonth) && sDate.isBefore(endOfPrevMonth)) {
            soldPrevMonthCount++;
          }
          if (sDate.isAfter(startOfYear)) {
            salesByMonth[sDate.month()]++;
          }
        }
      });

      setVehicleStats((prev) => ({
        ...prev,
        monthSold: soldThisMonthCount,
        prevMonthSold: soldPrevMonthCount,
      }));

      setMonthlyChartData((prev) => ({
        ...prev,
        sales: salesByMonth,
      }));
    });

    const unsubPortals = onSnapshot(collection(db, 'bankPortal'), (snapshot) => {
      const portals = snapshot.docs
        .map((d) => ({
          name: d.data().bankPortalName,
          balance: d.data().balance || 0,
        }))
        .filter((p) => !!p.name)
        .sort((a, b) => b.balance - a.balance);

      setPortalBalances(portals);
    });

    return () => {
      unsubVehicles();
      unsubSold();
      unsubPortals();
    };
  }, []);

  // Calculate percentage change from previous month
  const calculatePercentChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Number((((current - previous) / previous) * 100).toFixed(1));
  };

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        {t('dashboard.welcome', { name: displayName || '' })}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title={t('dashboard.widgets.monthlySold')}
            percent={calculatePercentChange(vehicleStats.monthSold, vehicleStats.prevMonthSold)}
            total={vehicleStats.monthSold}
            icon={
              <Iconify
                icon="solar:check-circle-bold"
                width={64}
                height={64}
                sx={{ color: 'primary.main', opacity: 0.8 }}
              />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title={t('dashboard.widgets.monthlyPurchased')}
            percent={calculatePercentChange(vehicleStats.monthPurchased, vehicleStats.prevMonthPurchased)}
            total={vehicleStats.monthPurchased}
            color="secondary"
            icon={
              <Iconify
                icon="solar:cart-3-bold"
                width={64}
                height={64}
                sx={{ color: 'secondary.main', opacity: 0.8 }}
              />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title={t('dashboard.widgets.availableVehicles')}
            percent={0}
            total={vehicleStats.totalAvailable}
            color="warning"
            icon={
              <Iconify
                icon="solar:home-angle-bold-duotone"
                width={64}
                height={64}
                sx={{ color: 'warning.main', opacity: 0.8 }}
              />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title={t('dashboard.widgets.totalSold')}
            percent={0}
            total={vehicleStats.totalSold}
            color="error"
            icon={
              <Iconify
                icon="solar:share-bold"
                width={64}
                height={64}
                sx={{ color: 'error.main', opacity: 0.8 }}
              />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title={t('dashboard.charts.mubayaStatus')}
            chart={{
              series: [
                { label: t('vehicles.table.notRequested'), value: mubayaStats.notRequested },
                { label: t('vehicles.table.requested'), value: mubayaStats.requested },
                { label: t('vehicles.table.arrived'), value: mubayaStats.arrived },
                { label: t('vehicles.table.handedOver'), value: mubayaStats.handedOver },
              ],
              colors: [
                theme.palette.text.disabled,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.success.main,
              ],
              onItemClick: (label: string) => {
                navigate(`/vehicles?mubayaStatus=${encodeURIComponent(label)}`);
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title={t('dashboard.charts.businessOverview')}
            subheader={t('dashboard.charts.purchasedVsSold')}
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                { name: t('dashboard.charts.purchased'), data: monthlyChartData.purchases },
                { name: t('dashboard.charts.sold'), data: monthlyChartData.sales },
              ],
              options: {
                tooltip: {
                  y: {
                    formatter: (value: number) => `${value} ${t('dashboard.charts.vehicles')}`,
                  },
                },
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title={t('dashboard.charts.portalBalances')}
            subheader={t('dashboard.charts.liquidity')}
            chart={{
              categories: portalBalances.map((p) => p.name),
              series: [{ name: t('dashboard.charts.balance'), data: portalBalances.map((p) => p.balance) }],
              options: {
                colors: [theme.palette.primary.main],
                plotOptions: {
                  bar: {
                    colors: {
                      ranges: [
                        {
                          from: -Infinity,
                          to: -0.01,
                          color: theme.palette.error.main,
                        },
                      ],
                    },
                  },
                },
                tooltip: {
                  y: {
                    formatter: (value: number) => `${value.toLocaleString()} AED`,
                  },
                },
              },
            }}
          />
        </Grid>


      </Grid>
    </DashboardContent>
  );
}
