import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSelector, useDispatch } from 'react-redux';
import styles from './PostSection.module.scss';
import Button from '../../../components/Button';
import { Post } from '../../../interfaces';
import { usePostFetch } from '../../../endpoints';
import { addPost, RootState } from '../../../context/redux';

const PostSection = () => {
  // Global state
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  // Local state
  const [post, setPost] = useState('');
  const onChangeTextHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setPost(event.target.value);
  };

  // Endpoints
  const { create } = usePostFetch();

  // Function triggered when sending a post
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setPost('');
    event.preventDefault();
    let newPost: Post = {
      author: user!,
      date: new Date(),
      text: post,
    };
    const postReturned = await create(newPost);
    newPost = { ...newPost, _id: postReturned._id };
    dispatch(addPost(newPost));
  };

  return (
    <section className={styles.postSection}>
      <form
        onSubmit={handleSubmit}
        className={styles.container}
      >
        <TextareaAutosize
          placeholder="What do you want to write?"
          className={styles.textArea}
          required
          onChange={onChangeTextHandler}
          value={post}
          maxLength={300}
        />
        <div className={styles.buttonWrapper}>
          <Button
            backgroundFull
            text="Post"
            color="blue"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default PostSection;
