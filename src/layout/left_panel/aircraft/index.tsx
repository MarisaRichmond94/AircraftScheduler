import './index.scss';

import { ReactElement } from 'react';

import { AirCraft } from 'types';

type AirCraftItemProps = {
  aircraft: AirCraft,
  isActive: boolean,
  usage: number,
};

const AirCraftItem = (props: AirCraftItemProps): ReactElement => {
  const { aircraft, isActive, usage } = props;
  const { ident } = aircraft;

  const containerClasses = isActive ? 'active aircraft-item' : 'aircraft-item';

  return (
    <div className={containerClasses}>
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
