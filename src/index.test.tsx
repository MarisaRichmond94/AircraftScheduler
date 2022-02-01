import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app';
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
          <AppProvider>
            <App />
          </AppProvider>
        </React.StrictMode>
      ),
      div
    );
  });
});
