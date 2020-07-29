import React, { useState, useEffect, useContext } from 'react';
import style from './ReadingSection.module.scss';
import PostCard from '../../../components/PostCard';
import { Post } from '../../../interfaces/Post';
import { UserContext } from '../../App';
import * as userEndpoints from '../../../endpoints/user';

const ReadingSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const contextUser = useContext(UserContext);

  // Loads posts from followed users every time the user
  // changes (for instance, when following/unfollowing users)
  useEffect(() => {
    const getPosts = async () => {
      const followedUsersPosts: Post[] = await userEndpoints.getPostsFromFollowedUsers(contextUser.user!._id!);
      const ownPosts: Post[] = await userEndpoints.getUsersPosts(contextUser.user!._id!);
      setPosts([...followedUsersPosts, ...ownPosts]);
    };
    getPosts();
  }, [contextUser.user]);

  const postsList = posts.map((post: Post) => {
    return (
      <React.Fragment key={post._id}>
        <PostCard
          name={post.author.name}
          surname={post.author.surname}
          message={post.text}
          pictureUrl={post.author.profileImage?.url}
        />
      </React.Fragment>
    );
  });

  return (
    <section className={style.readingSection}>
      {postsList}

    </section>
  );
};

export default ReadingSection;
