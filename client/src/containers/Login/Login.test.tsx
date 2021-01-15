import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from './Login.component';

test('Renders correctly', () => {
  render(<Login />);
  expect(screen.getByRole('button', { name: /join/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});
