import { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';

import AirPanel from 'components/air_panel';
import { settings } from 'settings';

describe('Reusable button component', () => {
  it('should display default empty message given no custom message', () => {
    const contents = [] as ReactElement[];
    const defaultMessage = 'No data available to display';
    const header = 'Aircrafts';
    const id = 'unique-id';
    render(
      <AirPanel contents={contents} header={header} id={id} />
    );
    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(defaultMessage)).toBeInTheDocument();
  });

  it('should display custom empty message given emptyMessage value', () => {
    const contents = [] as ReactElement[];
    const emptyMessage = 'Custom message';
    const header = 'Aircrafts';
    const id = 'unique-id';
    render(
      <AirPanel contents={contents} emptyMessage={emptyMessage} header={header} id={id} />
    );
    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
  });

  it('should display given contents on page', () => {
    const contents = [
      <div key='result-1'>Result 1</div>,
      <div key='result-2'>Result 2</div>,
      <div key='result-3'>Result 3</div>,
      <div key='result-4'>Result 4</div>,
      <div key='result-5'>Result 5</div>,
    ];
    render(
      <AirPanel contents={contents} header='Aircrafts' id='unique-id' />
    );
    const results = screen.getAllByText(/Result/i);
    expect(results.length).toBe(contents.length);
  });

  it(`should display not display more than ${settings.MIN_RESULTS_PER_LOAD} on init load`, () => {
    const contents = [
      <div key='result-1'>Result 1</div>,
      <div key='result-2'>Result 2</div>,
      <div key='result-3'>Result 3</div>,
      <div key='result-4'>Result 4</div>,
      <div key='result-5'>Result 5</div>,
      <div key='result-6'>Result 6</div>,
      <div key='result-7'>Result 7</div>,
      <div key='result-8'>Result 8</div>,
      <div key='result-9'>Result 9</div>,
      <div key='result-10'>Result 10</div>,
    ];
    render(
      <AirPanel contents={contents} header='Aircrafts' id='unique-id' />
    );
    const results = screen.getAllByText(/Result/i);
    expect(results.length).toBe(settings.MIN_RESULTS_PER_LOAD);
  });
});
