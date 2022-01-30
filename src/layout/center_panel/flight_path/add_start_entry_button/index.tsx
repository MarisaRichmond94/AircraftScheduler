import './index.scss';

import { ReactElement } from 'react';
import { GrAdd } from 'react-icons/gr';

import AirButton from 'components/air_button';
import { useApp } from 'providers/app';

const AddStartEntryButton = (): ReactElement => {
  const { activeFlight, earlierFlightsAvailable, setActiveFlight } = useApp();

  return (
    <AirButton
      classNames={!activeFlight ? 'active' : ''}
      id='add-start-entry-button-container'
      isDisabled={!earlierFlightsAvailable}
      onClick={() => setActiveFlight(undefined)}
      textBlock={
        <div id='add-start-entry-button'>
          <div className='header-text'><b>Add New Starting Flight </b></div>
          <div className='header-text'><GrAdd /></div>
        </div>
      }
    />
  );
};

export default AddStartEntryButton;
