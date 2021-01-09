import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import { customRender, mockUser } from '../../../test/react-all-providers';
import { signin } from '../../../endpoints/auth';
import Signin from '.';

// Mocks auth module
jest.mock('../../../endpoints/auth');
const mockedSignin = signin as any;

// Mocks history.push from react-router
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  __esModule: true,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('Fill user and password correctly', async () => {
  customRender(<Signin />);

  // input Email
  const inputEmail = screen.getByLabelText(/email/i);
  userEvent.type(inputEmail, mockUser.email);
  expect(inputEmail).toHaveValue(mockUser.email);

  // input Password
  const inputPassword = screen.getByLabelText(/password/i);
  userEvent.type(inputPassword, mockUser.password);
  expect(inputPassword).toHaveValue(mockUser.password);

  // click button
  const submitButton = screen.getByRole('button');
  mockedSignin.mockResolvedValueOnce({
    user: {
      id: 'mockId',
      email: mockUser.email,
    },
    token: 'mockToken',
  });
  userEvent.click(submitButton);
  expect(mockedSignin).toHaveBeenCalledTimes(1);
});

test('Fill user and password incorrectly', async () => {
  const { getByLabelText, getByRole, getByText } = customRender(<Signin />);

  // input Email
  const inputEmail = getByLabelText(/email/i);
  userEvent.type(inputEmail, mockUser.email);
  expect(inputEmail).toHaveValue(mockUser.email);

  // input Password
  const inputPassword = getByLabelText(/password/i);
  userEvent.type(inputPassword, mockUser.password);
  expect(inputPassword).toHaveValue(mockUser.password);

  // click button
  const submitButton = getByRole('button');
  mockedSignin.mockResolvedValueOnce({ message: 'Invalid email or password' });
  userEvent.click(submitButton);
  await act(() => Promise.resolve());
  expect(mockedSignin).toHaveBeenCalledTimes(1);
  expect(getByText(/The email and/i)).toBeInTheDocument();
});
