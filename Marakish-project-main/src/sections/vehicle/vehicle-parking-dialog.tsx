import type { Vehicle } from 'src/types/vehicle';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { doc, query, where, getDocs, updateDoc, collection } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { addNotification } from 'src/utils/notifications';
import { sendGoogleChatNotification } from 'src/utils/google-chat';

import { db } from 'src/firebase';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type OptionType = {
  id: string;
  label: string;
  [key: string]: any;
};

type VehicleParkingDialogProps = {
  open: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onUpdate?: () => void;
};

export function VehicleParkingDialog({
  open,
  onClose,
  vehicle,
  onUpdate,
}: VehicleParkingDialogProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });
  const [parkingList, setParkingList] = useState<OptionType[]>([]);
  const [newLocation, setNewLocation] = useState<string>('');

  useEffect(() => {
    if (open && vehicle) {
      fetchParkingLocations();
      setNewLocation(vehicle.parkingLocation || '');
    }
  }, [open, vehicle]);

  const fetchParkingLocations = async () => {
    try {
      const parkingQ = query(collection(db, 'parkingList'), where('status', '==', true));
      const parkingSnapshot = await getDocs(parkingQ);
      setParkingList(
        parkingSnapshot.docs.map((d) => ({
          id: d.id,
          label: d.data().parkingLocation,
        }))
      );
    } catch (error) {
      console.error('Error fetching parking locations:', error);
    }
  };

  const handleSubmit = async () => {
    if (!vehicle || !newLocation) {
      setSnackbar({ open: true, message: t('vehicles.parking.messages.selectLocation'), severity: 'warning' });
      return;
    }

    if (newLocation === vehicle.parkingLocation) {
      onClose();
      return;
    }

    setLoading(true);

    try {
      const vehicleRef = doc(db, 'vehicles', vehicle.id);
      await updateDoc(vehicleRef, {
        parkingLocation: newLocation,
      });

      // Send Google Chat Notification
      try {
        await sendGoogleChatNotification({
          header: {
            title: '📍 Vehicle Parking Moved',
            subtitle: 'Marakish Group',
          },
          sections: [
            {
              widgets: [
                {
                  keyValue: {
                    topLabel: 'Serial Number',
                    content: vehicle.serialNumber,
                    icon: 'TICKET',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'Vehicle',
                    content: `${vehicle.manufacturer} ${vehicle.model}`,
                    icon: 'CAR',
                  },
                },
                {
                  keyValue: {
                    topLabel: 'From',
                    content: vehicle.parkingLocation || 'N/A',
                    icon: 'FLIGHT_TAKEOFF',
                  },
                },
                { keyValue: { topLabel: 'To', content: newLocation, icon: 'FLIGHT_LAND' } },
              ],
            },
          ],
        });
      } catch (chatError) {
        console.error('Google Chat notification failed (non-critical):', chatError);
      }

      // Send Internal Notification
      try {
        await addNotification({
          title: 'Parking Location Updated',
          description: `${vehicle.serialNumber} moved from ${vehicle.parkingLocation || 'N/A'} to ${newLocation}`,
          type: 'parking-move',
        });
      } catch (notifError) {
        console.error('Internal notification failed (non-critical):', notifError);
      }

      setSnackbar({ open: true, message: t('vehicles.parking.messages.updateSuccess'), severity: 'success' });
      if (onUpdate) onUpdate();
      onClose();
    } catch (e: any) {
      console.error('Move parking failed: ', e);
      setSnackbar({ open: true, message: `Failed: ${e.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {t('vehicles.parking.title')}
        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mt: 1, mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {t('vehicles.parking.labels.vehicle')}: {vehicle.serialNumber} - {vehicle.manufacturer} {vehicle.model}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {t('vehicles.parking.labels.currentLocation')}: <strong>{vehicle.parkingLocation || 'N/A'}</strong>
          </Typography>

          <Autocomplete
            options={parkingList}
            getOptionLabel={(o) => o.label}
            value={parkingList.find((p) => p.label === newLocation) || null}
            onChange={(e, v) => setNewLocation(v ? v.label : '')}
            renderInput={(params) => (
              <TextField {...params} label={`${t('vehicles.parking.labels.newLocation')} *`} required />
            )}
          />
        </Box>
      </DialogContent>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <MuiAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
        <Button onClick={onClose} variant="outlined">
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !newLocation || newLocation === vehicle.parkingLocation}
          color="primary"
        >
          {loading ? t('vehicles.parking.messages.moving') : t('vehicles.parking.buttons.updateLocation')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
