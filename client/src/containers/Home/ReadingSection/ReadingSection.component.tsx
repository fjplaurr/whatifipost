import React, { useState, useEffect, useContext } from 'react';
import style from './ReadingSection.module.scss';
import PostCard from '../../../components/PostCard';
import { Post } from '../../../interfaces/Post';
import { UserContext } from '../../App';
import { useUserFetch } from '../../../endpoints/user';
import ProfileHeader from './ProfileHeader';

const ReadingSection = () => {
  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  // State
  const [posts, setPosts] = useState<Post[]>([]);

  // Endpoints
  const { getOwnAndOthersPosts, getUsersPosts } = useUserFetch();

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
        Post[] = await getOwnAndOthersPosts(contextUser.user!._id!);
      // Parse each date string to Date type
      setPosts([...parseDate(allposts)]);
    };
    const getPostsFromOneUser = async () => {
      const usersPosts:
        Post[] = await getUsersPosts(contextUser.watchingOtherProfileId);
      // Parse each date string to Date type
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
