import type { Vehicle } from 'src/types/vehicle';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type VehicleCardProps = {
  row: Vehicle;
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

export function VehicleCard({
  row,
  onEditRow,
  onDeleteRow,
  onSellRow,
  onUpdateMubaya,
  onMoveParking,
  onClickSerial,
  brandLogo,
  vendorLogo,
  brandColor,
}: VehicleCardProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const colorHex = typeof row.color === 'object' && row.color ? (row.color as any).codes : row.color;
  const colorName = typeof row.color === 'object' && row.color ? (row.color as any).name : 'Exterior Color';

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const formatDate = (dateValue: any) => {
    if (!dateValue) return '-';
    if (dateValue.seconds) {
      return new Date(dateValue.seconds * 1000).toLocaleDateString();
    }
    try {
      return new Date(dateValue).toLocaleDateString();
    } catch {
      return String(dateValue);
    }
  };

  return (
    <>
      <Card sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar variant="rounded" src={brandLogo || undefined} sx={{ bgcolor: brandColor || (brandLogo ? 'common.white' : 'primary.lighter'), color: 'primary.dark', width: 32, height: 32, '& img': { objectFit: 'contain' } }}>
              {!brandLogo && <Iconify icon={"solar:bus-bold-duotone" as any} width={20} />}
            </Avatar>
            <Typography variant="subtitle1">
              {row.manufacturer} {row.model}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ px: 1, py: 0.25, borderRadius: 1, border: '1px solid rgba(0,0,0,0.2)' }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: colorHex || '#FFFFFF', border: '1px solid', borderColor: 'divider' }} />
              <Typography variant="caption" sx={{ fontWeight: 'medium' }}>{colorName}</Typography>
            </Stack>
            <Label color="info">{row.modelYear}</Label>
          </Box>
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Serial Number
            </Typography>
            <Typography
              variant="subtitle2"
              onClick={() => onClickSerial(row)}
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {row.serialNumber}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Purchased
            </Typography>
            <Typography variant="body2">{formatDate(row.purchasingDate)}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              VIN
            </Typography>
            <Typography variant="body2" noWrap>
              {row.vinChassisNumber}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              CRN
            </Typography>
            <Typography variant="body2">{row.crn}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Sold Status
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              <Iconify 
                icon={(row.soldStatus === 'Sold' ? 'solar:close-circle-bold' : 'solar:check-circle-bold') as any} 
                sx={{ color: row.soldStatus === 'Sold' ? 'error.main' : 'success.main', width: 24, height: 24 }} 
              />
            </Box>
          </Box>
          <Box sx={{ gridColumn: 'span 2' }}>
            <Typography variant="caption" color="text.secondary">
              Vendor
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {vendorLogo && (
                <Avatar variant="rounded" src={vendorLogo} sx={{ bgcolor: 'common.white', width: 20, height: 20, '& img': { objectFit: 'contain' } }} />
              )}
              <Typography variant="body2">{row.vendor}</Typography>
            </Stack>
          </Box>

        </Box>


      </Card>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList disablePadding sx={{ p: 0.5, gap: 0.5, width: 140 }}>
          <MenuItem
            onClick={() => {
              onUpdateMubaya(row, 'forward');
              handleClosePopover();
            }}
            disabled={row.mubayaStatus === 'Handed Over'}
            sx={{ color: 'info.main' }}
          >
            <Iconify icon="solar:restart-bold" />
            Next Mubaya
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
            Move Parking
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
            Sell
          </MenuItem>
          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
            disabled={row.soldStatus === 'Sold'}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
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
            Delete
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
            Back Mubaya
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
