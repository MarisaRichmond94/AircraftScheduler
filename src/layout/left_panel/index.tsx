import './index.scss';

import AirLoader from 'components/air_loader';
import AirPanel from 'components/air_panel';
import AirCraftItem from 'layout/left_panel/aircraft';
import { useApp } from 'providers/app';

function LeftPanel() {
  const { activeAircraft, aircrafts, aircraftDataMap, aircraftUsage } = useApp() // provider variables
  const { updateActiveAircraft } = useApp(); // provider functions

  const populateAircrafts = () => {
    if (aircrafts) {
      return aircrafts.map(
        aircraft => {
          const isActive = !!(activeAircraft && aircraft.ident === activeAircraft.ident);
          return (
            <AirCraftItem
              key={`aircraft-${aircraft.ident}`}
              aircraft={aircraft}
              isActive={isActive}
              updateActiveAircraft={updateActiveAircraft}
              usage={isActive ? aircraftUsage : aircraftDataMap[aircraft.ident]?.aircraftUsage}
            />
          )
      }
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
