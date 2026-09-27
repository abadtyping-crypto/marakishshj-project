import dayjs from 'dayjs';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuList from '@mui/material/MenuList';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type RecoveryTableRowProps = {
    row: any;
    selected: boolean;
    onEditRow: () => void;
    onDeleteRow: () => void;
    onSelectRow: () => void;
};

export function RecoveryTableRow({
    row,
    selected,
    onEditRow,
    onDeleteRow,
    onSelectRow,
}: RecoveryTableRowProps) {
    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const {
        RecoveryID,
        Date: recoveryDate,
        'Serial Number': serialNumber,
        'Recovery Person': person,
        From,
        To,
        Amount,
        'Payment Status': status,
    } = row;

    const formattedDate = recoveryDate?.seconds
        ? dayjs(recoveryDate.seconds * 1000).format('DD MMM YYYY')
        : dayjs(recoveryDate).format('DD MMM YYYY');

    return (
        <>
            <TableRow hover selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox checked={selected} onChange={onSelectRow} />
                </TableCell>
                <TableCell>{RecoveryID}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 200 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {serialNumber}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {row.vehicleDetails ? `${row.vehicleDetails.manufacturer} ${row.vehicleDetails.model} (${row.vehicleDetails.modelYear})` : '...'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                            <Label variant="outlined" color="default" sx={{ fontSize: '10px', height: 20 }}>
                                VIN: {row.vehicleDetails?.vinChassisNumber || 'N/A'}
                            </Label>
                            <Label variant="outlined" color="secondary" sx={{ fontSize: '10px', height: 20 }}>
                                Vendor: {row.vehicleDetails?.vendor || 'N/A'}
                            </Label>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell>{person}</TableCell>
                <TableCell>{From}</TableCell>
                <TableCell>{To}</TableCell>
                <TableCell>{Amount} AED</TableCell>
                <TableCell>
                    <Label
                        variant="soft"
                        color={status ? 'success' : 'warning'}
                    >
                        {status ? 'Paid' : 'Pending'}
                    </Label>
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
                            onEditRow();
                            handleClosePopover();
                        }}
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
                    >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Delete
                    </MenuItem>
                </MenuList>
            </Popover>
        </>
    );
}
