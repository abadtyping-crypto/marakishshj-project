import dayjs from 'dayjs';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type OperationExpenseTableRowProps = {
  row: any;
};

export function OperationExpenseTableRow({ row }: OperationExpenseTableRowProps) {
  const { date, category, description, amount, paymentSource, transactionId } = row;

  let formattedDate = '';
  if (date?.seconds) {
    formattedDate = dayjs(date.seconds * 1000).format('DD MMM YYYY');
  } else if (date) {
    formattedDate = dayjs(date).format('DD MMM YYYY');
  }

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>{formattedDate}</TableCell>

      <TableCell>
        <Label color="info">{category}</Label>
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ maxWidth: 200 }} noWrap>
          {description}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'error.main' }}>
          -{amount?.toLocaleString()} AED
        </Typography>
      </TableCell>

      <TableCell>{paymentSource}</TableCell>

      <TableCell>
        <Typography variant="caption" color="text.secondary">
          {transactionId}
        </Typography>
      </TableCell>

      <TableCell align="right">{/* Actions could go here */}</TableCell>
    </TableRow>
  );
}
