import './index.scss';

import { ReactElement } from 'react';
import { IoAirplaneSharp } from 'react-icons/io5';

import FlightPathEntry from 'layout/center_panel/flight_path/entry';
import { useApp } from 'providers/app';

const FlightPath = (): ReactElement => {
  const { activeFlight, flightPath, setActiveFlight } = useApp();

  const populateFlightPathEntries = (): ReactElement[] => {
    if (flightPath.length) {
      return flightPath.map(
        entry => (
          <FlightPathEntry
            key={`entry-${entry.ident}`}
            entry={entry}
            isActiveEntry={!!(activeFlight && activeFlight.ident === entry.ident)}
            setActiveFlight={setActiveFlight}
          />
        )
      );
    }

    return [];
  };

  const emptyFlightPathPrompt = (
    <div id='empty-flight-path-prompt'>
      <div className='large-header-text'>Select a flight to begin your path</div>
      <IoAirplaneSharp />
    </div>
  );

  return (
    <div id='flight-path'>
      {
        flightPath.length
        ? populateFlightPathEntries()
        : emptyFlightPathPrompt
      }
    </div>
  );
};

export default FlightPath;
