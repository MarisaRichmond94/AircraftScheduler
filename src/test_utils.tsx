import { render } from '@testing-library/react'
import { AppProvider } from 'providers/app';

const customRender = (ui: any, { providerProps, ...renderOptions } : { providerProps: any }) => {
  return render(
    <AppProvider {...providerProps}>{ui}</AppProvider>,
    renderOptions,
  )
};

export * from '@testing-library/react'
export {customRender as render}
