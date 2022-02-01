import { render } from '@testing-library/react';

import AirLoader from 'components/air_loader';

describe('Reusable loader component', () => {
  it('should render as expected', () => {
    const { container } = render(<AirLoader />);
    expect(container.firstChild).toHaveClass('air-loader');
  });
});
