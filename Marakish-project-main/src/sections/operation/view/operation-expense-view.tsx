import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { query, orderBy, collection, onSnapshot } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { db } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../../vehicle/table-no-data';
import { OperationExpenseDialog } from '../operation-expense-dialog';
import { OperationExpenseTableRow } from './operation-expense-table-row';
import { OperationExpenseTableHead } from './operation-expense-table-head';

// ----------------------------------------------------------------------

export function OperationExpenseView() {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const q = query(collection(db, 'operationExpenses'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);
    });

    return () => unsubscribe();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dataFiltered = expenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const notFound = !expenses.length;

  return (
    <DashboardContent maxWidth={false}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">{t('operationExpenses.title')}</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenDialog(true)}
          sx={{ gap: 1, px: 2 }}
        >
          {t('operationExpenses.addExpense')}
        </Button>
      </Box>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OperationExpenseTableHead
                headLabel={[
                  { id: 'date', label: t('operationExpenses.table.date') },
                  { id: 'category', label: t('operationExpenses.table.category') },
                  { id: 'description', label: t('operationExpenses.table.description') },
                  { id: 'amount', label: t('operationExpenses.table.amount') },
                  { id: 'paymentSource', label: t('operationExpenses.table.source') },
                  { id: 'transactionId', label: t('operationExpenses.table.txId') },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row) => (
                  <OperationExpenseTableRow key={row.id} row={row} />
                ))}

                {notFound && <TableNoData searchQuery="" />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={expenses.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <OperationExpenseDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </DashboardContent>
  );
}
