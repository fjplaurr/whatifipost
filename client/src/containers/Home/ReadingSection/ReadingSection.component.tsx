import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './ReadingSection.module.scss';
import PostCard from '../../../components/PostCard';
import { Post } from '../../../interfaces/Post';
import { useUserFetch } from '../../../endpoints';
import ProfileHeader from './ProfileHeader';
import { RootState, setPosts } from '../../../context/redux';

const ReadingSection = () => {
  // Global state
  const watchingOtherProfileId = useSelector(
    (state: RootState) => state.user.watchingOtherProfileId,
  );
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const user = useSelector((state: RootState) => state.user.user);
  const following = useSelector((state: RootState) => state.user.following);

  // Endpoints
  const { getOwnAndOthersPosts, getUsersPosts } = useUserFetch();

  // Loops an array of posts and transforms every string date into Date type
  const parseDate = React.useCallback((arr: Post[]) => {
    const arrCopy = [...arr];
    arrCopy.forEach((post, index) => {
      const postCopy = { ...post };
      postCopy.date = new Date(post.date);
      arrCopy[index] = postCopy;
    });
    return arrCopy;
  }, []);

  useEffect(() => {
    const getAllPosts = async () => {
      const allposts: Post[] = await getOwnAndOthersPosts(user!._id!);
      // Parse each date string to Date type
      dispatch(setPosts([...parseDate(allposts)]));
    };
    const getPostsFromOneUser = async () => {
      const usersPosts: Post[] = await getUsersPosts(watchingOtherProfileId);
      // Parse each date string to Date type
      dispatch(setPosts([...parseDate(usersPosts)]));
    };
    watchingOtherProfileId ? getPostsFromOneUser() : getAllPosts();
  }, [following]);

  const friendsPosts = posts.map((post: Post, index: number) => {
    if (watchingOtherProfileId) {
      return (
        <React.Fragment key={post.date.getTime()}>
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
      <React.Fragment key={post.date.getTime()}>
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

  return (
    <section className={style.readingSection} data-testid="readingSection">
      {watchingOtherProfileId ? (
        <>
          <ProfileHeader userId={watchingOtherProfileId} />
          {friendsPosts}
        </>
      )
        : friendsPosts}
    </section>
  );
};

export default ReadingSection;
