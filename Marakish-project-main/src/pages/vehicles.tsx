import { CONFIG } from 'src/config-global';

import { VehicleView } from 'src/sections/vehicle/view/vehicle-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Vehicles - ${CONFIG.appName}`}</title>
      <VehicleView />
    </>
  );
}
