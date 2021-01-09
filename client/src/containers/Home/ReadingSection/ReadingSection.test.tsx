import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import { customRender } from '../../../test/react-all-providers';
import ReadingSection from './ReadingSection.component';
import * as userEndpoints from '../../../endpoints/user';

jest.mock('../../../endpoints/user');

const mockedGetUserPosts = userEndpoints.getUsersPosts as any;
const mockedGetOwnAndOtherPosts = userEndpoints.getOwnAndOthersPosts as any;

const mockUser = {
  _id: 'menelao',
  email: 'mockEmail1@mockEmail1.mockEmail1',
  password: 'mockPassword1',
  name: 'mockName1',
  surname: 'mockSurname1',
  description: 'mockDescription1',
  following: [
    'mockId2',
  ],
  followers: ['mockId3'],
};

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

const mockPosts = [{
  _id: 'mockPost',
  text: 'mocking a post',
  date: new Date(2020, 1, 1),
  author: followingUsers[0],
}];

const providerPropsWatchingOneProfile = {
  value: {
    user: mockUser,
    isConfiguringProfile: false,
    isPosting: false,
    isSearching: false,
    watchingOtherProfileId: followingUsers[0]._id,
    setIsConfiguringProfile: jest.fn(),
    setIsPosting: jest.fn(),
    setIsSearching: jest.fn(),
    setUser: jest.fn(),
    setWatchingOtherProfileId: jest.fn(),
  },
};

const providerPropsNotWatchingOneProfile = {
  value: {
    ...providerPropsWatchingOneProfile.value,
    watchingOtherProfileId: '',
  },
};

test('User seeing posts from one user', async () => {
  mockedGetUserPosts.mockResolvedValueOnce(mockPosts);
  customRender(<ReadingSection />, { providerProps: providerPropsWatchingOneProfile });
  await waitFor(() => expect(mockedGetUserPosts).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(mockedGetOwnAndOtherPosts).toHaveBeenCalledTimes(0));
  expect(await screen.findByText('mocking a post')).toBeInTheDocument();
});

test('User seeing posts from all users', async () => {
  mockedGetOwnAndOtherPosts.mockResolvedValueOnce(mockPosts);
  customRender(<ReadingSection />, { providerProps: providerPropsNotWatchingOneProfile });
  await waitFor(() => expect(mockedGetUserPosts).toHaveBeenCalledTimes(0));
  await waitFor(() => expect(mockedGetOwnAndOtherPosts).toHaveBeenCalledTimes(1));
  expect(await screen.findByText('mocking a post')).toBeInTheDocument();
});
