import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender, defaultProviderProps } from '../../../test/react-all-providers';
import PostSection from './PostSection.component';
import { create } from '../../../endpoints/post';

jest.mock('../../../endpoints/post');
const mockedCreate = create as any;

const mockPost = {
  _id: 'mockPost',
  text: 'mocking a post',
  date: new Date(2021, 1, 5),
};

const post = 'This is a new mocked post';

test('Write and send a post', async () => {
  customRender(<PostSection />);
  // Write a post
  const textArea = screen.getByPlaceholderText(/what do you want to write?/i);
  userEvent.type(textArea, post);
  expect(textArea).toHaveTextContent(post);

  // Send the post
  const button = screen.getByRole('button');
  mockedCreate.mockResolvedValueOnce(mockPost);
  userEvent.click(button);
  await waitFor(() => expect(mockedCreate).toHaveBeenCalledTimes(1));
  expect(defaultProviderProps.value.setIsPosting).toHaveBeenCalledTimes(2);
});
