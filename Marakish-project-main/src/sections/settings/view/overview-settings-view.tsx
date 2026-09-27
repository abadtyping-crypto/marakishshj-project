import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
    doc,
    setDoc,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    collection,
    onSnapshot
} from 'firebase/firestore';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MuiAlert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { db } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { ImageCropperDialog } from 'src/components/image-cropper/image-cropper-dialog';

import { useAuth } from 'src/auth/auth-context';

import ColorsTab from './vehicle-colors-tab';

// ----------------------------------------------------------------------

export function OverviewSettingsView() {
    const { role } = useAuth();
    const [currentTab, setCurrentTab] = useState(0);

    const isOwner = role?.toLowerCase() === 'owner';

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const { t } = useTranslation();

    return (
        <DashboardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h4">{t('settings.title')}</Typography>
            </Stack>

            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                    mb: 3,
                    '& .MuiTabs-indicator': { bgcolor: 'primary.main' },
                    '& .MuiTab-root.Mui-selected': { color: 'primary.main' },
                }}
            >
                <Tab label={t('settings.tabs.portals')} icon={<Iconify icon={"solar:bank-bold" as any} />} iconPosition="start" sx={{ gap: 1 }} />
                <Tab label={t('settings.tabs.parking')} icon={<Iconify icon={"solar:parking-bold" as any} />} iconPosition="start" sx={{ gap: 1 }} />
                <Tab label={t('settings.tabs.vendors')} icon={<Iconify icon={"solar:shop-bold" as any} />} iconPosition="start" sx={{ gap: 1 }} />
                <Tab label={t('settings.tabs.clients')} icon={<Iconify icon={"solar:user-speak-bold" as any} />} iconPosition="start" sx={{ gap: 1 }} />
                <Tab label={t('settings.tabs.manufModels')} icon={<Iconify icon={"solar:car-bold" as any} />} iconPosition="start" sx={{ gap: 1 }} />
                <Tab label={t('settings.tabs.recovery')} icon={<Iconify icon={"solar:delivery-bold" as any} />} iconPosition="start" sx={{ gap: 1 }} />
                {isOwner && <Tab label={t('settings.tabs.users')} icon={<Iconify icon={"solar:users-group-rounded-bold" as any} />} iconPosition="start" sx={{ gap: 1 }} />}
                <Tab label="Colors" icon={<Iconify icon={"solar:palette-bold" as any} />} iconPosition="start" sx={{ gap: 1 }} />
            </Tabs>

            {currentTab === 0 && <PortalsTab />}
            {currentTab === 1 && <ParkingTab />}
            {currentTab === 2 && <VendorsTab />}
            {currentTab === 3 && <ClientsTab />}
            {currentTab === 4 && <ManufModelsTab />}
            {currentTab === 5 && <RecoveryTab />}
            {currentTab === 6 && isOwner && <UsersTab />}
            {currentTab === (isOwner ? 7 : 6) && <ColorsTab />}
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------

function RecoveryTab() {
    const { t } = useTranslation();
    return <GenericManagementTab title={t('settings.tabs.recovery')} collectionName="recoveryList" labelField="name" addLabel={t('common.add')} />;
}

// ----------------------------------------------------------------------

