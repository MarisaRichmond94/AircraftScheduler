import './index.scss';

import moment from 'moment';
import { useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import AirButton from 'components/air_button';

function Header() {
  const [dayIncrement, setDayIncrement] = useState(1);
  const tomorrow = moment.utc().add(1, 'days').format('DD MMMM YYYY');
  const activeDay = moment.utc().add(dayIncrement, 'days').format('DD MMMM YYYY');

  const updateDayIncrement = (nextDayIncrement: number): void => {
    // @TODO - save data on date change and clear state
    setDayIncrement(nextDayIncrement);
  };

  return (
    <div id='header'>
      <AirButton
        classNames='thick header-text icon-button off-black day-nav-button'
        isDisabled={activeDay === tomorrow}
        onClick={() => updateDayIncrement(dayIncrement - 1)}
        textBlock={<MdArrowBackIos />}
      />
      <div className='thick header-text'>
        {activeDay}
      </div>
      <AirButton
        classNames='thick header-text icon-button off-black day-nav-button'
        onClick={() => updateDayIncrement(dayIncrement + 1)}
        textBlock={<MdArrowForwardIos />}
      />
    </div>
  );
}

export default Header;
