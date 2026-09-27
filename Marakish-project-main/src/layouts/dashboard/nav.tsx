import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { NavUser } from '../components/nav-user';

import type { NavItem } from '../nav-config-dashboard';
import type { WorkspacesPopoverProps } from '../components/workspaces-popover';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
  collapsed = false,
}: NavContentProps & { layoutQuery: Breakpoint; collapsed?: boolean }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: collapsed ? 1.5 : 2.5,
        top: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        insetInlineStart: 0,
        zIndex: 'var(--layout-nav-zIndex)',
        width: collapsed
          ? 'var(--layout-nav-vertical-width-collapsed)'
          : 'var(--layout-nav-vertical-width)',
        borderInlineEnd: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        transition: theme.transitions.create(['width', 'padding'], {
          easing: 'var(--layout-transition-easing)',
          duration: 'var(--layout-transition-duration)',
        }),
        bgcolor: 'background.default',
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} collapsed={collapsed} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx, collapsed = false }: NavContentProps & { collapsed?: boolean }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <>
      {!collapsed && <Logo />}
      {collapsed && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Logo sx={{ width: 40, height: 40 }} />
        </Box>
      )}

      {slots?.topArea}

      {!collapsed && <NavUser />}

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="ul"
            sx={{
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {data.map((item) => {
              const isActived = item.path === pathname;
              const itemTitle = item.translationKey ? t(item.translationKey) : item.title;

              const listItemButton = (
                <ListItemButton
                  disableGutters
                  component={RouterLink}
                  href={item.path}
                  sx={[
                    (theme) => ({
                      pl: collapsed ? 1.5 : 2,
                      py: 1,
                      gap: 2,
                      pr: 1.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      fontWeight: 'fontWeightMedium',
                      color: theme.vars.palette.text.secondary,
                      minHeight: 44,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      ...(isActived && {
                        fontWeight: 'fontWeightSemiBold',
                        color: theme.vars.palette.primary.main,
                        bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                        '&:hover': {
                          bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                        },
                      }),
                    }),
                  ]}
                >
                  <Box component="span" sx={{ width: 24, height: 24 }}>
                    {item.icon}
                  </Box>

                  {!collapsed && (
                    <>
                      <Box component="span" sx={{ flexGrow: 1 }}>
                        {itemTitle}
                      </Box>

                      {item.info && item.info}
                    </>
                  )}
                </ListItemButton>
              );

              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  {collapsed ? (
                    <Tooltip title={itemTitle} placement="right">
                      {listItemButton}
                    </Tooltip>
                  ) : (
                    listItemButton
                  )}
                </ListItem>
              );
            })}
          </Box>
        </Box>
      </Scrollbar >

      {slots?.bottomArea}
    </>
  );
}
