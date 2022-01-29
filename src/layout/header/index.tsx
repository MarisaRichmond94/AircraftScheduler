import './index.scss';

import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import AirButton from 'components/air_button';

function Header() {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });

  return (
    <div id='header'>
      <AirButton
        classNames='thick header-text icon-button off-black'
        onClick={() => console.log('back')}
        textBlock={<MdArrowBackIos />}
      />
      <div className='thick header-text'>
        {`${today.getDate()} ${month} ${today.getFullYear()}`}
      </div>
      <AirButton
        classNames='thick header-text icon-button off-black'
        onClick={() => console.log('forward')}
        textBlock={<MdArrowForwardIos />}
      />
    </div>
  );
}

export default Header;