function PortalsTab() {
    const { t } = useTranslation();
    const [items, setItems] = useState<any[]>([]);
    
    // Add Dialog
    const [openAdd, setOpenAdd] = useState(false);
    const [newName, setNewName] = useState('');
    const [newBalance, setNewBalance] = useState('0');
    
    // Edit Dialog
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editBalance, setEditBalance] = useState('0');
    
    // Delete Confirmation
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    // Image Upload & Crop
    const [cropperOpen, setCropperOpen] = useState(false);
    const [cropperImageSrc, setCropperImageSrc] = useState<string>('');
    const [currentImageBlob, setCurrentImageBlob] = useState<Blob | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    
    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'bankPortal'), (snapshot) => {
            setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, []);

    const handleToggle = async (id: string, currentStatus: boolean | undefined) => {
        await updateDoc(doc(db, 'bankPortal', id), {
            status: !currentStatus,
            disabled: !!currentStatus
        });
    };

    const handleBalanceChange = async (id: string, val: string) => {
        const num = Number(val);
        if (!isNaN(num)) {
            await updateDoc(doc(db, 'bankPortal', id), { balance: num });
        }
    };

    const uploadLogo = async (id: string, blob: Blob) => {
        const storage = getStorage();
        const storageRef = ref(storage, `logos/bankPortal/${id}.webp`);
        await uploadBytes(storageRef, blob);
        return getDownloadURL(storageRef);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => setCropperImageSrc(reader.result?.toString() || ''));
            reader.readAsDataURL(file);
            setCropperOpen(true);
            e.target.value = ''; // reset
        }
    };

    const handleCropComplete = (blob: Blob) => {
        setCurrentImageBlob(blob);
        setPreviewUrl(URL.createObjectURL(blob));
        setCropperOpen(false);
    };

    const openEditDialog = (item: any) => {
        setEditId(item.id);
        setEditName(item.bankPortalName);
        setEditBalance(String(item.balance || 0));
        setPreviewUrl(item.logoUrl || '');
        setCurrentImageBlob(null);
        setOpenEdit(true);
    };

    const handleAdd = async () => {
        if (!newName.trim()) return;
        setSubmitting(true);
        try {
            const docRef = await addDoc(collection(db, 'bankPortal'), {
                bankPortalName: newName.trim(),
                balance: Number(newBalance) || 0,
                status: true,
                disabled: false,
                createdAt: new Date(),
            });

            if (currentImageBlob) {
                const url = await uploadLogo(docRef.id, currentImageBlob);
                await updateDoc(docRef, { logoUrl: url });
            }

            setNewName('');
            setNewBalance('0');
            setPreviewUrl('');
            setCurrentImageBlob(null);
            setOpenAdd(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = async () => {
        if (!editName.trim()) return;
        setSubmitting(true);
        try {
            const docRef = doc(db, 'bankPortal', editId);
            const updates: any = {
                bankPortalName: editName.trim(),
                balance: Number(editBalance) || 0,
            };

            if (currentImageBlob) {
                const url = await uploadLogo(editId, currentImageBlob);
                updates.logoUrl = url;
            }

            await updateDoc(docRef, updates);
            setPreviewUrl('');
            setCurrentImageBlob(null);
            setOpenEdit(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'bankPortal', deleteId));
            setOpenDelete(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        }
    };

    return (
        <Card sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6">{t('settings.portals.title')}</Typography>
                <Button variant="contained" onClick={() => {
                    setNewName(''); setNewBalance('0'); setPreviewUrl(''); setCurrentImageBlob(null); setOpenAdd(true);
                }} startIcon={<Iconify icon="mingcute:add-line" />} sx={{ gap: 1, px: 2 }}>
                    {t('settings.portals.addNew')}
                </Button>
            </Stack>

            <Stack spacing={2}>
                {items.map((item) => (
                    <Stack
                        key={item.id}
                        spacing={1.5}
                        sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, opacity: item.status === false ? 0.6 : 1 }}
                    >
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
                                <Avatar variant="rounded" src={item.logoUrl} alt={item.bankPortalName} sx={{ width: 40, height: 40, bgcolor: 'common.white', '& img': { objectFit: 'contain' } }} />
                                <Typography variant="subtitle2">{item.bankPortalName}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Switch checked={item.status !== false} onChange={() => handleToggle(item.id, item.status)} sx={{ mx: 0.5 }} />
                                <IconButton onClick={() => openEditDialog(item)} color="primary" size="small">
                                    <Iconify icon="solar:pen-bold" />
                                </IconButton>
                                <IconButton onClick={() => { setDeleteId(item.id); setOpenDelete(true); }} color="error" size="small">
                                    <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Box>
                            <TextField
                                size="small"
                                type="number"
                                label={t('settings.portals.balance')}
                                value={item.balance || 0}
                                onChange={(e) => handleBalanceChange(item.id, e.target.value)}
                                InputProps={{ startAdornment: <InputAdornment position="start">AED</InputAdornment> }}
                                sx={{ width: 150 }}
                            />
                        </Box>
                    </Stack>
                ))}
            </Stack>

            {/* Add Dialog */}
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="xs">
                <DialogTitle>{t('settings.portals.addNew')}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar variant="rounded" src={previewUrl} sx={{ width: 64, height: 64, bgcolor: 'common.white', '& img': { objectFit: 'contain' } }} />
                            <Button variant="outlined" component="label">
                                Upload Logo
                                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                            </Button>
                        </Stack>
                        <TextField label={t('settings.portals.portalName')} fullWidth value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <TextField label={t('settings.portals.initialBalance')} type="number" fullWidth value={newBalance} onChange={(e) => setNewBalance(e.target.value)} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAdd(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleAdd} variant="contained" disabled={submitting}>{t('common.add')}</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="xs">
                <DialogTitle>Edit Portal</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar variant="rounded" src={previewUrl} sx={{ width: 64, height: 64, bgcolor: 'common.white', '& img': { objectFit: 'contain' } }} />
                            <Button variant="outlined" component="label">
                                Update Logo
                                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                            </Button>
                        </Stack>
                        <TextField label={t('settings.portals.portalName')} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} />
                        <TextField label={t('settings.portals.initialBalance')} type="number" fullWidth value={editBalance} onChange={(e) => setEditBalance(e.target.value)} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleEdit} variant="contained" disabled={submitting}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this portal? This action cannot be undone.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            <ImageCropperDialog
                open={cropperOpen}
                imageSrc={cropperImageSrc}
                onClose={() => setCropperOpen(false)}
                onCropComplete={handleCropComplete}
            />

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
        </Card>
    );
}


