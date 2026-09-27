import type { Vehicle } from 'src/types/vehicle';

import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type VehicleTableRowProps = {
  row: Vehicle;
  selected: boolean;
  onSelectRow: () => void;
  onEditRow: () => void;
  onDeleteRow: () => void;
  onSellRow: () => void;
  onUpdateMubaya: (row: Vehicle, direction?: 'forward' | 'backward') => void;
  onMoveParking: () => void;
  onClickSerial: (row: Vehicle) => void;
  brandLogo?: string;
  vendorLogo?: string;
  brandColor?: string;
};

export function VehicleTableRow({
  row,
  selected,
  onSelectRow,
  onEditRow,
  onDeleteRow,
  onSellRow,
  onUpdateMubaya,
  onMoveParking,
  onClickSerial,
  brandLogo,
  vendorLogo,
  brandColor,
}: VehicleTableRowProps) {
  const { t } = useTranslation();
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const colorHex = typeof row.color === 'object' && row.color ? (row.color as any).codes : row.color;
  const colorName = typeof row.color === 'object' && row.color ? (row.color as any).name : 'Exterior Color';

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // Format date safely
  const formatDate = (dateValue: any) => {
    if (!dateValue) return '-';
    const pDate = dateValue.seconds ? dayjs(dateValue.seconds * 1000) : dayjs(dateValue);
    return pDate.isValid() ? pDate.format('DD MMM YYYY') : '-';
  };

  return (
    <>
      <TableRow 
        hover 
        tabIndex={-1} 
        role="checkbox" 
        selected={selected}
        sx={{
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: (theme) => theme.customShadows?.z8,
            bgcolor: 'background.paper',
          },
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>
            <Chip 
              label={row.serialNumber} 
              size="small"
              color="primary"
              variant={"soft" as any}
              onClick={() => onClickSerial(row)}
              sx={{ fontWeight: 'bold', cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
            />
        </TableCell>

        <TableCell>{formatDate(row.purchasingDate)}</TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar variant="rounded" src={brandLogo || undefined} sx={{ bgcolor: brandColor || (brandLogo ? 'common.white' : 'primary.lighter'), color: 'primary.dark', width: 40, height: 40, '& img': { objectFit: 'contain' } }}>
              {!brandLogo && <Iconify icon={"solar:bus-bold-duotone" as any} width={24} />}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'fontWeightMedium' }}>
                  {row.manufacturer}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ px: 0.75, py: 0.25, borderRadius: 1, border: '1px solid rgba(0,0,0,0.2)' }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: colorHex || '#FFFFFF', border: '1px solid', borderColor: 'divider' }} />
                  <Typography variant="caption" sx={{ fontWeight: 'medium', fontSize: '0.7rem' }}>{colorName}</Typography>
                </Stack>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                {row.model} ({row.modelYear})
              </Typography>
            </Box>
          </Stack>
        </TableCell>

        <TableCell>{row.vinChassisNumber}</TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
             {vendorLogo && (
               <Avatar variant="rounded" src={vendorLogo} sx={{ bgcolor: 'common.white', width: 24, height: 24, '& img': { objectFit: 'contain' } }} />
             )}
             <Typography variant="body2">{row.vendor}</Typography>
          </Stack>
        </TableCell>

        <TableCell>{row.crn}</TableCell>

        <TableCell>
          <Tooltip title={row.soldStatus === 'Sold' ? 'Sold' : 'Available'}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Iconify 
                icon={(row.soldStatus === 'Sold' ? 'solar:close-circle-bold' : 'solar:check-circle-bold') as any} 
                sx={{ color: row.soldStatus === 'Sold' ? 'error.main' : 'success.main', width: 24, height: 24 }} 
              />
            </Box>
          </Tooltip>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              onUpdateMubaya(row, 'forward');
              handleClosePopover();
            }}
            disabled={row.mubayaStatus === 'Handed Over'}
            sx={{ color: 'info.main' }}
          >
            <Iconify icon="solar:restart-bold" />
            {t('vehicles.actions.nextMubaya')}
          </MenuItem>

          <MenuItem
            onClick={() => {
              onMoveParking();
              handleClosePopover();
            }}
            disabled={row.soldStatus === 'Sold'}
            sx={{ color: 'warning.main' }}
          >
            <Iconify icon="solar:share-bold" />
            {t('vehicles.actions.moveParking')}
          </MenuItem>

          <MenuItem
            onClick={() => {
              onSellRow();
              handleClosePopover();
            }}
            disabled={row.soldStatus === 'Sold'}
            sx={{ color: 'success.main' }}
          >
            <Iconify icon="solar:cart-3-bold" />
            {t('vehicles.actions.sell')}
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
            disabled={row.soldStatus === 'Sold'}
          >
            <Iconify icon="solar:pen-bold" />
            {t('vehicles.actions.edit')}
          </MenuItem>

          <MenuItem
            onClick={() => {
              onDeleteRow();
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
            disabled={row.soldStatus === 'Sold'}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            {t('vehicles.actions.delete')}
          </MenuItem>

          <MenuItem
            onClick={() => {
              onUpdateMubaya(row, 'backward');
              handleClosePopover();
            }}
            disabled={!row.mubayaStatus || row.mubayaStatus === 'Not Requested'}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:undo-left-round-bold" />
            {t('vehicles.actions.backMubaya')}
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
