import { CONFIG } from 'src/config-global';

import { OperationExpenseView } from 'src/sections/operation/view/operation-expense-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title> {`Operation Expenses - ${CONFIG.appName}`}</title>

      <OperationExpenseView />
    </>
  );
}