// ----------------------------------------------------------------------

function ParkingTab() {
    const { t } = useTranslation();
    return <GenericManagementTab title={t('settings.parking.title')} collectionName="parkingList" labelField="parkingLocation" addLabel={t('settings.parking.add')} />;
}

function VendorsTab() {
    const { t } = useTranslation();
    return <GenericManagementTab title={t('settings.vendors.title')} collectionName="vendorsList" labelField="name" addLabel={t('settings.vendors.add')} />;
}

function ClientsTab() {
    const { t } = useTranslation();
    return <GenericManagementTab title={t('settings.clients.title')} collectionName="clientsList" labelField="name" addLabel={t('settings.clients.add')} />;
}

// ----------------------------------------------------------------------

function GenericManagementTab({ title, collectionName, labelField, addLabel }: any) {
    const { t } = useTranslation();
    const [items, setItems] = useState<any[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });
    
    const allowImageUpload = collectionName === 'vendorsList';

    // Add
    const [openAdd, setOpenAdd] = useState(false);
    const [newValue, setNewValue] = useState('');

    // Edit
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState('');
    const [editValue, setEditValue] = useState('');

    // Delete
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    // Image Upload & Crop
    const [cropperOpen, setCropperOpen] = useState(false);
    const [cropperImageSrc, setCropperImageSrc] = useState<string>('');
    const [currentImageBlob, setCurrentImageBlob] = useState<Blob | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        const unsub = onSnapshot(collection(db, collectionName), (snapshot) => {
            setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, [collectionName]);

    const handleToggle = async (id: string, currentStatus: boolean | undefined) => {
        await updateDoc(doc(db, collectionName, id), { status: !currentStatus });
    };

    const uploadLogo = async (id: string, blob: Blob) => {
        const storage = getStorage();
        const storageRef = ref(storage, `logos/${collectionName}/${id}.webp`);
        await uploadBytes(storageRef, blob);
        return getDownloadURL(storageRef);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => setCropperImageSrc(reader.result?.toString() || ''));
            reader.readAsDataURL(file);
            setCropperOpen(true);
            e.target.value = ''; // reset
        }
    };

    const handleCropComplete = (blob: Blob) => {
        setCurrentImageBlob(blob);
        setPreviewUrl(URL.createObjectURL(blob));
        setCropperOpen(false);
    };

    const handleAdd = async () => {
        const trimmed = newValue.trim();
        if (!trimmed) return;
        setSubmitting(true);
        try {
            const data: any = {
                [labelField]: trimmed,
                status: true,
                createdAt: new Date()
            };

            if (allowImageUpload && currentImageBlob) {
                const url = await uploadLogo(trimmed, currentImageBlob);
                data.logoUrl = url;
            }

            await setDoc(doc(db, collectionName, trimmed), data);
            
            setNewValue('');
            setPreviewUrl('');
            setCurrentImageBlob(null);
            setOpenAdd(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const openEditDialog = (item: any) => {
        setEditId(item.id);
        setEditValue(item[labelField] || item.id);
        setPreviewUrl(item.logoUrl || '');
        setCurrentImageBlob(null);
        setOpenEdit(true);
    };

    const handleEdit = async () => {
        const trimmed = editValue.trim();
        if (!trimmed) return;
        setSubmitting(true);
        try {
            const oldDocRef = doc(db, collectionName, editId);
            
            // If ID changed, we must recreate the document
            if (editId !== trimmed) {
                const oldItem = items.find(i => i.id === editId);
                const newData = { ...oldItem, [labelField]: trimmed };
                delete newData.id; // remove id from fields

                if (allowImageUpload && currentImageBlob) {
                    newData.logoUrl = await uploadLogo(trimmed, currentImageBlob);
                }

                await setDoc(doc(db, collectionName, trimmed), newData);
                await deleteDoc(oldDocRef);
            } else {
                const updates: any = { [labelField]: trimmed };
                if (allowImageUpload && currentImageBlob) {
                    updates.logoUrl = await uploadLogo(trimmed, currentImageBlob);
                }
                await updateDoc(oldDocRef, updates);
            }

            setPreviewUrl('');
            setCurrentImageBlob(null);
            setOpenEdit(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, collectionName, deleteId));
            setOpenDelete(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        }
    };

    return (
        <Card sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6">{title}</Typography>
                <Button variant="contained" onClick={() => {
                    setNewValue(''); setPreviewUrl(''); setCurrentImageBlob(null); setOpenAdd(true);
                }} startIcon={<Iconify icon="mingcute:add-line" />} sx={{ gap: 1, px: 2 }}>
                    {addLabel}
                </Button>
            </Stack>

            <Stack spacing={2}>
                {items.map((item) => (
                    <Stack
                        key={item.id}
                        spacing={1.5}
                        sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, opacity: item.status === false ? 0.6 : 1 }}
                    >
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
                                {allowImageUpload && (
                                    <Avatar variant="rounded" src={item.logoUrl} alt={item[labelField]} sx={{ width: 40, height: 40, bgcolor: 'common.white', '& img': { objectFit: 'contain' } }} />
                                )}
                                <Typography variant="subtitle2">{item[labelField] || item.id}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Switch checked={item.status !== false} onChange={() => handleToggle(item.id, item.status)} sx={{ mx: 0.5 }} />
                                <IconButton onClick={() => openEditDialog(item)} color="primary" size="small">
                                    <Iconify icon="solar:pen-bold" />
                                </IconButton>
                                <IconButton onClick={() => { setDeleteId(item.id); setOpenDelete(true); }} color="error" size="small">
                                    <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Stack>
                ))}
            </Stack>

            {/* Add Dialog */}
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="xs">
                <DialogTitle>{addLabel}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        {allowImageUpload && (
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar variant="rounded" src={previewUrl} sx={{ width: 64, height: 64, bgcolor: 'common.white', '& img': { objectFit: 'contain' } }} />
                                <Button variant="outlined" component="label">
                                    Upload Logo
                                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                                </Button>
                            </Stack>
                        )}
                        <TextField label={t('common.name')} fullWidth value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAdd(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleAdd} variant="contained" disabled={submitting}>{t('common.add')}</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="xs">
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        {allowImageUpload && (
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar variant="rounded" src={previewUrl} sx={{ width: 64, height: 64, bgcolor: 'common.white', '& img': { objectFit: 'contain' } }} />
                                <Button variant="outlined" component="label">
                                    Update Logo
                                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                                </Button>
                            </Stack>
                        )}
                        <TextField label={t('common.name')} fullWidth value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleEdit} variant="contained" disabled={submitting}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this item? This action cannot be undone.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            <ImageCropperDialog
                open={cropperOpen}
                imageSrc={cropperImageSrc}
                onClose={() => setCropperOpen(false)}
                onCropComplete={handleCropComplete}
            />

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
        </Card>
    );
}

