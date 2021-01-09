import React from 'react';
import { screen } from '@testing-library/react';
import ConfigureProfile from './ConfigureProfile.component';
import { mockUser, customRender } from '../../../test/react-context';

test('ConfigureProfile container shows user description', () => {
  customRender(<ConfigureProfile />);
  expect(screen.getByRole('textbox')).toHaveTextContent(mockUser.description);
});
