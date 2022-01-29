import './index.scss';

import { ReactElement } from 'react';

import { Flight } from 'types';

type FlightItemProps = {
  addToFlightPath: (flight: Flight) => void,
  flight: Flight,
};

const FlightItem = (props: FlightItemProps): ReactElement => {
  const { addToFlightPath, flight } = props;
  const { destination, ident, origin, readableArrival, readableDeparture } = flight;

  return (
    <div className='flight-item' onClick={() => addToFlightPath(flight)}>
      <div className='identifier header-text'>
        {ident}
      </div>
      <div className='details-container'>
        <div className='origin-details'>
          <div className='header-text'>{origin}</div>
          <div className='header-text'>{readableDeparture}</div>
        </div>
        <div className='destination-details'>
          <div className='header-text'>{destination}</div>
          <div className='header-text'>{readableArrival}</div>
        </div>
      </div>
    </div>
  );
};

export default FlightItem;
