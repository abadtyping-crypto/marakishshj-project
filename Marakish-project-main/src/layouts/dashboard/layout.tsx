import type { Breakpoint } from '@mui/material/styles';

import { merge } from 'es-toolkit';
import { useState, useEffect } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import { NavMobile, NavDesktop } from './nav';
import { layoutClasses } from '../core/classes';
import { dashboardLayoutVars } from './css-vars';
import { _account } from '../nav-config-account';
import { navData } from '../nav-config-dashboard';
import { MainSection } from '../core/main-section';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../nav-config-workspace';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { MenuButton } from '../components/menu-button';
import { AccountPopover } from '../components/account-popover';

import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: DashboardLayoutProps) {
  useEffect(() => {
    // Check active state
  }, []);

  const theme = useTheme();
  const pathname = usePathname();

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  // Sidebar collapse state
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem('sidebar-collapsed', String(newValue));
      return newValue;
    });
  };


  const renderBottomArea = (isCollapsed: boolean) => {
    const isActived = pathname === '/settings';

    const listItemButton = (
      <ListItemButton
        disableGutters
        component={RouterLink}
        href="/settings"
        sx={[
          (sysTheme) => ({
            pl: isCollapsed ? 1.5 : 2,
            py: 1,
            gap: 2,
            pr: 1.5,
            borderRadius: 0.75,
            typography: 'body2',
            fontWeight: 'fontWeightMedium',
            color: 'text.secondary',
            minHeight: 44,
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            ...(isActived && {
              fontWeight: 'fontWeightSemiBold',
              color: 'primary.main',
              bgcolor: varAlpha(sysTheme.vars.palette.primary.mainChannel, 0.08),
              '&:hover': {
                bgcolor: varAlpha(sysTheme.vars.palette.primary.mainChannel, 0.16),
              },
            }),
          }),
        ]}
      >
        <Box component="span" sx={{ width: 24, height: 24 }}>
          <Iconify icon="solar:settings-bold-duotone" />
        </Box>

        {!isCollapsed && (
          <Box component="span" sx={{ flexGrow: 1 }}>
            Settings
          </Box>
        )}
      </ListItemButton>
    );

    return (
      <Box sx={{ p: 2, mt: 'auto' }}>
        <ListItem disableGutters disablePadding>
          {isCollapsed ? (
            <Tooltip title="Settings" placement="right">
              {listItemButton}
            </Tooltip>
          ) : (
            listItemButton
          )}
        </ListItem>
      </Box>
    );
  };

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
          />
          <NavMobile
            data={navData}
            open={open}
            onClose={onClose}
            workspaces={_workspaces}
            slots={{ bottomArea: renderBottomArea(false) }}
          />

          {/** @slot Collapse toggle for desktop */}
          <IconButton
            onClick={toggleCollapsed}
            sx={{
              display: 'none',
              [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
              ml: -1,
              mr: 1,
            }}
          >
            <Iconify
              icon={(collapsed ? 'solar:alt-arrow-right-linear' : 'solar:alt-arrow-left-linear') as any}
              width={24}
            />
          </IconButton>
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } }}>
          {/** @slot Searchbar */}
          <Searchbar />

          {/** @slot Account drawer */}
          <AccountPopover data={_account} />
        </Box>
      ),
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => null;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop
          data={navData}
          layoutQuery={layoutQuery}
          workspaces={_workspaces}
          collapsed={collapsed}
          slots={{ bottomArea: renderBottomArea(collapsed) }}
        />
      }
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(theme), ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              paddingInlineStart: collapsed
                ? 'var(--layout-nav-vertical-width-collapsed)'
                : 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left', 'padding-right'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
          [`& .${layoutClasses.header}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              paddingInlineStart: collapsed
                ? 'var(--layout-nav-vertical-width-collapsed)'
                : 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left', 'padding-right'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}
