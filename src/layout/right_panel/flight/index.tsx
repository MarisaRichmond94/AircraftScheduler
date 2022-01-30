import './index.scss';

import { ReactElement } from 'react';

import { Flight, UpdateFlightPathTypes } from 'types';

type FlightItemProps = {
  flight: Flight,
  updateFlightPath: (flight: Flight, type: UpdateFlightPathTypes) => void,
};

const FlightItem = (props: FlightItemProps): ReactElement => {
  const { flight, updateFlightPath } = props;
  const { destination, ident, origin, readableArrival, readableDeparture } = flight;

  return (
    <div className='flight-item' onClick={() => updateFlightPath(flight, UpdateFlightPathTypes.add)}>
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
