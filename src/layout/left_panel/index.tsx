import './index.scss';

import AirLoader from 'components/air_loader';
import AirPanel from 'components/air_panel';
import AirCraftItem from 'layout/left_panel/aircraft';
import { useApp } from 'providers/app';

function LeftPanel() {
  const { activeAircraft, aircrafts, aircraftUsage } = useApp();

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
              usage={aircraftUsage} // @TODO - update this when multi-aircraft support is added
            />
          );
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
};

export default LeftPanel;
