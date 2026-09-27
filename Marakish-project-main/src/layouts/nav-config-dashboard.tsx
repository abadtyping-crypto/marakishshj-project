import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const icon = (name: string) => <Iconify icon={name as any} width={24} height={24} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  translationKey?: string;
};

export const navData: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('solar:widget-5-bold-duotone'),
    translationKey: 'nav.dashboard',
  },
  {
    title: 'List Of Vehicles',
    path: '/vehicles',
    icon: icon('mdi:car-multiple'),
    translationKey: 'nav.listOfVehicles',
  },
  {
    title: 'Purchase Vehicle',
    path: '/vehicles/purchase',
    icon: icon('solar:cart-large-4-bold-duotone'),
    translationKey: 'nav.purchaseVehicle',
  },
  {
    title: 'Sell Vehicle',
    path: '/vehicles/sell',
    icon: icon('solar:dollar-minimalistic-bold-duotone'),
    translationKey: 'nav.sellVehicle',
  },
  {
    title: 'Vehicle Expense',
    path: '/vehicles/expense',
    icon: icon('solar:bill-list-bold-duotone'),
    translationKey: 'nav.vehicleExpense',
  },
  {
    title: 'Vendor Payments',
    path: '/vendor-payments',
    icon: icon('solar:wallet-money-bold-duotone'),
    translationKey: 'nav.vendorPayments',
  },
  {
    title: 'Client Ledger',
    path: '/client-ledger',
    icon: icon('solar:notebook-bold-duotone'),
    translationKey: 'nav.clientLedger',
  },
  {
    title: 'Operation Expense',
    path: '/operation-expense',
    icon: icon('solar:bill-cross-bold-duotone'),
    translationKey: 'nav.operationExpense',
  },
  {
    title: 'Statements',
    path: '/reports',
    icon: icon('solar:printer-minimalistic-bold-duotone'),
    translationKey: 'nav.statements',
  },
  {
    title: 'Bank Portals',
    path: '/bank-portals',
    icon: icon('solar:buildings-2-bold-duotone'),
    translationKey: 'nav.bankPortals',
  },
  {
    title: 'Receive Payment',
    path: '/bank-portals?action=receive',
    icon: icon('solar:card-recive-bold-duotone'),
    translationKey: 'nav.receivePayment',
  },
  {
    title: 'Portal Transfer',
    path: '/bank-portals?action=transfer',
    icon: icon('solar:card-transfer-bold-duotone'),
    translationKey: 'nav.portalTransfer',
  },
  {
    title: 'Recovery',
    path: '/recovery',
    icon: icon('solar:delivery-bold-duotone'),
    translationKey: 'nav.recovery',
  },
];

export const allLangs = [
  {
    value: 'en',
    label: 'English',
    icon: 'circle-flags:us',
  },
  {
    value: 'ar',
    label: 'العربية',
    icon: 'circle-flags:ae',
  },
];
