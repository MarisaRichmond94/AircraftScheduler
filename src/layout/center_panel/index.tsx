import './index.scss';

import FlightPath from 'layout/center_panel/flight_path';
import UsageMeter from 'layout/center_panel/usage_meter';
import { useApp } from 'providers/app';

function CenterPanel() {
  const { activeAircraft } = useApp();

  return (
    <div id='center-panel'>
      {
        activeAircraft &&
        <div className='large-header-text' id='rotation-container'>
          <b>Rotation {activeAircraft.ident}</b>
        </div>
      }
      <FlightPath />
      <UsageMeter />
    </div>
  );
}

export default CenterPanel;
