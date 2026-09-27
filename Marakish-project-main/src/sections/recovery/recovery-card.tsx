import dayjs from 'dayjs';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type RecoveryCardProps = {
    row: any;
    selected: boolean;
    onSelectRow: () => void;
    onEditRow: () => void;
    onDeleteRow: () => void;
};

export function RecoveryCard({ row, selected, onSelectRow, onEditRow, onDeleteRow }: RecoveryCardProps) {
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
            <Card sx={{ p: 2, mb: 1.5, position: 'relative' }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <Checkbox checked={selected} onChange={onSelectRow} sx={{ p: 0.5 }} />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            {RecoveryID}
                        </Typography>
                        <Typography variant="subtitle1">{person}</Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Label variant="soft" color={status ? 'success' : 'warning'}>
                            {status ? 'Paid' : 'Pending'}
                        </Label>
                        <IconButton onClick={handleOpenPopover}>
                            <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                    </Stack>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed', mb: 1.5 }} />

                <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 1fr)"
                    gap={1.5}
                    sx={{ mb: 1.5 }}
                >
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Date
                        </Typography>
                        <Typography variant="body2">{formattedDate}</Typography>
                    </Box>
                    <Box sx={{ gridColumn: 'span 2' }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Vehicle Details
                        </Typography>
                        <Stack spacing={0.5}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                {serialNumber}
                            </Typography>
                            <Typography variant="body2">
                                {row.vehicleDetails ? `${row.vehicleDetails.manufacturer} ${row.vehicleDetails.model} (${row.vehicleDetails.modelYear})` : '...'}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <Label variant="outlined" color="default" sx={{ fontSize: '10px', height: 20 }}>
                                    VIN: {row.vehicleDetails?.vinChassisNumber || 'N/A'}
                                </Label>
                                <Label variant="outlined" color="secondary" sx={{ fontSize: '10px', height: 20 }}>
                                    Vendor: {row.vehicleDetails?.vendor || 'N/A'}
                                </Label>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box sx={{ gridColumn: 'span 2' }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Route
                        </Typography>
                        <Typography variant="body2">
                            {From} <Iconify icon={"solar:arrow-right-linear" as any} width={14} sx={{ verticalAlign: 'middle', mx: 0.5 }} /> {To}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Amount
                        </Typography>
                        <Typography variant="subtitle1" color="primary.main">
                            {Amount} AED
                        </Typography>
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
                <MenuList disablePadding sx={{ p: 0.5, width: 140 }}>
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
