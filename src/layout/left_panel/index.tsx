import './index.scss';

import AirLoader from 'components/air_loader';
import AirPanel from 'components/air_panel';
import AirCraftItem from 'layout/left_panel/aircraft';
import { useApp } from 'providers/app';

function LeftPanel() {
  const { activeAircraft, aircrafts } = useApp();

  const populateAircrafts = () => {
    if (aircrafts) {
      return aircrafts.map(
        aircraft => (
          <AirCraftItem
            key={`aircraft-${aircraft.ident}`}
            aircraft={aircraft}
            isActive={!!(activeAircraft && aircraft.ident === activeAircraft.ident)}
          />
        )
      );
    }

    return [];
  };

  return (
    <div id='left-panel'>
      {
        aircrafts
        ? <AirPanel header='Aircrafts' id='aircrafts-panel' contents={populateAircrafts()} />
        : <AirLoader />
      }
    </div>
  );
}

export default LeftPanel;
