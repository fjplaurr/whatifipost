import React, { useState, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './PostSection.module.scss';
import Button from '../../../components/Button';
import { Post } from '../../../interfaces';
import { UserContext } from '../../App';
import { create } from '../../../endpoints/post';

const PostSection = () => {
  const [post, setPost] = useState('');
  const onChangeTextHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setPost(event.target.value);
  };
  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  // Function triggered when sending a post
  const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
    setPost('');
    contextUser.setIsPosting(true);
    event.preventDefault();
    const newPost: Post = {
      author: contextUser.user!,
      date: new Date(),
      text: post,
    };
    const res: { post: Post } = await create(newPost);
    if (res) {
      contextUser.setIsPosting(false);
    }
  };

  return (
    <section className={styles.postSection}>
      <form
        onSubmit={handlePost}
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
