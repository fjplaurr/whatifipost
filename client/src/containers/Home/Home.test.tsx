import React from 'react';
import { customRender, defaultProviderProps } from '../../test/react-all-providers';
import Home from './Home.component';

const userSearching = {
  value: { ...defaultProviderProps.value, isSearching: true },
};

const userConfiguringProfile = {
  value: { ...defaultProviderProps.value, isConfiguringProfile: true },
};

it('Renders dark mode when user is searching', () => {
  customRender(<Home />, { providerProps: userSearching });
  expect(document.querySelector('.homeContainer.opacity')).toBeInTheDocument();
});

it('Renders dark mode when user is configuring profile', () => {
  customRender(<Home />, { providerProps: userConfiguringProfile });
  expect(document.querySelector('.homeContainer.opacity')).toBeInTheDocument();
});
