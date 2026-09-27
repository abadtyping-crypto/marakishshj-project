import type { Vehicle } from 'src/types/vehicle';

// ----------------------------------------------------------------------

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

// ----------------------------------------------------------------------

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// ----------------------------------------------------------------------

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ----------------------------------------------------------------------

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (
  a: {
    [key in Key]: number | string | any;
  },
  b: {
    [key in Key]: number | string | any;
  }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: Vehicle[];
  filterName: string;
  comparator: (a: any, b: any) => number;
  filters?: {
    manufacturer: string;
    model: string;
    modelYear: string;
    soldStatus: string;
    mubayaStatus: string;
    vendor: string;
  };
};

export function applyFilter({ inputData, comparator, filterName, filters }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    const lowerFilter = filterName.toLowerCase();
    inputData = inputData.filter(
      (vehicle) =>
        (vehicle.serialNumber &&
          String(vehicle.serialNumber).toLowerCase().includes(lowerFilter)) ||
        (vehicle.manufacturer &&
          String(vehicle.manufacturer).toLowerCase().includes(lowerFilter)) ||
        (vehicle.model && String(vehicle.model).toLowerCase().includes(lowerFilter)) ||
        String(vehicle.modelYear).toLowerCase().includes(lowerFilter) ||
        (vehicle.vinChassisNumber &&
          String(vehicle.vinChassisNumber).toLowerCase().includes(lowerFilter)) ||
        (vehicle.crn && String(vehicle.crn).toLowerCase().includes(lowerFilter)) ||
        (vehicle.vendor && String(vehicle.vendor).toLowerCase().includes(lowerFilter))
    );
  }

  if (filters) {
    if (filters.manufacturer !== 'All') {
      inputData = inputData.filter((v) => v.manufacturer === filters.manufacturer);
    }
    if (filters.model !== 'All') {
      inputData = inputData.filter((v) => v.model === filters.model);
    }
    if (filters.modelYear !== 'All') {
      inputData = inputData.filter((v) => String(v.modelYear || '') === String(filters.modelYear));
    }
    if (filters.soldStatus !== 'All') {
      inputData = inputData.filter(
        (v) => String(v.soldStatus || '') === String(filters.soldStatus)
      );
    }
    if (filters.mubayaStatus !== 'All') {
      inputData = inputData.filter(
        (v) => (v.mubayaStatus || 'Not Requested') === filters.mubayaStatus
      );
    }
    if (filters.vendor !== 'All') {
      inputData = inputData.filter((v) => String(v.vendor || '') === String(filters.vendor));
    }
  }

  return inputData;
}
