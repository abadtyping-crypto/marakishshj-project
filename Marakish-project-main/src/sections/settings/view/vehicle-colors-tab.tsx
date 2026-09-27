import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, updateDoc, collection, onSnapshot } from 'firebase/firestore';

import MuiAlert from '@mui/material/Alert';
import {
  Box,
  Card,
  Table,
  Stack,
  Button,
  Switch,
  Dialog,
  TableRow,
  Snackbar,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

import { db } from 'src/firebase';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

export default function ColorsTab() {
  const { t } = useTranslation();
  
  const [colors, setColors] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; row: any }>({ open: false, row: null });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });
  
  // Form State
  const [editId, setEditId] = useState<string | null>(null);
  const [colorName, setColorName] = useState('');
  const [colorHex, setColorHex] = useState('#FFFFFF');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'vehicleColors'), (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setColors(data);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenAdd = () => {
    setEditId(null);
    setColorName('');
    setColorHex('#FFFFFF');
    setStatus(true);
    setOpenDialog(true);
  };

  const handleOpenEdit = (row: any) => {
    setEditId(row.id);
    setColorName(row.title || '');
    setColorHex(row.codes || '#FFFFFF');
    setStatus(row.status ?? true);
    setOpenDialog(true);
  };

  const handleToggleStatus = async (row: any) => {
    try {
      await updateDoc(doc(db, 'vehicleColors', row.id), {
        status: !row.status,
      });
      setSnackbar({ open: true, message: 'Status updated successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating status', severity: 'error' });
    }
  };

  const handleSave = async () => {
    if (!colorName.trim() || !colorHex.trim()) {
      setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'warning' });
      return;
    }
    
    setSubmitting(true);
    try {
      const id = editId || colorName.trim().replace(/\s+/g, '_').toLowerCase();
      await setDoc(doc(db, 'vehicleColors', id), {
        title: colorName.trim(),
        codes: colorHex.trim(),
        status,
      });
      setSnackbar({ open: true, message: 'Saved successfully', severity: 'success' });
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Failed to save color', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.row) return;
    try {
      await deleteDoc(doc(db, 'vehicleColors', deleteConfirm.row.id));
      setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Failed to delete color', severity: 'error' });
    } finally {
      setDeleteConfirm({ open: false, row: null });
    }
  };

  return (
    <Card>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Vehicle Colors</Typography>
        <Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />} onClick={handleOpenAdd}>
          Add Color
        </Button>
      </Box>

      <TableContainer sx={{ position: 'relative', overflow: 'unset', display: { xs: 'none', sm: 'block' } }}>
        <Scrollbar>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Preview</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Hex Code</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {colors.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: row.codes || '#FFFFFF',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.codes}</TableCell>
                  <TableCell>
                    <Switch
                      checked={row.status ?? true}
                      onChange={() => handleToggleStatus(row)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenEdit(row)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                    <IconButton onClick={() => setDeleteConfirm({ open: true, row })} sx={{ color: 'error.main' }}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {colors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No colors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Stack spacing={2} sx={{ display: { xs: 'flex', sm: 'none' }, mt: 2, px: 2, pb: 2 }}>
        {colors.map((row) => (
          <Stack key={row.id} spacing={1.5} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: row.codes || '#FFFFFF',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
                <Box>
                  <Typography variant="subtitle2">{row.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{row.codes}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Switch checked={row.status ?? true} onChange={() => handleToggleStatus(row)} color="primary" sx={{ mx: 0.5 }} />
                <IconButton onClick={() => handleOpenEdit(row)} size="small">
                  <Iconify icon="solar:pen-bold" />
                </IconButton>
                <IconButton onClick={() => setDeleteConfirm({ open: true, row })} sx={{ color: 'error.main' }} size="small">
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        ))}
        {colors.length === 0 && (
          <Typography textAlign="center" color="text.secondary">No colors found.</Typography>
        )}
      </Stack>

      {/* Add / Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Color' : 'Add New Color'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Color Name"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: colorHex,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <input
                type="color"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                style={{
                  width: '40px',
                  height: '40px',
                  padding: 0,
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Select Color ({colorHex})
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2">Enabled / Active</Typography>
              <Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, row: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{deleteConfirm.row?.title}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm({ open: false, row: null })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <MuiAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Card>
  );
}
