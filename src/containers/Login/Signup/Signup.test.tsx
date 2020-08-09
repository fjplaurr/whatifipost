import React from 'react';
import {
  render, getByLabelText, fireEvent,
} from '@testing-library/react';
import Signup from './Signup.component';

const renderContainer = () => {
  const utils = render(<Signup />);
  const container: HTMLElement = utils.getByTestId('signupContainer');
  return container;
};

test('elements are rendered', () => {
  const container = renderContainer();
  expect(container).toHaveTextContent('Name');
  expect(container).toHaveTextContent('Surname');
  expect(container).toHaveTextContent('Email');
  expect(container).toHaveTextContent('Password');
  expect(container).toHaveTextContent('Join');
});

test('allows user to fill the inputs', () => {
  const container = renderContainer();

  // input name
  let input = getByLabelText(container, 'Name');
  fireEvent.change(input, { target: { value: 'mockName' } });
  expect(input).toHaveValue('mockName');

  // input surname
  input = getByLabelText(container, 'Surname');
  fireEvent.change(input, { target: { value: 'mockSurname' } });
  expect(input).toHaveValue('mockSurname');

  // input Email
  input = getByLabelText(container, 'Email');
  fireEvent.change(input, { target: { value: 'mockEmail' } });
  expect(input).toHaveValue('mockEmail');

  // input Password
  input = getByLabelText(container, 'Password');
  fireEvent.change(input, { target: { value: 'mockPassword' } });
  expect(input).toHaveValue('mockPassword');
});
