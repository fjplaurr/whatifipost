import { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUser, setFollowing, RootState, setPosts,
} from '../context/redux';
import { Post, User } from '../interfaces';
import { useUserFetch } from '../endpoints';

export default function useFollow() {
  const user = useSelector((state: RootState) => state.user.user);
  const following = useSelector((state: RootState) => state.user.following);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();

  const { update } = useUserFetch();
  const handleUnfollow = async (event: MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const updateFollowing = async () => {
      // Modify list of followed users in database
      const followingModified = user!.following!.filter((el: string) => el !== clickedUser._id);
      const modifiedUser: User = { ...user!, following: followingModified };
      await update(modifiedUser);
      // Modify user in RootState
      dispatch(setUser(modifiedUser));
      // Modify following in RootState
      const followingContextModified = following!.filter((el: User) => el._id !== clickedUser._id);
      dispatch(setFollowing(followingContextModified));
      const postsContextModified = posts!.filter((el: Post) => el.author._id !== clickedUser._id);
      dispatch(setPosts(postsContextModified));
    };

    const updateFollowers = async () => {
      const followersModified = clickedUser.followers!
        .filter((el: string) => el !== user!._id);
      const modifiedUser: User = { ...clickedUser!, followers: followersModified };
      // Modify list of followers in database
      await update(modifiedUser);
    };
    await updateFollowing();
    await updateFollowers();
  };

  const handleFollow = async (event: MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const updateFollowing = async () => {
      const contextUserCopy: User = { ...user! };
      contextUserCopy.following!.push(clickedUser._id!);
      // Modify user in RootState
      dispatch(setUser(contextUserCopy));
      // Modify list of followed users in database
      await update(contextUserCopy);
      // Modify following in RootState
      dispatch(setFollowing([...following, clickedUser]));
    };
    const updateFollowers = () => {
      const clickedUserCopy: User = { ...clickedUser };
      clickedUserCopy.followers!.push(user!._id!);
      // Modify list of followers in database
      update(clickedUserCopy);
    };
    await updateFollowing();
    updateFollowers();
  };

  return { handleFollow, handleUnfollow };
}
