import 'global.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app';
import ErrorBoundary from 'error_boundary';
import { AppProvider } from 'providers/app';
import reportWebVitals from 'reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
