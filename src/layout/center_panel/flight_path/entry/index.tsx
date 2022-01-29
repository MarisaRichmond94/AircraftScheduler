import './index.scss';

import { ReactElement } from 'react';
import { BsArrowRight } from 'react-icons/bs';

import { Flight } from 'types';

type FlightPathEntryProps = {
  entry: Flight,
  isActiveEntry: boolean,
  setActiveFlight: (flight: Flight) => void,
};

const FlightPathEntry = (props: FlightPathEntryProps): ReactElement => {
  const { entry, isActiveEntry, setActiveFlight } = props;
  const { destination, ident, origin, readableArrival, readableDeparture } = entry;

  return (
    <div
      className={isActiveEntry ? 'active flight-path-entry' : 'flight-path-entry'}
      onClick={() => setActiveFlight(entry)}
    >
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
  );
};

export default FlightPathEntry;