// ----------------------------------------------------------------------

function ManufModelsTab() {
    const { t } = useTranslation();
    const [manufacturers, setManufacturers] = useState<any[]>([]);
    const [selectedManuf, setSelectedManuf] = useState<string>('');
    const [models, setModels] = useState<any[]>([]);
    const [openManuf, setOpenManuf] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [newName, setNewName] = useState('');
    const [newColor, setNewColor] = useState('#FFFFFF');

    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

    // Edit/Delete Manuf
    const [openEditManuf, setOpenEditManuf] = useState(false);
    const [editManufId, setEditManufId] = useState('');
    const [editManufName, setEditManufName] = useState('');
    const [editManufColor, setEditManufColor] = useState('#FFFFFF');
    const [openDeleteManuf, setOpenDeleteManuf] = useState(false);
    const [deleteManufId, setDeleteManufId] = useState('');

    // Edit/Delete Model
    const [openEditModel, setOpenEditModel] = useState(false);
    const [editModelId, setEditModelId] = useState('');
    const [editModelName, setEditModelName] = useState('');
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [deleteModelId, setDeleteModelId] = useState('');

    // Image Upload & Crop (for Manuf)
    const [cropperOpen, setCropperOpen] = useState(false);
    const [cropperImageSrc, setCropperImageSrc] = useState<string>('');
    const [currentImageBlob, setCurrentImageBlob] = useState<Blob | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'manufacturers'), (snapshot) => {
            setManufacturers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        if (!selectedManuf) {
            setModels([]);
            return undefined;
        }

        const unsub = onSnapshot(collection(db, 'manufacturers', selectedManuf, 'models'), (snapshot) => {
            setModels(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        return () => unsub();
    }, [selectedManuf]);

    const uploadLogo = async (id: string, blob: Blob) => {
        const storage = getStorage();
        const storageRef = ref(storage, `logos/manufacturers/${id}.webp`);
        await uploadBytes(storageRef, blob);
        return getDownloadURL(storageRef);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => setCropperImageSrc(reader.result?.toString() || ''));
            reader.readAsDataURL(file);
            setCropperOpen(true);
            e.target.value = ''; // reset
        }
    };

    const handleCropComplete = (blob: Blob) => {
        setCurrentImageBlob(blob);
        setPreviewUrl(URL.createObjectURL(blob));
        setCropperOpen(false);
    };

    const handleAddManuf = async () => {
        const trimmed = newName.trim();
        if (!trimmed) return;
        setSubmitting(true);
        try {
            const data: any = { manufacturers: trimmed, color: newColor };
            if (currentImageBlob) {
                data.logoUrl = await uploadLogo(trimmed, currentImageBlob);
            }
            await setDoc(doc(db, 'manufacturers', trimmed), data);
            setNewName('');
            setNewColor('#FFFFFF');
            setPreviewUrl('');
            setCurrentImageBlob(null);
            setOpenManuf(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditManuf = async () => {
        const trimmed = editManufName.trim();
        if (!trimmed) return;
        setSubmitting(true);
        try {
            const oldDocRef = doc(db, 'manufacturers', editManufId);
            
            if (editManufId !== trimmed) {
                const oldItem = manufacturers.find(i => i.id === editManufId);
                const newData = { ...oldItem, manufacturers: trimmed, color: editManufColor };
                delete newData.id;
                
                if (currentImageBlob) {
                    newData.logoUrl = await uploadLogo(trimmed, currentImageBlob);
                }

                await setDoc(doc(db, 'manufacturers', trimmed), newData);
                // Also need to move models if we want to be safe, but since models are subcollections:
                // Moving a document doesn't move its subcollections. We must move them manually!
                const modelsSnap = await getDocs(collection(db, 'manufacturers', editManufId, 'models'));
                for (const m of modelsSnap.docs) {
                    await setDoc(doc(db, 'manufacturers', trimmed, 'models', m.id), {
                        ...m.data(),
                        manufacturers: trimmed
                    });
                    await deleteDoc(m.ref);
                }
                
                await deleteDoc(oldDocRef);
                if (selectedManuf === editManufId) setSelectedManuf(trimmed);
            } else {
                const updates: any = { manufacturers: trimmed, color: editManufColor };
                if (currentImageBlob) {
                    updates.logoUrl = await uploadLogo(trimmed, currentImageBlob);
                }
                await updateDoc(oldDocRef, updates);
            }

            setPreviewUrl('');
            setCurrentImageBlob(null);
            setOpenEditManuf(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteManuf = async () => {
        try {
            // Delete subcollections first
            const modelsSnap = await getDocs(collection(db, 'manufacturers', deleteManufId, 'models'));
            for (const m of modelsSnap.docs) {
                await deleteDoc(m.ref);
            }
            await deleteDoc(doc(db, 'manufacturers', deleteManufId));
            if (selectedManuf === deleteManufId) setSelectedManuf('');
            setOpenDeleteManuf(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        }
    };

    // Models
    const handleAddModel = async () => {
        const trimmed = newName.trim();
        if (!trimmed || !selectedManuf) return;
        setSubmitting(true);
        try {
            await setDoc(doc(db, 'manufacturers', selectedManuf, 'models', trimmed), {
                model: trimmed,
                manufacturers: selectedManuf
            });
            setNewName('');
            setOpenModel(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditModel = async () => {
        const trimmed = editModelName.trim();
        if (!trimmed || !selectedManuf) return;
        setSubmitting(true);
        try {
            const oldDocRef = doc(db, 'manufacturers', selectedManuf, 'models', editModelId);
            if (editModelId !== trimmed) {
                const oldItem = models.find(i => i.id === editModelId);
                const newData = { ...oldItem, model: trimmed };
                delete newData.id;
                
                await setDoc(doc(db, 'manufacturers', selectedManuf, 'models', trimmed), newData);
                await deleteDoc(oldDocRef);
            } else {
                await updateDoc(oldDocRef, { model: trimmed });
            }
            setOpenEditModel(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteModel = async () => {
        try {
            await deleteDoc(doc(db, 'manufacturers', selectedManuf, 'models', deleteModelId));
            setOpenDeleteModel(false);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
                <Card sx={{ p: 3 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                        <Typography variant="h6">{t('settings.manufacturers.title')}</Typography>
                        <Button variant="outlined" size="small" onClick={() => { setNewName(''); setNewColor('#FFFFFF'); setPreviewUrl(''); setCurrentImageBlob(null); setOpenManuf(true); }} startIcon={<Iconify icon="mingcute:add-line" />} sx={{ gap: 1 }}>
                            {t('common.add')}
                        </Button>
                    </Stack>
                    <Stack spacing={1} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                        {manufacturers.map((m) => (
                            <Stack key={m.id} direction="row" alignItems="center" spacing={1}>
                                <Button
                                    fullWidth
                                    variant={selectedManuf === m.id ? 'contained' : 'outlined'}
                                    onClick={() => setSelectedManuf(m.id)}
                                    sx={{ justifyContent: 'flex-start', py: 1.5 }}
                                    startIcon={<Avatar variant="rounded" src={m.logoUrl} sx={{ width: 24, height: 24, bgcolor: 'common.white', '& img': { objectFit: 'contain' } }} />}
                                >
                                    {m.manufacturers || m.id}
                                </Button>
                                <IconButton size="small" onClick={() => {
                                    setEditManufId(m.id);
                                    setEditManufName(m.manufacturers || m.id);
                                    setEditManufColor(m.color || '#FFFFFF');
                                    setPreviewUrl(m.logoUrl || '');
                                    setCurrentImageBlob(null);
                                    setOpenEditManuf(true);
                                }} color="primary">
                                    <Iconify icon="solar:pen-bold" />
                                </IconButton>
                                <IconButton size="small" onClick={() => { setDeleteManufId(m.id); setOpenDeleteManuf(true); }} color="error">
                                    <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                            </Stack>
                        ))}
                    </Stack>
                </Card>
            </Grid>

            {selectedManuf && (
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card sx={{ p: 3 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                            <Typography variant="h6">{t('settings.manufacturers.modelsFor')} {selectedManuf}</Typography>
                            <Button variant="contained" size="small" onClick={() => { setNewName(''); setOpenModel(true); }} startIcon={<Iconify icon="mingcute:add-line" />} sx={{ gap: 1 }}>
                                {t('settings.manufacturers.addModel')}
                            </Button>
                        </Stack>
                        <Grid container spacing={1}>
                            {models.map((m) => (
                                <Grid key={m.id} size={{ xs: 12, sm: 6 }}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                                        <Typography variant="body2">{m.model}</Typography>
                                        <Stack direction="row">
                                            <IconButton size="small" onClick={() => { setEditModelId(m.id); setEditModelName(m.model || m.id); setOpenEditModel(true); }} color="primary">
                                                <Iconify icon="solar:pen-bold" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => { setDeleteModelId(m.id); setOpenDeleteModel(true); }} color="error">
                                                <Iconify icon="solar:trash-bin-trash-bold" />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Card>
                </Grid>
            )}

            {/* Manuf Dialogs */}
            <Dialog open={openManuf} onClose={() => setOpenManuf(false)} fullWidth maxWidth="xs">
                <DialogTitle>{t('settings.manufacturers.add')}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar variant="rounded" src={previewUrl} sx={{ width: 64, height: 64, bgcolor: 'common.white', '& img': { objectFit: 'contain' } }} />
                            <Button variant="outlined" component="label">
                                Upload Logo
                                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                            </Button>
                        </Stack>
                        <TextField label={t('common.name')} fullWidth value={newName} onChange={e => setNewName(e.target.value)} />
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="body2">Brand Color:</Typography>
                            <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} style={{ width: 40, height: 40, padding: 0, border: 'none', borderRadius: 4, cursor: 'pointer' }} />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenManuf(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleAddManuf} variant="contained" disabled={submitting}>{t('common.add')}</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditManuf} onClose={() => setOpenEditManuf(false)} fullWidth maxWidth="xs">
                <DialogTitle>Edit Manufacturer</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar variant="rounded" src={previewUrl} sx={{ width: 64, height: 64, bgcolor: 'common.white', '& img': { objectFit: 'contain' } }} />
                            <Button variant="outlined" component="label">
                                Update Logo
                                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                            </Button>
                        </Stack>
                        <TextField label={t('common.name')} fullWidth value={editManufName} onChange={e => setEditManufName(e.target.value)} />
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="body2">Brand Color:</Typography>
                            <input type="color" value={editManufColor} onChange={(e) => setEditManufColor(e.target.value)} style={{ width: 40, height: 40, padding: 0, border: 'none', borderRadius: 4, cursor: 'pointer' }} />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditManuf(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleEditManuf} variant="contained" disabled={submitting}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteManuf} onClose={() => setOpenDeleteManuf(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Delete this manufacturer and all its models?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteManuf(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleDeleteManuf} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Model Dialogs */}
            <Dialog open={openModel} onClose={() => setOpenModel(false)} fullWidth maxWidth="xs">
                <DialogTitle>{t('settings.manufacturers.addModel')} {selectedManuf}</DialogTitle>
                <DialogContent><TextField label={t('settings.manufacturers.modelName')} fullWidth sx={{ mt: 1 }} value={newName} onChange={e => setNewName(e.target.value)} /></DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModel(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleAddModel} variant="contained" disabled={submitting}>{t('common.add')}</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditModel} onClose={() => setOpenEditModel(false)} fullWidth maxWidth="xs">
                <DialogTitle>Edit Model</DialogTitle>
                <DialogContent><TextField label={t('settings.manufacturers.modelName')} fullWidth sx={{ mt: 1 }} value={editModelName} onChange={e => setEditModelName(e.target.value)} /></DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditModel(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleEditModel} variant="contained" disabled={submitting}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteModel} onClose={() => setOpenDeleteModel(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteModel(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleDeleteModel} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            <ImageCropperDialog
                open={cropperOpen}
                imageSrc={cropperImageSrc}
                onClose={() => setCropperOpen(false)}
                onCropComplete={handleCropComplete}
            />

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
        </Grid>
    );
}

// ----------------------------------------------------------------------

function UsersTab() {
    const { t } = useTranslation();
    const [users, setUsers] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

    // Delete State
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<{ id: string, name: string } | null>(null);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [role, setRole] = useState('Staff');

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
            setUsers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, []);

    const handleAddUser = async () => {
        if (!email || !displayName) return;
        setSubmitting(true);
        try {
            // 1. Initialize Secondary App (to avoid signing out current admin)
            const { initializeApp, deleteApp } = await import('firebase/app');
            const { getAuth, createUserWithEmailAndPassword, signOut } = await import('firebase/auth');
            const { firebaseConfig } = await import('src/firebase');

            const secondaryApp = initializeApp(firebaseConfig, 'SecondaryApp');
            const secondaryAuth = getAuth(secondaryApp);

            // 2. Create User in Auth
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            const { uid } = userCredential.user;

            // 3. Create User Profile in Firestore
            await setDoc(doc(db, 'users', uid), {
                email,
                displayName,
                role,
                status: 'active',
                createdAt: new Date(),
                photoURL: null
            });

            // 4. Cleanup
            await signOut(secondaryAuth);
            await deleteApp(secondaryApp);

            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
            setOpen(false);
            setEmail('');
            setPassword('');
            setDisplayName('');
        } catch (err: any) {
            console.error(err);
            setSnackbar({ open: true, message: `Error adding user: ${err.message}`, severity: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6">{t('settings.users.title')}</Typography>
                <Button variant="contained" onClick={() => setOpen(true)} startIcon={<Iconify icon={"solar:user-plus-bold" as any} />} sx={{ gap: 1, px: 2 }}>
                    {t('settings.users.newUser')}
                </Button>
            </Stack>

            <Stack spacing={2}>
                {users.map((u) => (
                    <Stack
                        key={u.id}
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        justifyContent="space-between"
                        spacing={2}
                        sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}
                    >
                        <Box sx={{ width: '100%', wordBreak: 'break-all' }}>
                            <Typography variant="subtitle2">{u.displayName}</Typography>
                            <Typography variant="caption" color="text.secondary">{u.email} • {u.role}</Typography>
                        </Box>
                        <Button variant="outlined" color="error" size="small" onClick={() => {
                            setUserToDelete({ id: u.id, name: u.displayName });
                            setDeleteDialogOpen(true);
                        }}>
                            {t('settings.users.remove')}
                        </Button>
                    </Stack>
                ))}
            </Stack>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>{t('settings.users.newUser')}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField label={t('settings.users.displayName')} fullWidth value={displayName} onChange={e => setDisplayName(e.target.value)} />
                        <TextField label={t('settings.users.email')} fullWidth value={email} onChange={e => setEmail(e.target.value)} />
                        <TextField label={t('settings.users.tempPassword')} type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
                        <FormControl fullWidth>
                            <InputLabel>{t('settings.users.role')}</InputLabel>
                            <Select value={role} label={t('settings.users.role')} onChange={e => setRole(e.target.value)}>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem value="Staff">Staff</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>{t('common.cancel')}</Button>
                    <Button onClick={handleAddUser} variant="contained" disabled={submitting}>{t('settings.users.addUser')}</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to remove user: {userToDelete?.name}?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>{t('common.cancel')}</Button>
                    <Button color="error" variant="contained" onClick={async () => {
                        if (userToDelete) {
                            try {
                                await deleteDoc(doc(db, 'users', userToDelete.id));
                                setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
                            } catch (err: any) {
                                setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
                            }
                        }
                        setDeleteDialogOpen(false);
                        setUserToDelete(null);
                    }}>Delete</Button>
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
        </Card>
    );
}

