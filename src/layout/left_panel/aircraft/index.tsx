import './index.scss';

import { ReactElement } from 'react';

import { AirCraft } from 'types';

type AirCraftItemProps = {
  aircraft: AirCraft,
  isActive: boolean,
};

const AirCraftItem = (props: AirCraftItemProps): ReactElement => {
  const { aircraft, isActive } = props;
  const { ident } = aircraft;

  return (
    <div className={isActive ? 'active aircraft-item' : 'aircraft-item'}>
      <div className='identifier header-text'>
        {ident}
      </div>
      <div className='details-container header-text'>
        58%
      </div>
    </div>
  );
};

export default AirCraftItem;
