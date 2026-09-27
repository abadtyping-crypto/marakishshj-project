import { CONFIG } from 'src/config-global';

import { ReportsView } from 'src/sections/reports/view/reports-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title> {`Statements - ${CONFIG.appName}`}</title>

      <ReportsView />
    </>
  );
}
