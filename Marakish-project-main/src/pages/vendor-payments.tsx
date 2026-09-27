import { CONFIG } from 'src/config-global';

import { VendorPaymentsView } from '../sections/vendor-payments/view';

// ----------------------------------------------------------------------

export default function VendorPaymentsPage() {
    return (
        <>
            <title>{`Vendor Payments - ${CONFIG.appName}`}</title>

            <VendorPaymentsView />
        </>
    );
}
