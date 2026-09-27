import type { Vehicle } from 'src/types/vehicle';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
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
  runTransaction,
} from 'firebase/firestore';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Radio from '@mui/material/Radio';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import FormLabel from '@mui/material/FormLabel';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { addNotification } from 'src/utils/notifications';
import { formatCurrency, sendGoogleChatNotification } from 'src/utils/google-chat';
import {
  initGoogleDriveApi,
  signInToGoogleDrive,
  createVehicleFolders,
} from 'src/utils/google-drive';

import { db } from 'src/firebase';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type OptionType = {
  id: string;
  label: string;
  [key: string]: any;
};

type VehiclePurchaseDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
  vehicle?: Vehicle | null;
};

// Start year for model year dropdown
const START_YEAR = 2000;
const CURRENT_YEAR = new Date().getFullYear();
const NEXT_YEAR = CURRENT_YEAR + 1;
const YEARS = Array.from({ length: NEXT_YEAR - START_YEAR + 1 }, (_, i) => NEXT_YEAR - i);

export function VehiclePurchaseDialog({
  open,
  onClose,
  onUpdate,
  vehicle,
}: VehiclePurchaseDialogProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

  // Form State
  const [purchasingDate, setPurchasingDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [modelYear, setModelYear] = useState<number | ''>('');
  const [vendor, setVendor] = useState('');
  const [parkingLocation, setParkingLocation] = useState('Not Collected');
  const [purchasingPrice, setPurchasingPrice] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [crn, setCrn] = useState('');
  const [vin, setVin] = useState('');
  const [paymentSource, setPaymentSource] = useState('');
  const [color, setColor] = useState<any>(null);
  const [vehicleColors, setVehicleColors] = useState<any[]>([]);

  // Vendor Payment Tab State
  const [vendorPayments, setVendorPayments] = useState<any[]>([]);
  const [newVendorPaidAmount, setNewVendorPaidAmount] = useState('');
  const [newVendorPaymentSource, setNewVendorPaymentSource] = useState('');
  const [newVendorPaymentDate, setNewVendorPaymentDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [vendorBalance, setVendorBalance] = useState(0);

  // Tabs & Mubaya
  const [currentTab, setCurrentTab] = useState(0);
  const [mubayaStatus, setMubayaStatus] = useState('Not Requested');

  // Data Options State
  const [manufacturers, setManufacturers] = useState<OptionType[]>([]);
  const [models, setModels] = useState<OptionType[]>([]);
  const [vendors, setVendors] = useState<OptionType[]>([]);
  const [parkingList, setParkingList] = useState<OptionType[]>([]);
  const [bankPortals, setBankPortals] = useState<OptionType[]>([]);

  const fetchVendorPayments = useCallback(
    async (sn: string) => {
      try {
        const q = query(
          collection(db, 'vendorsPayment'),
          where('Serial_Number', '==', sn),
          orderBy('date', 'asc')
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setVendorPayments(list);

        const cost = vehicle?.vehiclePurchaseCost || 0;
        const totalPaid = list.reduce((sum, item: any) => sum + (item.paidAmount || 0), 0);
        setVendorBalance(cost - totalPaid);
      } catch (error) {
        console.error('Error fetching vendor payments:', error);
      }
    },
    [vehicle?.vehiclePurchaseCost]
  );

  // Fetch Initial Data & Edit Data
  useEffect(() => {
    if (open) {
      fetchInitialData();

      // Initialize Google Drive API
      initGoogleDriveApi().catch((error) => {
        console.error('Failed to initialize Google Drive API:', error);
      });

      if (vehicle) {
        // Edit Mode: Populate Fields
        setManufacturer(vehicle.manufacturer);
        // Manually fetch models for this manufacturer
        getDocs(collection(db, 'manufacturers', vehicle.manufacturer, 'models')).then((snap) =>
          setModels(snap.docs.map((d) => ({ id: d.id, label: d.data().model })))
        );

        setModel(vehicle.model);
        setModelYear(vehicle.modelYear);

        // Handle Date
        let pDate = dayjs();
        if (vehicle.purchasingDate) {
          if (vehicle.purchasingDate.seconds) {
            pDate = dayjs(vehicle.purchasingDate.seconds * 1000);
          } else {
            pDate = dayjs(vehicle.purchasingDate as string);
          }
        }
        setPurchasingDate(pDate.format('YYYY-MM-DD'));

        setVin(vehicle.vinChassisNumber);
        setCrn(String(vehicle.crn));
        setParkingLocation(vehicle.parkingLocation);
        setPurchasingPrice(String(vehicle.vehiclePurchaseCost));
        setMubayaStatus(vehicle.mubayaStatus || 'Not Requested');
        setColor(vehicle.color || null);

        // Vendor ID? The vehicle stores Vendor Name as 'vendor'.
        // I need to find the ID from the vendors list by name if possible, OR if it matches ID.
        // My `fetchInitialData` loads vendors.
        // If `vehicle.vendor` is "Toyota Vendor", and list has {id: 'ABC', label: 'Toyota Vendor'}, I need to set vendor to 'ABC'.
        // I'll do this matching inside the async logic or slightly delayed?
        // `vendors` state isn't available immediately here due to closure.
        // I will do it in `fetchInitialData` or a separate `initEdit` function.

        fillEditDetails(vehicle);
        fetchVendorPayments(vehicle.serialNumber);
      } else {
        // Create Mode: Reset
        setManufacturer('');
        setModel('');
        setModelYear('');
        setVendor('');
        setParkingLocation('Not Collected');
        setPurchasingPrice('');
        setPaidAmount('');
        setCrn('');
        setVin('');
        setPaymentSource('');
        setColor(null);
        setPurchasingDate(dayjs().format('YYYY-MM-DD'));
        setCurrentTab(0);
        setMubayaStatus('Not Requested');
        setVendorPayments([]);
        setNewVendorPaidAmount('');
        setNewVendorPaymentSource('');
      }
    }
  }, [open, vehicle, fetchVendorPayments]);

  const fillEditDetails = async (veh: Vehicle) => {
    try {
      // 1. Fetch Vendors Payment to get Paid Amount & Bank info
      const vpQ = query(
        collection(db, 'vendorsPayment'),
        where('Serial_Number', '==', veh.serialNumber)
      );
      const vpSnap = await getDocs(vpQ);
      if (!vpSnap.empty) {
        const vpData = vpSnap.docs[0].data();
        setPaidAmount(String(vpData.paidAmount));

        // Find Bank ID by Name
        // We need bankPortals loaded. We can query them again or use a lookup.
        // Let's query banks to be sure.
        const bQ = query(collection(db, 'bankPortal'), where('status', '==', true));
        const bSnap = await getDocs(bQ);
        const banks = bSnap.docs.map((d) => ({ id: d.id, label: d.data().bankPortalName }));
        const matchedBank = banks.find((b) => b.label === vpData.paidPortal);
        if (matchedBank) setPaymentSource(matchedBank.id);
      }

      // 2. Set Vendor ID from Label
      // We need vendors list.
      const vQ = query(collection(db, 'vendorsList'), where('status', '==', true));
      const vSnap = await getDocs(vQ);
      const vList = vSnap.docs.map((d) => ({ id: d.id, label: d.data().name }));
      // veh.vendor might be name or id.
      const matchedVendor = vList.find((v) => v.label === veh.vendor || v.id === veh.vendor);
      if (matchedVendor) setVendor(matchedVendor.id);
    } catch (e) {
      console.error('Error loading edit details', e);
    }
  };

  const fetchInitialData = async () => {
    try {
      // Manufacturers
      const manufSnapshot = await getDocs(collection(db, 'manufacturers'));
      setManufacturers(manufSnapshot.docs.map((d) => ({ id: d.id, label: d.id })));

      // Vendors
      const vendorQ = query(collection(db, 'vendorsList'), where('status', '==', true));
      const vendorSnapshot = await getDocs(vendorQ);
      setVendors(vendorSnapshot.docs.map((d) => ({ id: d.id, label: d.data().name })));

      // Parking
      const parkingQ = query(collection(db, 'parkingList'), where('status', '==', true));
      const parkingSnapshot = await getDocs(parkingQ);
      setParkingList(
        parkingSnapshot.docs.map((d) => ({ id: d.id, label: d.data().parkingLocation }))
      );

      // Bank Portals
      const bankQ = query(collection(db, 'bankPortal'), where('status', '==', true));
      const bankSnapshot = await getDocs(bankQ);
      setBankPortals(
        bankSnapshot.docs.map((d) => ({
          id: d.id,
          label: d.data().bankPortalName,
          balance: d.data().balance, // Store balance for UI
        }))
      );

      // Vehicle Colors
      const colorQ = query(collection(db, 'vehicleColors'), where('status', '==', true));
      const colorSnapshot = await getDocs(colorQ);
      setVehicleColors(
        colorSnapshot.docs.map((d) => ({
          id: d.id,
          name: d.data().title,
          codes: d.data().codes,
        }))
      );
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  // Fetch Models when manufacturer changes
  const handleManufacturerChange = async (manufacturerId: string) => {
    setManufacturer(manufacturerId);
    setModel(''); // Reset model

    if (manufacturerId) {
      try {
        const modelsSnapshot = await getDocs(
          collection(db, 'manufacturers', manufacturerId, 'models')
        );
        setModels(modelsSnapshot.docs.map((d) => ({ id: d.id, label: d.data().model })));
        
        // Auto-focus model input for mobile efficiency
        setTimeout(() => {
          document.getElementById('vehicle-model-input')?.focus();
        }, 100);
      } catch (error) {
        console.error('Error fetching models:', error);
        setModels([]);
      }
    } else {
      setModels([]);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPurchasingPrice(val);
    setPaidAmount(val); // Auto populate paid amount
  };

  // Add New Item State
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogType, setAddDialogType] = useState<
    'manufacturer' | 'model' | 'vendor' | 'parking'
  >('manufacturer');
  const [newItemValue, setNewItemValue] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  const handleOpenAddDialog = (type: 'manufacturer' | 'model' | 'vendor' | 'parking') => {
    if (type === 'model' && !manufacturer) {
      setSnackbar({ open: true, message: t('vehicles.purchase.messages.selectManufacturerFirst'), severity: 'warning' });
      return;
    }
    setAddDialogType(type);
    setNewItemValue('');
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setNewItemValue('');
  };

  const handleSaveNewItem = async () => {
    if (!newItemValue.trim()) return;
    setAddLoading(true);

    try {
      const val = newItemValue.trim();
      const valLower = val.toLowerCase();

      // Duplicate Check
      if (addDialogType === 'manufacturer') {
        if (manufacturers.some((m) => m.id.toLowerCase() === valLower)) {
          setSnackbar({ open: true, message: 'This Manufacturer already exists.', severity: 'error' });
          setAddLoading(false);
          return;
        }
        await setDoc(doc(db, 'manufacturers', val), {
          manufacturers: val, // The existing structure seems to just use ID, but let's be safe
        });
        setManufacturers((prev) => [...prev, { id: val, label: val }]);
        setManufacturer(val);
        // Models need to depend on this, but it's empty for new manufacturer
        setModels([]);
      } else if (addDialogType === 'model') {
        if (models.some((m) => m.label.toLowerCase() === valLower)) {
          setSnackbar({ open: true, message: 'This Model already exists for the selected Manufacturer.', severity: 'error' });
          setAddLoading(false);
          return;
        }
        await setDoc(doc(db, 'manufacturers', manufacturer, 'models', val), {
          model: val,
          manufacturers: manufacturer, // redundancy as per your existing data structure comment
        });
        setModels((prev) => [...prev, { id: val, label: val }]);
        setModel(val);
      } else if (addDialogType === 'vendor') {
        // Check against label (name) or id? Using label as it's the visible name.
        if (vendors.some((v) => v.label.toLowerCase() === valLower)) {
          setSnackbar({ open: true, message: 'This Vendor already exists.', severity: 'error' });
          setAddLoading(false);
          return;
        }
        await setDoc(doc(db, 'vendorsList', val), {
          name: val,
          status: true,
        });
        setVendors((prev) => [...prev, { id: val, label: val }]);
        setVendor(val);
      } else if (addDialogType === 'parking') {
        if (parkingList.some((p) => p.label.toLowerCase() === valLower)) {
          setSnackbar({ open: true, message: 'This Parking Location already exists.', severity: 'error' });
          setAddLoading(false);
          return;
        }
        await setDoc(doc(db, 'parkingList', val), {
          parkingLocation: val,
          status: true,
        });
        setParkingList((prev) => [...prev, { id: val, label: val }]);
        setParkingLocation(val);
      }
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding new item:', error);
      setSnackbar({ open: true, message: 'Failed to add new item.', severity: 'error' });
    } finally {
      setAddLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (currentTab === 2) {
      if (!newVendorPaidAmount || !newVendorPaymentSource || !newVendorPaymentDate) {
        setSnackbar({ open: true, message: t('vehicles.purchase.messages.fillPaymentRequired'), severity: 'warning' });
        return;
      }
      if (!vehicle) return;

      setLoading(true);
      try {
        await runTransaction(db, async (transaction) => {
          const countersRef = doc(db, 'setting', 'counter');
          const countersDoc = await transaction.get(countersRef);
          if (!countersDoc.exists()) throw new Error('Counters missing');
          const counters = countersDoc.data();

          const incrementId = (lastId: string | undefined) => {
            if (!lastId) return '000001';
            const prefix = lastId.match(/^[A-Z]+/)?.[0] || '';
            const numberPart = lastId.match(/\d+$/)?.[0] || '0';
            const newNumber = String(Number(numberPart) + 1).padStart(4, '0');
            return prefix + newNumber;
          };

          const newVendorPaymentId = incrementId(counters.lastVendorsPayment);
          const newBankTxId = incrementId(counters.lastBankTransaction);
          const payDateObj = Timestamp.fromDate(new Date(newVendorPaymentDate));
          const numericPaid = Number(newVendorPaidAmount);
          const bankLabel =
            bankPortals.find((b) => b.id === newVendorPaymentSource)?.label || 'Unknown';

          const vpRef = doc(db, 'vendorsPayment', newVendorPaymentId);
          transaction.set(vpRef, {
            Serial_Number: vehicle.serialNumber,
            balance: vendorBalance - numericPaid,
            date: payDateObj,
            paidAmount: numericPaid,
            paidPortal: bankLabel,
            status: true,
            vehiclePurchaseId: vehicle.vehiclePurchaseCost,
            vendorName: vehicle.vendor,
            transactionId: newVendorPaymentId,
          });

          const bankRef = doc(db, 'bankPortal', newVendorPaymentSource);
          const freshBank = await transaction.get(bankRef);
          const bankBal = freshBank.data()?.balance || 0;
          transaction.update(bankRef, { balance: bankBal - numericPaid });

          const btRef = doc(db, 'bankTransaction', newBankTxId);
          transaction.set(btRef, {
            transactionId: newBankTxId,
            amount: numericPaid,
            bankPortalName: bankLabel,
            date: payDateObj,
            description: `Vendor Payment: ${vehicle.serialNumber} - ${vehicle.vendor}`,
            status: true,
            type: 'Debit',
          });

          transaction.update(countersRef, {
            lastVendorsPayment: newVendorPaymentId,
            lastBankTransaction: newBankTxId,
          });
        });
        setSnackbar({ open: true, message: t('vehicles.purchase.messages.paymentRecorded'), severity: 'success' });
        addNotification({
          title: 'Vendor Payment Recorded',
          description: `Paid ${formatCurrency(Number(newVendorPaidAmount))} to ${vehicle.vendor} for SN: ${vehicle.serialNumber}`,
          type: 'vehicle-expense',
        });
        fetchVendorPayments(vehicle.serialNumber);
        setNewVendorPaidAmount('');
        setNewVendorPaymentSource('');
      } catch (error: any) {
        setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!manufacturer || !model || !modelYear || !vendor || !purchasingPrice) {
      setSnackbar({ open: true, message: t('vehicles.purchase.messages.fillRequired'), severity: 'warning' });
      return;
    }

    if (!vehicle && (!paidAmount || !paymentSource)) {
      setSnackbar({ open: true, message: 'Paid amount and payment source are required for new vehicles.', severity: 'warning' });
      return;
    }

    // Validate that paid amount doesn't exceed purchasing price
    const numericPrice = Number(purchasingPrice);
    const numericPaid = Number(paidAmount);

    if (numericPaid > numericPrice) {
      setSnackbar({ open: true, message: `⚠️ Paid amount (${numericPaid.toLocaleString()} AED) cannot exceed the purchasing price (${numericPrice.toLocaleString()} AED). Please adjust the paid amount.`, severity: 'error' });
      return;
    }

    setLoading(true);

    try {
      if (vehicle) {
        // EDIT MODE
        const vpQ = query(
          collection(db, 'vendorsPayment'),
          where('Serial_Number', '==', vehicle.serialNumber)
        );
        const purQ = query(
          collection(db, 'vehiclePurchasing'),
          where('serialNumber', '==', vehicle.serialNumber)
        );
        const [vpSnap, purSnap] = await Promise.all([getDocs(vpQ), getDocs(purQ)]);

        const oldVpData = !vpSnap.empty ? vpSnap.docs[0].data() : null;
        const oldAmount = oldVpData ? Number(oldVpData.paidAmount) || 0 : 0;
        const oldBankName = oldVpData ? oldVpData.paidPortal : null;

        const newBankLabel = bankPortals.find((b) => b.id === paymentSource)?.label || 'Unknown';

        // Fetch bank documents to update balances
        let oldBankDoc: any = null;
        let newBankDoc: any = null;

        if (oldBankName) {
          const q = query(collection(db, 'bankPortal'), where('bankPortalName', '==', oldBankName));
          const snap = await getDocs(q);
          if (!snap.empty) oldBankDoc = snap.docs[0];
        }

        if (newBankLabel && newBankLabel !== oldBankName) {
          const q = query(
            collection(db, 'bankPortal'),
            where('bankPortalName', '==', newBankLabel)
          );
          const snap = await getDocs(q);
          if (!snap.empty) newBankDoc = snap.docs[0];
        } else if (newBankLabel === oldBankName) {
          newBankDoc = oldBankDoc;
        }

        await runTransaction(db, async (transaction) => {
          const vehicleRef = doc(db, 'vehicles', vehicle.id);
          const purchaseDateObj = Timestamp.fromDate(new Date(purchasingDate));
          const vendorLabel = vendors.find((v) => v.id === vendor)?.label || vendor;

          // 1. Adjust Bank Balances
          if (oldBankDoc && newBankDoc && oldBankDoc.id === newBankDoc.id) {
            // Same bank, different amount
            const diff = numericPaid - oldAmount;
            if (diff !== 0) {
              const freshBank = await transaction.get(oldBankDoc.ref);
              const bankData = freshBank.data() as { balance?: number };
              transaction.update(oldBankDoc.ref, {
                balance: (bankData?.balance || 0) - diff,
              });
            }
          } else {
            // Different banks
            if (oldBankDoc) {
              const freshOld = await transaction.get(oldBankDoc.ref);
              const oldData = freshOld.data() as { balance?: number };
              transaction.update(oldBankDoc.ref, {
                balance: (oldData?.balance || 0) + oldAmount,
              });
            }
            if (newBankDoc) {
              const freshNew = await transaction.get(newBankDoc.ref);
              const newData = freshNew.data() as { balance?: number };
              transaction.update(newBankDoc.ref, {
                balance: (newData?.balance || 0) - numericPaid,
              });
            }
          }

          // 2. Update Vehicle
          transaction.update(vehicleRef, {
            manufacturer,
            model,
            modelYear: Number(modelYear),
            vendor: vendorLabel,
            parkingLocation,
            purchasingDate: purchaseDateObj,
            vehiclePurchaseCost: numericPrice,
            totalAccruedCost: numericPrice,
            crn: Number(crn) || crn,
            vinChassisNumber: vin,
            mubayaStatus: mubayaStatus || 'Not Requested',
            color: color || null,
          });

          // 3. Update Vehicle Purchasing Record(s)
          purSnap.forEach((d) => {
            transaction.update(d.ref, {
              purchaseDate: purchaseDateObj,
              purchasePrice: numericPrice,
              vendor: vendorLabel,
            });
          });

          // 4. Update Vendor Payment Record(s)
          vpSnap.forEach((d) => {
            transaction.update(d.ref, {
              balance: numericPrice - numericPaid,
              date: purchaseDateObj,
              paidAmount: numericPaid,
              paidPortal: newBankLabel,
              vendorName: vendorLabel,
              vehiclePurchaseId: numericPrice,
            });
          });
        });
      } else {
        // CREATE MODE

        // Ensure Google Drive Sign-in happens first (user gesture)
        // This prevents popup blockers which might trigger if we wait until after the transaction
        let skipDriveCreation = false;
        try {
          // This will now THROW if it fails, returning true if success
          await signInToGoogleDrive();
        } catch (e: any) {
          console.error('Drive Auth Error:', e);
          const errorMessage = e?.message || 'Unknown error';

          const proceed = window.confirm(
            `Google Drive Sign-in failed: ${errorMessage}\n\nDo you want to continue creating the vehicle WITHOUT Google Drive folders?`
          );

          if (!proceed) return;
          skipDriveCreation = true;
        }

        const result = await runTransaction(db, async (transaction) => {
          // 1. Get Counters & Bank Details (READs first)
          const countersRef = doc(db, 'setting', 'counter');
          const bankRef = doc(db, 'bankPortal', paymentSource);

          const countersDoc = await transaction.get(countersRef);
          const bankDoc = await transaction.get(bankRef);

          if (!countersDoc.exists()) {
            throw new Error('Counters document does not exist!');
          }

          const counters = countersDoc.data();

          // Helper to increment ID (e.g., VL1524 -> VL1525)
          const incrementId = (lastId: string | undefined) => {
            if (!lastId) return '000001'; // Default starting ID if none exists
            const prefix = lastId.match(/^[A-Z]+/)?.[0] || '';
            const numberPart = lastId.match(/\d+$/)?.[0] || '0';
            const newNumber = String(Number(numberPart) + 1).padStart(numberPart.length, '0');
            return prefix + newNumber;
          };

          const newSerialNumber = incrementId(counters.lastSerialNumber);
          const newPurchaseId = incrementId(counters.lastVehiclePurchasing);
          const newVendorPaymentId = incrementId(counters.lastVendorsPayment);
          const newBankTxId = incrementId(counters.lastBankTransaction);

          // 2. Prepare Data
          const purchaseDateObj = Timestamp.fromDate(new Date(purchasingDate));

          // 3. Create Vehicle
          const vehicleRef = doc(db, 'vehicles', newSerialNumber);
          transaction.set(vehicleRef, {
            serialNumber: newSerialNumber,
            manufacturer: manufacturer || '',
            model: model || '',
            modelYear: Number(modelYear),
            vendor: vendors.find((v) => v.id === vendor)?.label || vendor || '',
            parkingLocation: parkingLocation || '',
            purchasingDate: purchaseDateObj,
            vehiclePurchaseCost: numericPrice,
            totalAccruedCost: numericPrice,
            crn: Number(crn) || crn || '', // Keep as string if not purely numeric OR empty string fallback
            vinChassisNumber: vin,
            soldStatus: 'Available', // Assuming default is unsold
            mubayaStatus,
            color: color || null,
          });

          // 4. Create Vehicle Purchasing Record
          const purchaseRef = doc(db, 'vehiclePurchasing', newPurchaseId);
          transaction.set(purchaseRef, {
            transactionId: newPurchaseId,
            purchaseDate: purchaseDateObj,
            purchasePrice: numericPrice,
            serialNumber: newSerialNumber,
            vendor: vendors.find((v) => v.id === vendor)?.label || vendor || '',
            status: true,
          });

          // 5. Create Vendor Payment
          const vendorPaymentRef = doc(db, 'vendorsPayment', newVendorPaymentId);
          transaction.set(vendorPaymentRef, {
            Serial_Number: newSerialNumber,
            balance: numericPrice - numericPaid, // If paid full, balance 0
            date: purchaseDateObj,
            paidAmount: numericPaid,
            paidPortal: bankPortals.find((b) => b.id === paymentSource)?.label || 'Unknown',
            status: true,
            vehiclePurchaseId: numericPrice,
            vendorName: vendors.find((v) => v.id === vendor)?.label || vendor || '',
            transactionId: newVendorPaymentId,
          });

          // 6. Create Bank Transaction
          const bankTxRef = doc(db, 'bankTransaction', newBankTxId);
          transaction.set(bankTxRef, {
            transactionId: newBankTxId,
            amount: numericPaid,
            bankPortalName: bankPortals.find((b) => b.id === paymentSource)?.label || 'Unknown',
            date: purchaseDateObj,
            description: `Purchase: ${newSerialNumber} - ${manufacturer} ${model} - ${vendors.find((v) => v.id === vendor)?.label || vendor}`,
            status: true,
            type: 'Debit',
          });

          // 7. Update Bank Balance
          if (bankDoc.exists()) {
            const currentBalance = bankDoc.data().balance || 0;
            transaction.update(bankRef, {
              balance: currentBalance - numericPaid,
            });
          }

          // 8. Update Counters
          transaction.update(countersRef, {
            lastSerialNumber: newSerialNumber,
            lastVehiclePurchasing: newPurchaseId,
            lastVendorsPayment: newVendorPaymentId,
            lastBankTransaction: newBankTxId,
          });

          // We wrap the notification in a then or just call it after the transaction.
          // But we need the values. We can return them from the transaction.
          return {
            newSerialNumber,
            newPurchaseId,
            newBankTxId,
            newVendorPaymentId,
            numericPrice,
            numericPaid,
          };
        });

        // Create Google Drive Folders
        if (!skipDriveCreation) {
          try {
            const folders = await createVehicleFolders(
              result.newSerialNumber,
              manufacturer,
              model,
              Number(modelYear)
            );

            // folders is now guaranteed to be an object because createVehicleFolders throws on error
            // Update the vehicle document with folder URLs
            const vehicleRef = doc(db, 'vehicles', result.newSerialNumber);
            await setDoc(
              vehicleRef,
              {
                picsUrl: folders.picsUrl,
                docsUrl: folders.docsUrl,
              },
              { merge: true }
            );

            console.log('Google Drive folders created successfully:', folders);
          } catch (driveError: any) {
            console.error('Error creating Google Drive folders:', driveError);
            setSnackbar({ open: true, message: `[v3-Fix] Vehicle purchased, but Drive folder creation failed: ${driveError?.message || driveError}`, severity: 'warning' });
          }
        }

        // Send Notification
        const vendorLabel = vendors.find((v) => v.id === vendor)?.label || vendor || 'Unknown';

        try {
          await sendGoogleChatNotification({
            header: {
              title: '🚗 New Vehicle Purchased',
              subtitle: 'Marakish Group',
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      topLabel: 'Serial Number',
                      content: String(result.newSerialNumber),
                      icon: 'TICKET',
                    },
                  },
                  {
                    keyValue: {
                      topLabel: 'Details',
                      content: `${manufacturer} ${model} ${modelYear}`,
                      icon: 'CAR',
                    },
                  },
                  {
                    keyValue: {
                      topLabel: 'Price',
                      content: formatCurrency(result.numericPrice),
                      icon: 'DOLLAR',
                    },
                  },
                  {
                    keyValue: {
                      topLabel: 'Paid Amount',
                      content: formatCurrency(result.numericPaid),
                      icon: 'MONEY',
                    },
                  },
                  { keyValue: { topLabel: 'Vendor', content: vendorLabel, icon: 'STORE' } },
                  {
                    keyValue: {
                      topLabel: 'Purchase Date',
                      content: dayjs(purchasingDate).format('DD/MM/YYYY'),
                      icon: 'CLOCK',
                    },
                  },
                ],
              },
              {
                header: 'Transaction IDs',
                widgets: [
                  {
                    keyValue: {
                      topLabel: 'Purchase ID',
                      content: result.newPurchaseId,
                      icon: 'CONFIRMATION_NUMBER_ICON',
                    },
                  },
                  {
                    keyValue: {
                      topLabel: 'Bank ID',
                      content: result.newBankTxId,
                      icon: 'ACCOUNT_BALANCE_WALLET',
                    },
                  },
                  {
                    keyValue: {
                      topLabel: 'Vendor ID',
                      content: result.newVendorPaymentId,
                      icon: 'DESCRIPTION',
                    },
                  },
                ],
              },
            ],
          });
        } catch (chatError) {
          console.error('Google Chat Notification Failed:', chatError);
        }

        try {
          await addNotification({
            title: 'New Vehicle Purchased',
            description: `${manufacturer} ${model} (${result.newSerialNumber}) purchased for ${formatCurrency(result.numericPrice)}`,
            type: 'vehicle-purchase',
          });
        } catch (notifError) {
          console.error('In-App Notification Failed:', notifError);
        }
      }

      setSnackbar({ open: true, message: t('vehicles.purchase.messages.purchaseSuccess'), severity: 'success' });

      console.log('Transaction committed successfully!');
      if (onUpdate) onUpdate();
      onClose();
    } catch (e: any) {
      console.error('Transaction failed: ', e);
      setSnackbar({ open: true, message: `Failed to save vehicle purchase: ${e.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {vehicle ? t('vehicles.purchase.titleEdit') : t('vehicles.purchase.titleNew')}
        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Tabs value={currentTab} onChange={(e, val) => setCurrentTab(val)} sx={{ mb: 3 }}>
          <Tab label={t('vehicles.purchase.tabs.details')} />
          <Tab label={t('vehicles.purchase.tabs.mubaya')} />
          {vehicle && <Tab label={t('vehicles.purchase.tabs.vendorPayments')} />}
        </Tabs>

        {currentTab === 0 && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('vehicles.purchase.sections.vehicleDetails')}
            </Typography>

            <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
              gap={2}
              sx={{ mb: 3 }}
            >
              <Box>
                <Autocomplete
                  options={manufacturers}
                  getOptionLabel={(option) => option.label || ''}
                  value={manufacturers.find((m) => m.id === manufacturer) || null}
                  blurOnSelect
                  onChange={(event, newValue) => {
                    handleManufacturerChange(newValue ? newValue.id : '');
                  }}
                  renderInput={(params) => <TextField {...params} label={`${t('vehicles.purchase.labels.manufacturer')} *`} />}
                />
                <Button
                  variant="text"
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={() => handleOpenAddDialog('manufacturer')}
                  sx={{ mt: 0.5, typography: 'caption', color: 'text.secondary' }}
                >
                  {t('vehicles.purchase.buttons.addNewManufacturer')}
                </Button>
              </Box>
              <Box>
                <Autocomplete
                  options={models}
                  getOptionLabel={(option) => option.label || ''}
                  value={models.find((m) => m.label === model) || null}
                  disabled={!manufacturer}
                  blurOnSelect
                  onChange={(event, newValue) => {
                    setModel(newValue ? newValue.label : '');
                  }}
                  renderInput={(params) => <TextField {...params} id="vehicle-model-input" label={`${t('vehicles.purchase.labels.model')} *`} />}
                />
                <Button
                  variant="text"
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={() => handleOpenAddDialog('model')}
                  disabled={!manufacturer}
                  sx={{ mt: 0.5, typography: 'caption', color: 'text.secondary' }}
                >
                  {t('vehicles.purchase.buttons.addNewModel')}
                </Button>
              </Box>
              <Box>
                <Autocomplete
                  options={YEARS}
                  value={modelYear || null}
                  onChange={(event, newValue) => {
                    setModelYear(newValue || '');
                  }}
                  renderInput={(params) => <TextField {...params} label={`${t('vehicles.purchase.labels.modelYear')} *`} />}
                />
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('vehicles.purchase.sections.purchaseRegistration')}
            </Typography>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
              <Box>
                <TextField
                  fullWidth
                  label={`${t('vehicles.purchase.labels.purchasingDate')} *`}
                  type="date"
                  value={purchasingDate}
                  onChange={(e) => setPurchasingDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box>
                <Autocomplete
                  options={vendors}
                  getOptionLabel={(option) => option.label || ''}
                  value={vendors.find((v) => v.id === vendor) || null}
                  onChange={(event, newValue) => {
                    setVendor(newValue ? newValue.id : '');
                  }}
                  renderInput={(params) => <TextField {...params} label={`${t('vehicles.purchase.labels.vendor')} *`} />}
                />
                <Button
                  variant="text"
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={() => handleOpenAddDialog('vendor')}
                  sx={{ mt: 0.5, typography: 'caption', color: 'text.secondary' }}
                >
                  {t('vehicles.purchase.buttons.addNewVendor')}
                </Button>
              </Box>

              <Box>
                <Autocomplete
                  options={parkingList}
                  getOptionLabel={(option) => option.label || ''}
                  value={parkingList.find((p) => p.label === parkingLocation) || null}
                  onChange={(event, newValue) => {
                    setParkingLocation(newValue ? newValue.label : '');
                  }}
                  renderInput={(params) => <TextField {...params} label={t('vehicles.purchase.labels.parkingLocation')} />}
                />
                <Button
                  variant="text"
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={() => handleOpenAddDialog('parking')}
                  sx={{ mt: 0.5, typography: 'caption', color: 'text.secondary' }}
                >
                  {t('vehicles.purchase.buttons.addNewParking')}
                </Button>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label={`${t('vehicles.purchase.labels.purchasingPrice')} *`}
                  type="number"
                  value={purchasingPrice}
                  onChange={handlePriceChange}
                  placeholder="0.00"
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label={`${t('vehicles.purchase.labels.paidAmount')} *`}
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  placeholder="0.00"
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label={`${t('vehicles.purchase.labels.crn')} *`}
                  value={crn}
                  onChange={(e) => setCrn(e.target.value)}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label={t('vehicles.purchase.labels.vin')}
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  inputProps={{ style: { textTransform: 'uppercase' } }}
                />
              </Box>

              <Box>
                <Autocomplete
                  options={vehicleColors}
                  getOptionLabel={(option) => option.name || option}
                  isOptionEqualToValue={(option, value) => {
                    if (typeof value === 'string') return option.codes === value;
                    return option.id === value?.id;
                  }}
                  value={color}
                  onChange={(event, newValue) => setColor(newValue)}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: option.codes, border: '1px solid', borderColor: 'divider' }} />
                        {option.name}
                      </Box>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Vehicle Color" variant="outlined" />
                  )}
                />
              </Box>

              <Box>
                <Autocomplete
                  options={bankPortals}
                  getOptionLabel={(option) => option.label || ''}
                  value={bankPortals.find((b) => b.id === paymentSource) || null}
                  onChange={(event, newValue) => {
                    setPaymentSource(newValue ? newValue.id : '');
                  }}
                  renderInput={(params) => <TextField {...params} label="Payment Source *" />}
                />
                {paymentSource &&
                  (() => {
                    const selectedBank = bankPortals.find((b) => b.id === paymentSource);
                    if (selectedBank) {
                      return (
                        <Box
                          sx={{
                            mt: 1,
                            p: 2,
                            borderRadius: 1,
                            boxShadow: 1, // Subtle shadow for card effect
                            bgcolor: (theme) => theme.palette.background.neutral, // Using neutral background
                            animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth fade-in with slide
                            '@keyframes fadeIn': {
                              '0%': { opacity: 0, transform: 'translateY(-8px)' },
                              '100%': { opacity: 1, transform: 'translateY(0)' },
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.secondary', fontWeight: 'medium' }}
                            >
                              {t('vehicles.purchase.labels.availableBalance')}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: selectedBank.balance >= 0 ? 'success.main' : 'error.main',
                                fontWeight: 'bold',
                              }}
                            >
                              {selectedBank.balance?.toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    }
                    return null;
                  })()}
              </Box>
            </Box>
          </>
        )}

        {currentTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{t('vehicles.table.mubaya')}</FormLabel>
              <RadioGroup
                aria-label="mubaya-status"
                name="mubaya-status"
                value={mubayaStatus}
                onChange={(e) => setMubayaStatus(e.target.value)}
              >
                <FormControlLabel
                  value="Not Requested"
                  control={<Radio />}
                  label={`${t('vehicles.table.notRequested')} (Default)`}
                />
                <FormControlLabel value="Requested" control={<Radio />} label={t('vehicles.table.requested')} />
                <FormControlLabel value="Arrived" control={<Radio />} label={t('vehicles.table.arrived')} />
                <FormControlLabel value="Handed Over" control={<Radio />} label={t('vehicles.table.handedOver')} />
              </RadioGroup>
            </FormControl>
          </Box>
        )}

        {currentTab === 2 && (
          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 1,
                bgcolor: vendorBalance > 0 ? 'warning.lighter' : 'success.lighter',
                border: 1,
                borderColor: vendorBalance > 0 ? 'warning.main' : 'success.main',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: vendorBalance > 0 ? 'warning.darker' : 'success.darker',
                  fontWeight: 'bold',
                }}
              >
                {t('vehicles.purchase.labels.remainingBalance')} {vendorBalance.toLocaleString()} AED
              </Typography>
              <Iconify
                icon={vendorBalance > 0 ? 'solar:restart-bold' : 'solar:share-bold'}
                sx={{
                  color: vendorBalance > 0 ? 'warning.main' : 'success.main',
                  width: 24,
                  height: 24,
                }}
              />
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('vehicles.purchase.sections.paymentHistory')}
            </Typography>
            <Box
              sx={{ mb: 4, overflowX: 'auto', border: 1, borderColor: 'divider', borderRadius: 1 }}
            >
              <Table size="small">
                <TableBody>
                  {vendorPayments.map((p) => (
                    <tr key={p.id}>
                      <td style={{ padding: '8px 16px' }}>
                        {dayjs(p.date?.toDate()).format('DD/MM/YYYY')}
                      </td>
                      <td style={{ padding: '8px 16px' }}>{p.paidPortal}</td>
                      <td style={{ padding: '8px 16px', textAlign: 'right', fontWeight: 'bold' }}>
                        {p.paidAmount?.toLocaleString()} AED
                      </td>
                    </tr>
                  ))}
                  {vendorPayments.length === 0 && (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', padding: '16px' }}>
                        {t('vehicles.purchase.messages.noPayments')}
                      </td>
                    </tr>
                  )}
                </TableBody>
              </Table>
            </Box>

            {vendorBalance > 0 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t('vehicles.purchase.sections.addNewPayment')}
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
                  gap={2}
                >
                  <TextField
                    fullWidth
                    label={`${t('vehicles.purchase.labels.paymentDate')} *`}
                    type="date"
                    value={newVendorPaymentDate}
                    onChange={(e) => setNewVendorPaymentDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    label={`${t('vehicles.purchase.labels.amount')} *`}
                    type="number"
                    value={newVendorPaidAmount}
                    onChange={(e) => setNewVendorPaidAmount(e.target.value)}
                  />
                  <Box>
                    <Autocomplete
                      options={bankPortals}
                      getOptionLabel={(o) => o.label}
                      value={bankPortals.find((b) => b.id === newVendorPaymentSource) || null}
                      disabled={!newVendorPaidAmount || Number(newVendorPaidAmount) <= 0}
                      onChange={(e, v) => setNewVendorPaymentSource(v ? v.id : '')}
                      renderInput={(params) => <TextField {...params} label={`${t('vehicles.purchase.labels.paymentSource')} *`} />}
                    />
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}
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
        <Button onClick={handleSubmit} variant="contained" disabled={loading} color="primary">
          {loading
            ? t('vehicles.purchase.messages.processing')
            : currentTab === 2
              ? t('vehicles.purchase.buttons.addPayment')
              : vehicle
                ? t('vehicles.purchase.buttons.updateVehicle')
                : t('vehicles.purchase.buttons.purchaseVehicle')}
        </Button>
      </DialogActions>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog} maxWidth="xs" fullWidth>
        <DialogTitle>
          Add New {addDialogType.charAt(0).toUpperCase() + addDialogType.slice(1)}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('common.name')}
            fullWidth
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
          <Button onClick={handleCloseAddDialog} color="inherit">
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSaveNewItem} variant="contained" disabled={addLoading}>
            {addLoading ? t('vehicles.purchase.messages.saving') : t('common.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
