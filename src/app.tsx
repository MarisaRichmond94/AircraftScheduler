import 'app.scss';

import CenterPanel from 'layout/center_panel';
import Header from 'layout/header';
import LeftPanel from 'layout/left_panel';
import RightPanel from 'layout/right_panel';
import { AppProvider } from 'providers/app';

function App() {
  return (
    <AppProvider>
      <div id='app-container'>
        <Header />
        <div id='body-container'>
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
