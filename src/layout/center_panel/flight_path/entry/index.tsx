import './index.scss';

import { ReactElement, useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaRegTimesCircle } from 'react-icons/fa';

import AirButton from 'components/air_button';
import { Flight } from 'types';

type FlightPathEntryProps = {
  entry: Flight,
  entryIndex: number,
  isActiveEntry: boolean,
  totalEntries: number,
  removeFromFlightPath: (flightId: string) => void,
  setActiveFlight: (flight: Flight) => void,
};

const FlightPathEntry = (props: FlightPathEntryProps): ReactElement => {
  const { entry, entryIndex, isActiveEntry, totalEntries } = props;
  const { removeFromFlightPath, setActiveFlight } = props;
  const { destination, ident, origin, readableArrival, readableDeparture } = entry;
  // derived variables
  const canBeDeleted = entryIndex === 0 || entryIndex === totalEntries - 1;
  const canBeSelected = entryIndex === totalEntries - 1;
  const containerClasses = (
    `flight-path-entry${isActiveEntry ? ' active' : ''}${canBeSelected ? '': ' disabled'}`
  );

  // if entry is active, scroll entry into view
  useEffect(() => {
    if (isActiveEntry) {
      const element = document.getElementById(`path-entry-${ident}`);
      if (element) element.scrollIntoView();
    }
  }, [isActiveEntry, ident]);

  const updateActiveFlight = () => { if (canBeSelected) setActiveFlight(entry); };

  return (
    <div className={containerClasses} onClick={updateActiveFlight} id={`path-entry-${ident}`}>
      <div className='entity-container'>
        <div className='identifier header-text'>
          <b>Flight #:</b> {ident}
        </div>
        <div className='details-container'>
          <div className='origin-details'>
            <div className='header-text'>{origin}</div>
            <div className='header-text'>{readableDeparture}</div>
          </div>
          <BsArrowRight />
          <div className='destination-details'>
            <div className='header-text'>{destination}</div>
            <div className='header-text'>{readableArrival}</div>
          </div>
        </div>
      </div>
      {
        canBeDeleted &&
        <div className='action-container'>
          <AirButton
            classNames='icon-button off-black header-text remove-entry-button'
            onClick={
              (event: React.MouseEvent<HTMLHeadingElement>) => {
                event.stopPropagation();
                removeFromFlightPath(ident);
              }
            }
            textBlock={<FaRegTimesCircle />}
          />
        </div>
      }
    </div>
  );
};

export default FlightPathEntry;
