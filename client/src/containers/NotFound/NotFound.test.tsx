import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from './NotFound.component';

test('Render not found', () => {
  render(<NotFound />);
  expect(screen.getByRole('heading')).toHaveTextContent(/404/i);
});
