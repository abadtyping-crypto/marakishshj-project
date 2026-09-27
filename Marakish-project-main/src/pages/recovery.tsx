import { CONFIG } from 'src/config-global';

import { RecoveryView } from '../sections/recovery/view/recovery-view';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <title> {`Recovery - ${CONFIG.appName}`}</title>
            <RecoveryView />
        </>
    );
}
