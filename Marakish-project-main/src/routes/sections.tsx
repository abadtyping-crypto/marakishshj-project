import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthGuard, GuestGuard } from 'src/auth/auth-guard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const UserPage = lazy(() => import('src/pages/user'));
export const VehiclePage = lazy(() => import('src/pages/vehicles'));
export const BankPortalPage = lazy(() => import('src/pages/bank-portal'));
export const RecoveryPage = lazy(() => import('src/pages/recovery'));
export const OperationExpensePage = lazy(() => import('src/pages/operation-expense'));
export const VendorPaymentsPage = lazy(() => import('src/pages/vendor-payments'));
export const ClientLedgerPage = lazy(() => import('src/pages/client-ledger'));
export const NotificationsPage = lazy(() => import('src/pages/notifications'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const ReportsPage = lazy(() => import('src/pages/reports'));
export const SettingsPage = lazy(() => import('src/pages/settings'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'vehicles', element: <VehiclePage /> },
      { path: 'vehicles/purchase', element: <VehiclePage /> },
      { path: 'vehicles/sell', element: <VehiclePage /> },
      { path: 'vehicles/expense', element: <VehiclePage /> },
      { path: 'vendor-payments', element: <VendorPaymentsPage /> },
      { path: 'client-ledger', element: <ClientLedgerPage /> },
      { path: 'bank-portals', element: <BankPortalPage /> },
      { path: 'recovery', element: <RecoveryPage /> },
      { path: 'operation-expense', element: <OperationExpensePage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <GuestGuard>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </GuestGuard>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
