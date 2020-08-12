import React, { useState, useEffect, useContext } from 'react';
import style from './ReadingSection.module.scss';
import PostCard from '../../../components/PostCard';
import { Post } from '../../../interfaces/Post';
import { UserContext } from '../../App';
import * as userEndpoints from '../../../endpoints/user';
import ProfileHeader from './ProfileHeader';

const ReadingSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const contextUser = useContext(UserContext);

  // Loops an array of posts and transforms every string date into Date type
  const parseDate = (arr: Post[]) => {
    const arrCopy = [...arr];
    arrCopy.forEach((post, index) => {
      const postCopy = { ...post };
      postCopy.date = new Date(post.date);
      arrCopy[index] = postCopy;
    });
    return arrCopy;
  };

  // Realoads posts from followed users every time the user
  // changes (for instance, when following/unfollowing users).
  // It also reloads when the user sends a post
  useEffect(() => {
    const getAllPosts = async () => {
      const allposts:
        Post[] = await userEndpoints.getOwnAndOthersPosts(contextUser.user!._id!);
      // Parse each date string to Date type
      allposts.forEach(post => post.date = new Date(post.date));
      setPosts(allposts);
    };
    const getPostsFromOneUser = async () => {
      const usersPosts:
        Post[] = await userEndpoints.getUsersPosts(contextUser.watchingOtherProfileId);
      // Parse each date string to Date type
      usersPosts.forEach(post => post.date = new Date(post.date));
      setPosts([...parseDate(usersPosts)]);
    };
    contextUser.watchingOtherProfileId ? getPostsFromOneUser() : getAllPosts();
  }, [contextUser]);

  const getPosts = posts.map((post: Post, index: number) => {
    if (contextUser.watchingOtherProfileId) {
      return (
        <React.Fragment key={post._id}>
          <PostCard
            name={post.author.name}
            surname={post.author.surname}
            message={post.text}
            picture={post.author.profileImage}
            last={posts.length - 1 === index}
            timestamp={post.date}
            authorId={post.author._id}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={post._id}>
        <PostCard
          name={post.author.name}
          surname={post.author.surname}
          message={post.text}
          picture={post.author.profileImage}
          last={posts.length - 1 === index}
          timestamp={post.date}
          authorId={post.author._id}
        />
      </React.Fragment>
    );
  });

  const postsFromEveryone = () => getPosts;

  const PostFromOne = () => (
    <>
      <ProfileHeader userId={contextUser.watchingOtherProfileId} />
      {getPosts}
    </>
  );

  return (
    <section className={style.readingSection}>
      {contextUser.watchingOtherProfileId ? PostFromOne() : postsFromEveryone()}
    </section>
  );
};

export default ReadingSection;
