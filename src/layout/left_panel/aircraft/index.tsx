import './index.scss';

import { ReactElement } from 'react';

import { AirCraft } from 'types';

type AirCraftItemProps = {
  aircraft: AirCraft,
  isActive: boolean,
  usage: number,
  updateActiveAircraft: (aircraft: AirCraft) => void,
};

const AirCraftItem = (props: AirCraftItemProps): ReactElement => {
  const { aircraft, isActive, usage, updateActiveAircraft } = props;
  const { ident } = aircraft;

  const containerClasses = isActive ? 'active aircraft-item' : 'aircraft-item';

  return (
    <div className={containerClasses} onClick={() => updateActiveAircraft(aircraft)}>
      <div className='identifier header-text'>
        {ident}
      </div>
      <div className='details-container header-text'>
        {`${usage || 0}%`}
      </div>
    </div>
  );
};

export default AirCraftItem;
