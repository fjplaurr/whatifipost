import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { customRender, mockUser } from '../../../test/react-all-providers';
import { signup } from '../../../endpoints/auth';
import Signup from './Signup.component';

// Mocks auth module
jest.mock('../../../endpoints/auth');
const mockedSignUp = signup as any;

// Mocks history.push from react-router
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  __esModule: true,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('Fill name, surname, email and password', () => {
  customRender(<Signup />);

  // input Name
  const inputName = screen.getByLabelText(/^name/i);
  userEvent.type(inputName, mockUser.name);
  expect(inputName).toHaveValue(mockUser.name);

  // input Surname
  const inputSurname = screen.getByLabelText(/surname/i);
  userEvent.type(inputSurname, mockUser.surname);
  expect(inputSurname).toHaveValue(mockUser.surname);

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
  mockedSignUp.mockResolvedValueOnce({
    user: {
      id: 'mockId',
      name: mockUser.name,
      surname: mockUser.surname,
      email: mockUser.email,
    },
    token: 'mockToken',
  });
  userEvent.click(submitButton);
  expect(mockedSignUp).toHaveBeenCalledTimes(1);
});
