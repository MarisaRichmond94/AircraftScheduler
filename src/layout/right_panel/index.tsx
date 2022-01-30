import './index.scss';

import AirLoader from 'components/air_loader';
import AirPanel from 'components/air_panel';
import FlightItem from 'layout/right_panel/flight';
import { useApp } from 'providers/app';

function RightPanel() {
  const { updateFlightPath, validFlights } = useApp();

  const populateFlights = () => {
    if (validFlights) {
      return validFlights.map(
        flight => (
          <FlightItem
            key={`flight-${flight.ident}`}
            updateFlightPath={updateFlightPath}
            flight={flight}
          />
        )
      );
    }

    return [];
  };

  return (
    <div id='right-panel'>
      {
        validFlights
        ? (
          <AirPanel
            header='Flights'
            id='flights-panel'
            contents={populateFlights()}
            emptyMessage='No available flights'
          />
        )
        : <AirLoader />
      }
    </div>
  );
};

export default RightPanel;
