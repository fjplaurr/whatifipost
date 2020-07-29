import React, { useState, useContext } from 'react';
import styles from './PostSection.module.scss';
import Button from '../../../components/Button';
import { Post } from '../../../interfaces';
import { UserContext } from '../../App';
import * as postEndpoints from '../../../endpoints/post';

const PostSection = () => {
  const [post, setPost] = useState('');
  const onChangeTextHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setPost(event.target.value);
  };
  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  // Function triggered when submiting sign up
  const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
    setPost('');
    event.preventDefault();
    const newPost: Post = {
      author: contextUser.user!,
      date: new Date(),
      text: post,
    };
    const res: { post: Post } = await postEndpoints.create(newPost);
    if (res) {
      // Reloads reading section TODO
    }
  };

  return (
    <section className={styles.postSection}>
      <form
        onSubmit={handlePost}
        className={styles.container}
      >
        <textarea
          placeholder="What do you want to write?"
          className={styles.textArea}
          required
          onChange={onChangeTextHandler}
          value={post}
          maxLength={200}
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
    </section >
  );
};

export default PostSection;
