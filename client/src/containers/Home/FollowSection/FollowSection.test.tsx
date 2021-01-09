import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender, defaultProviderProps } from '../../../test/react-all-providers';
import Followsection from './FollowSection.component';
import { getFollowing, getFollowers, update } from '../../../endpoints/user';

const followingUsers = [
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
];

const followers = [
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

// Mocks auth module
jest.mock('../../../endpoints/user');
const mockedGetFollowing = getFollowing as any;
const mockedGetFollowers = getFollowers as any;
const mockedUpdate = update as any;

test('It renders correctly', async () => {
  // Renders first time with following tab active
  mockedGetFollowing.mockResolvedValueOnce(followingUsers);
  mockedGetFollowers.mockResolvedValueOnce(followers);
  customRender(<Followsection />);
  await waitFor(() => expect(mockedGetFollowing).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(mockedGetFollowers).toHaveBeenCalledTimes(1));
  expect(await screen.findByText(`${followingUsers[0].name} ${followingUsers[0].surname}`)).toBeInTheDocument();

  // Renders followers tab
  const followersButton = await screen.findByRole('button', { name: /followers/i });
  userEvent.click(followersButton);
  expect(screen.queryByText(`${followingUsers[0].name} ${followingUsers[0].surname}`)).not.toBeInTheDocument();

  // Comes back to following tab
  const followingButton = await screen.findByRole('button', { name: /following/i });
  userEvent.click(followingButton);
  expect(await screen.findByText(`${followingUsers[0].name} ${followingUsers[0].surname}`)).toBeInTheDocument();
});

test('Follow and unfollow users', async () => {
  // Renders first time with following tab active
  mockedGetFollowing.mockResolvedValueOnce(followingUsers);
  mockedGetFollowers.mockResolvedValueOnce(followers);
  customRender(<Followsection />);

  // Unfollow a user
  const unfollowButton = await screen.findByRole('button', { name: /unfollow/i });
  userEvent.click(unfollowButton);
  await waitFor(() => expect(mockedUpdate).toHaveBeenCalledTimes(2));
  await waitFor(() => expect(defaultProviderProps.value.setUser).toHaveBeenCalledTimes(1));

  // Click followers tab and follow a user
  const followersButton = await screen.findByRole('button', { name: /followers/i });
  userEvent.click(followersButton);
  const followButton = await screen.findByRole('button', { name: 'Follow' });
  mockedUpdate.mockClear();
  defaultProviderProps.value.setUser.mockClear();
  userEvent.click(followButton);
  await waitFor(() => expect(mockedUpdate).toHaveBeenCalledTimes(2));
  await waitFor(() => expect(defaultProviderProps.value.setUser).toHaveBeenCalledTimes(1));
});
