import { Iconify } from 'src/components/iconify';

import type { AccountPopoverProps } from './components/account-popover';

// ----------------------------------------------------------------------

export const _account: (AccountPopoverProps['data'] & { translationKey?: string }[]) = [
  {
    label: 'Home',
    href: '/',
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
    translationKey: 'profile.home',
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
    translationKey: 'profile.profile',
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
    translationKey: 'profile.settings',
  },
];
