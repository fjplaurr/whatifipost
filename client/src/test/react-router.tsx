import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

function customRender(ui: React.ReactElement, { route = '/', ...options } = {}) {
  window.history.pushState({}, 'Test page', route);
  function Wrapper({ children }: any) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

export { customRender };
