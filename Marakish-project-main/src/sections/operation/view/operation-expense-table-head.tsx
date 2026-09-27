import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from '../../vehicle/utils';

// ----------------------------------------------------------------------

type OperationExpenseTableHeadProps = {
  headLabel: any[];
};

export function OperationExpenseTableHead({ headLabel }: OperationExpenseTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel hideSortIcon>
              {headCell.label}
              {headCell.id ? <Box sx={{ ...visuallyHidden }}>{headCell.id}</Box> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
