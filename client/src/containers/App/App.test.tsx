import React from 'react';
import { render } from '@testing-library/react';
import { App } from '.';
import { getSingle } from '../../endpoints/user';

jest.mock('../../endpoints/user');
const mockGetSingle = getSingle as any;

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => JSON.stringify({ id: 'mockedKey' })),
      setItem: jest.fn(),
    },
    writable: true,
  });
});

test('Gets user from localStorage', () => {
  render(<App />);
  expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  expect(mockGetSingle).toHaveBeenCalledTimes(1);
});
