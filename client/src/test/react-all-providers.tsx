import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../containers/App';

const mockUser = {
  _id: 'mockId1',
  email: 'mockEmail1@mockEmail1.mockEmail1',
  password: 'mockPassword1',
  name: 'mockName1',
  surname: 'mockSurname1',
  description: 'mockDescription1',
  following: [
    'mockId2',
  ],
  followers: ['mockId3'],
};

const defaultProviderProps = {
  value: {
    user: mockUser,
    isConfiguringProfile: false,
    isPosting: false,
    isSearching: false,
    watchingOtherProfileId: '',
    setIsConfiguringProfile: jest.fn(),
    setIsPosting: jest.fn(),
    setIsSearching: jest.fn(),
    setUser: jest.fn(),
    setWatchingOtherProfileId: jest.fn(),
  },
};

function customRender(
  ui: React.ReactElement,
  { providerProps = defaultProviderProps, route = '/', ...renderOptions } = {},
) {
  window.history.pushState({}, 'Test page', route);
  function Wrapper({ children }: any) {
    return (
      <UserContext.Provider {...providerProps}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
  return render(
    ui,
    { wrapper: Wrapper, ...renderOptions },
  );
}

export { customRender, mockUser, defaultProviderProps };
