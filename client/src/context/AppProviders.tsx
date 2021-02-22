import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';

const AppProviders = ({ children }: any) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default AppProviders;
