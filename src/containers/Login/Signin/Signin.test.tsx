import React from 'react';
import { render, fireEvent, getByLabelText, getByText, getByRole } from '@testing-library/react';
import Signin from './Signin.component';

const renderContainer = () => {
  const utils = render(<Signin />);
  const container: HTMLElement = utils.getByTestId('signinContainer');
  return container;
};

test('elements are rendered', () => {
  const container = renderContainer();
  expect(container).toHaveTextContent('Email');
  expect(container).toHaveTextContent('Password');
  expect(container).toHaveTextContent('Sign in');
});

test('allows user to fill the inputs', () => {
  const container = renderContainer();

  // input Email
  let input = getByLabelText(container, 'Email');
  fireEvent.change(input, { target: { value: 'mockEmail' } });
  expect(input).toHaveValue('mockEmail');

  // input Password
  input = getByLabelText(container, 'Password');
  fireEvent.change(input, { target: { value: 'mockPassword' } });
  expect(input).toHaveValue('mockPassword');
});
