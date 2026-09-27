import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { query, where, collection, onSnapshot } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { db } from 'src/firebase';

import { Iconify } from 'src/components/iconify';

import { BankPortalTransferDialog } from '../bank-portal-transfer-dialog';
import { ClientPaymentDialog } from '../../vehicle/client-payment-dialog';
import { OperationExpenseDialog } from '../../operation/operation-expense-dialog';

// ----------------------------------------------------------------------

type BankPortal = {
  id: string;
  bankPortalName: string;
  balance: number;
  status: boolean;
};

export function BankPortalView() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [portals, setPortals] = useState<BankPortal[]>([]);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openOperationExpense, setOpenOperationExpense] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'bankPortal'), where('status', '==', true));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BankPortal[];
      setPortals(data.sort((a, b) => b.balance - a.balance));
    });
    return () => unsub();
  }, []);

  // Handle query parameters to auto-open dialogs
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'receive') {
      setOpenPayment(true);
      // Clear the query parameter after opening
      setSearchParams({});
    } else if (action === 'transfer') {
      setOpenTransfer(true);
      // Clear the query parameter after opening
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">{t('bankPortals.title')}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="info"
            startIcon={<Iconify icon="solar:restart-bold" />}
            onClick={() => setOpenPayment(true)}
            sx={{ gap: 1, px: 2 }}
          >
            {t('bankPortals.receivePayment')}
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Iconify icon="solar:chat-round-dots-bold" />}
            onClick={() => setOpenOperationExpense(true)}
            sx={{ gap: 1, px: 2 }}
          >
            {t('bankPortals.operationExpense')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Iconify icon="solar:restart-bold" />}
            onClick={() => setOpenTransfer(true)}
            sx={{ gap: 1, px: 2 }}
          >
            {t('bankPortals.portalTransfer')}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {portals.map((portal) => (
          <Grid key={portal.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ textAlign: 'center' }}>
              <CardContent sx={{ pt: 5, pb: 5 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    mb: 3,
                    mx: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: portal.balance >= 0 ? 'success.lighter' : 'error.lighter',
                    color: portal.balance >= 0 ? 'success.main' : 'error.main',
                  }}
                >
                  <Iconify icon="solar:home-angle-bold-duotone" width={32} />
                </Box>

                <Typography variant="h6" gutterBottom>
                  {portal.bankPortalName}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{ color: portal.balance >= 0 ? 'success.main' : 'error.main' }}
                >
                  {portal.balance?.toLocaleString()} AED
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <BankPortalTransferDialog open={openTransfer} onClose={() => setOpenTransfer(false)} />
      <OperationExpenseDialog
        open={openOperationExpense}
        onClose={() => setOpenOperationExpense(false)}
      />
      <ClientPaymentDialog open={openPayment} onClose={() => setOpenPayment(false)} />
    </Container>
  );
}
