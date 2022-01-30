import 'app.scss';

import AirLoader from 'components/air_loader';
import CenterPanel from 'layout/center_panel';
import Header from 'layout/header';
import LeftPanel from 'layout/left_panel';
import RightPanel from 'layout/right_panel';
import { useApp } from 'providers/app';

function App() {
  const { aircrafts, validFlights } = useApp();

  if (!aircrafts || !validFlights) {
    return (
      <div id='fetching-data'>
        <AirLoader color='#5BA1C5' type='cylon' />
        <div className='thick header-text text-center' id='fetching-text'>Fetching Flight Info...</div>
      </div>
    );
  };

  return (
    <div id='app-container'>
      <Header />
      <div id='body-container'>
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
