import React from 'react';
import { render } from '@testing-library/react';
import { Context } from '../interfaces/Context';
import { UserContext } from '../containers/App';

const mockUser = {
  email: 'mockEmail@mockEmail.mockEmail',
  password: 'mockPassword',
  name: 'mockName',
  surname: 'mockSurname',
  description: 'mockDescription mockDescription mockDescription mockDescription',
};

const getDefaultProviderProps = () => {
  const defaultProviderProps: { value: Context } = {
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
  return defaultProviderProps;
};

function customRender(
  ui: React.ReactElement,
  { providerProps = getDefaultProviderProps(), ...renderOptions } = {},
) {
  function Wrapper({ children }: any) {
    return <UserContext.Provider {...providerProps}>{children}</UserContext.Provider>;
  }
  return render(
    ui,
    { wrapper: Wrapper, ...renderOptions },
  );
}

export { mockUser, customRender };
