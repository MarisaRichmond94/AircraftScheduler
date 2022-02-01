import moment from 'moment';

import App from 'app';
import { render, screen } from 'test_utils';

describe('Base app component', () => {
  it('should load page with correct initial state', () => {
    render(<App />, { providerProps: {} });
    const tomorrow = moment.utc().add(1, 'days').format('DD MMMM YYYY');
    expect(screen.getByText('Rotation GABCD')).toBeInTheDocument();
    expect(screen.getByText('Select a starting flight to begin your rotation')).toBeInTheDocument();
    expect(screen.getByText(tomorrow)).toBeInTheDocument();
  });
});
