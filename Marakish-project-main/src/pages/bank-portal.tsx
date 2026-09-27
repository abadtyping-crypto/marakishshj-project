import { CONFIG } from 'src/config-global';

import { BankPortalView } from 'src/sections/bank/view/bank-portal-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title> {`Bank Portals - ${CONFIG.appName}`}</title>

      <BankPortalView />
    </>
  );
}
