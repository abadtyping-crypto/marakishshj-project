import type { Vehicle } from 'src/types/vehicle';

import dayjs from 'dayjs';
import { useState, useEffect, useCallback } from 'react';
import {
    doc,
    query,
    where,
    setDoc,
    getDocs,
    orderBy,
    Timestamp,
    collection,
    onSnapshot,
    runTransaction,
} from 'firebase/firestore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';

import { db } from 'src/firebase';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type RecoveryPerson = {
    id: string;
    name: string;
};

type RecoveryNewEditFormProps = {
    open: boolean;
    onClose: () => void;
    onUpdate?: () => void;
    recovery?: any;
};

export function RecoveryNewEditForm({ open, onClose, onUpdate, recovery }: RecoveryNewEditFormProps) {
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

    // Form State
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [recoveryPerson, setRecoveryPerson] = useState<string>('');
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [amount, setAmount] = useState('');

    // Data State
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [recoveryPersons, setRecoveryPersons] = useState<RecoveryPerson[]>([]);
    const [openAddPerson, setOpenAddPerson] = useState(false);
    const [newPersonName, setNewPersonName] = useState('');

    const fetchInitialData = useCallback(async () => {
        try {
            const vehicleQ = query(collection(db, 'vehicles'), orderBy('purchasingDate', 'desc'));
            const vehicleSnapshot = await getDocs(vehicleQ);
            const vehicleData = vehicleSnapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Vehicle[];
            setVehicles(vehicleData);

            if (recovery) {
                const found = vehicleData.find(v => v.serialNumber === recovery['Serial Number']);
                if (found) setSelectedVehicle(found);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [recovery]);

    useEffect(() => {
        if (open) {
            fetchInitialData();
            if (recovery) {
                // Edit Mode
                setDate(dayjs(recovery.Date?.seconds * 1000 || recovery.Date).format('YYYY-MM-DD'));
                setFromLocation(recovery.From || '');
                setToLocation(recovery.To || '');
                setAmount(String(recovery.Amount || ''));
                setRecoveryPerson(recovery['Recovery Person'] || '');
            } else {
                // Reset Form
                setDate(dayjs().format('YYYY-MM-DD'));
                setSelectedVehicle(null);
                setRecoveryPerson('');
                setFromLocation('');
                setToLocation('');
                setAmount('');
            }
        }
    }, [open, recovery, fetchInitialData]);

    useEffect(() => {
        const q = query(collection(db, 'recoveryList'), where('status', '==', true));
        const unsub = onSnapshot(q, (snapshot) => {
            setRecoveryPersons(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as RecoveryPerson));
        });
        return () => unsub();
    }, []);

    const handleAddPerson = async () => {
        if (!newPersonName.trim()) return;
        try {
            await setDoc(doc(db, 'recoveryList', newPersonName.trim()), {
                name: newPersonName.trim(),
                status: true,
            });
            setRecoveryPerson(newPersonName.trim());
            setNewPersonName('');
            setOpenAddPerson(false);
        } catch (error) {
            console.error('Error adding person:', error);
        }
    };

    const handleSubmit = async () => {
        if (!selectedVehicle || !recoveryPerson || !amount || !date || !fromLocation || !toLocation) {
            setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'warning' });
            return;
        }

        setLoading(true);

        try {
            await runTransaction(db, async (transaction) => {
                const countersRef = doc(db, 'setting', 'counter');
                const countersDoc = await transaction.get(countersRef);
                if (!countersDoc.exists()) throw new Error('Counters not found');
                const counters = countersDoc.data();

                const incrementId = (lastId: string | undefined, prefix: string) => {
                    const todayStr = dayjs().format('DDMMYYYY');
                    if (!lastId) return `${prefix}${todayStr}0001`;
                    const numberPart = lastId.substring(lastId.length - 4);
                    const newNumber = String(Number(numberPart) + 1).padStart(4, '0');
                    return `${prefix}${todayStr}${newNumber}`;
                };

                const recoveryId = recovery?.RecoveryID || incrementId(counters.lastRecovery, 'RC');
                const vexId = recovery?.VEXID || incrementId(counters.lastVehicleExpenses, 'VEX');
                const recoveryDateObj = Timestamp.fromDate(new Date(date));

                // 1. Save Recovery Record
                const recoveryRef = doc(db, 'recovery', recoveryId);
                transaction.set(recoveryRef, {
                    RecoveryID: recoveryId,
                    Date: recoveryDateObj,
                    'Serial Number': selectedVehicle.serialNumber,
                    'Recovery Person': recoveryPerson,
                    From: fromLocation,
                    To: toLocation,
                    Amount: Number(amount),
                    'Payment Status': recovery?.['Payment Status'] || false,
                    VEXID: vexId,
                });

                // 2. Integration with Vehicle Expenses (Automatically create/update entry)
                const vexRef = doc(db, 'vehicleExpenses', vexId);
                transaction.set(vexRef, {
                    transactionId: vexId,
                    amount: Number(amount),
                    category: 'Recovery Expenses ', // Note: space at end matches existing data pattern
                    date: recoveryDateObj,
                    serialNumber: selectedVehicle.serialNumber,
                    notes: `Recovery: ${fromLocation} to ${toLocation}`,
                    status: true,
                    bankPortalName: '', // Pending payment
                    recoveryId,
                });

                // 3. Update Counters if new
                if (!recovery) {
                    transaction.update(countersRef, {
                        lastRecovery: recoveryId,
                        lastVehicleExpenses: vexId,
                    });
                }
            });

            setSnackbar({ open: true, message: 'Recovery record saved successfully', severity: 'success' });
            if (onUpdate) onUpdate();
            onClose();
        } catch (error: any) {
            console.error('Save failed: ', error);
            setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const isSold = selectedVehicle?.soldStatus === 'Sold';

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="md"
                fullWidth
                fullScreen={isMobile}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {recovery ? 'Edit Recovery' : 'Add New Recovery'}
                    <IconButton onClick={onClose}>
                        <Iconify icon="mingcute:close-line" />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }}
                        gap={2}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            fullWidth
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                        />

                        <Box sx={{ position: 'relative' }}>
                            <Autocomplete
                                options={vehicles}
                                getOptionLabel={(o) =>
                                    `${o.serialNumber} - ${o.manufacturer} ${o.model} (${o.modelYear})`
                                }
                                value={selectedVehicle}
                                onChange={(e, v) => setSelectedVehicle(v)}
                                renderInput={(params) => <TextField {...params} label="Vehicle Serial" required />}
                            />
                            {isSold && (
                                <Typography
                                    variant="caption"
                                    color="error"
                                    sx={{ position: 'absolute', bottom: -18, left: 0 }}
                                >
                                    Warning: This is a Sold vehicle.
                                </Typography>
                            )}
                        </Box>

                        {selectedVehicle && (
                            <Box
                                sx={{
                                    gridColumn: 'span 2',
                                    p: 2,
                                    borderRadius: 1,
                                    bgcolor: 'background.neutral',
                                    border: '1px dashed',
                                    borderColor: 'divider',
                                }}
                            >
                                <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                    <InfoItem label="VIN" value={selectedVehicle.vinChassisNumber || 'N/A'} />
                                    <InfoItem label="Vendor" value={selectedVehicle.vendor || 'N/A'} />
                                    <InfoItem label="CRN" value={String(selectedVehicle.crn || 'N/A')} />
                                </Box>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Autocomplete
                                fullWidth
                                options={recoveryPersons.map((p: RecoveryPerson) => p.name)}
                                value={recoveryPerson}
                                onChange={(e, v) => setRecoveryPerson(v || '')}
                                renderInput={(params) => <TextField {...params} label="Recovery Vehicle/Person" required />}
                            />
                            <IconButton color="primary" onClick={() => setOpenAddPerson(true)}>
                                <Iconify icon="mingcute:add-line" />
                            </IconButton>
                        </Box>

                        <TextField
                            fullWidth
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />

                        <TextField
                            fullWidth
                            label="From"
                            value={fromLocation}
                            onChange={(e) => setFromLocation(e.target.value)}
                            required
                        />

                        <TextField
                            fullWidth
                            label="To"
                            value={toLocation}
                            onChange={(e) => setToLocation(e.target.value)}
                            required
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Recovery'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAddPerson} onClose={() => setOpenAddPerson(false)}>
                <DialogTitle>Add New Recovery Person</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="outlined"
                        value={newPersonName}
                        onChange={(e) => setNewPersonName(e.target.value)}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddPerson(false)}>Cancel</Button>
                    <Button onClick={handleAddPerson} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <MuiAlert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <Box>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );
}
