import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '.';
import { customRender } from '../../test/react-all-providers';
import { getFilteredUsers } from '../../endpoints/user';

jest.mock('../../endpoints/user');
const mockGetFilteredUsers = getFilteredUsers as any;

const search = [
  {
    _id: 'mockId2',
    email: 'mockEmail2@mockEmail2.mockEmail2',
    password: 'mockPassword2',
    name: 'mockName2',
    surname: 'mockSurname2',
    description: 'mockDescription2',
    following: [],
    followers: ['mockId1'],
  },
  {
    _id: 'mockId3',
    email: 'mockEmail3@mockEmail3.mockEmail3',
    password: 'mockPassword3',
    name: 'mockName3',
    surname: 'mockSurname3',
    description: 'mockDescription3',
    following: ['mockId1'],
    followers: [],
  },
];

const text = 'm';

test('Inputs value and renders search results', async () => {
  mockGetFilteredUsers.mockResolvedValue(search);
  customRender(<SearchBar />);
  const textArea = screen.getByRole('textbox');
  userEvent.type(textArea, text);
  await waitFor(() => expect(mockGetFilteredUsers).toHaveBeenCalledTimes(1));
});
