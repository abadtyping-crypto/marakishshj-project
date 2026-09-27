import { CONFIG } from 'src/config-global';

import { ClientLedgerView } from '../sections/client-ledger/view';

// ----------------------------------------------------------------------

export default function ClientLedgerPage() {
    return (
        <>
            <title>{`Client Ledger - ${CONFIG.appName}`}</title>

            <ClientLedgerView />
        </>
    );
}
