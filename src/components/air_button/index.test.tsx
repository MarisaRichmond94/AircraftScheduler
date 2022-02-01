import { fireEvent, render, screen } from '@testing-library/react';

import AirButton from 'components/air_button';

describe('Reusable button component', () => {
  it('should render as expected', () => {
    const buttonText = 'Click Me';
    const onClick = jest.fn(() => {});
    const additionalClass = 'additional-class';
    const { container } = render(
      <AirButton classNames={additionalClass} text={buttonText} onClick={onClick} />
    );
    expect(screen.getByText(buttonText)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(additionalClass);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not be able to click button when is disabled is set to true', () => {
    const onClick = jest.fn(() => {});
    render(<AirButton isDisabled onClick={onClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
