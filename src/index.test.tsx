import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app';
import ErrorBoundary from 'error_boundary';
import { AppProvider } from 'providers/app';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('index.tsx');
    expect(ReactDOM.render).toHaveBeenCalledWith(
      (
        <React.StrictMode>
          <ErrorBoundary>
            <AppProvider>
              <App />
            </AppProvider>
          </ErrorBoundary>
        </React.StrictMode>
      ),
      div
    );
  });
});
