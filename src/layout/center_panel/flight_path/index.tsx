import './index.scss';

import { ReactElement } from 'react';
import { IoAirplaneSharp } from 'react-icons/io5';

import AddStartEntryButton from 'layout/center_panel/flight_path/add_start_entry_button';
import FlightPathEntry from 'layout/center_panel/flight_path/entry';
import { useApp } from 'providers/app';

const FlightPath = (): ReactElement => {
  const { activeFlight, flightPath } = useApp(); // provider variables
  const { removeFromFlightPath, setActiveFlight } = useApp(); // provider functions

  const populateFlightPathEntries = (): ReactElement[] => {
    if (flightPath.length) {
      const allEntries = [<AddStartEntryButton key='add-start-entry-item'/>];
      flightPath.forEach(
        (entry, index) => {
          allEntries.push(
            <FlightPathEntry
              key={`entry-${entry.ident}`}
              entry={entry}
              entryIndex={index}
              isActiveEntry={!!(activeFlight && activeFlight.ident === entry.ident)}
              removeFromFlightPath={removeFromFlightPath}
              setActiveFlight={setActiveFlight}
              totalEntries={flightPath.length}
            />
          );
        }
      );
      return allEntries;
    }

    return [];
  };

  const emptyFlightPathPrompt = (
    <div id='empty-flight-path-prompt'>
      <div className='large-header-text'>Select a starting flight to begin your rotation</div>
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
