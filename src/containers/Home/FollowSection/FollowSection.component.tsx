import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';
import ProfileCard from '../../../components/ProfileCard';
import styles from './FollowSection.module.scss';
import * as userEndpoints from '../../../endpoints/user';
import { User } from '../../../interfaces';
import { UserContext } from '../../App';

const FollowSection = () => {
  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  const [followingTabActive, setFollowingTabActive] = useState(true);
  const [followersTabActive, setFollowersTabActive] = useState(false);
  const [following, setFollowing] = useState<{ user: User }[]>([]);
  const [followers, setFollowers] = useState<{ user: User }[]>([]);

  // Loads followed users from database
  const loadFollowing = useCallback(async () => {
    const data = await userEndpoints.getFollowing(contextUser.user?._id!);
    data && setFollowing(data);
  },
  [contextUser.user]);

  // Loads followers from database
  const loadFollowers = useCallback(async () => {
    const data = await userEndpoints.getFollowers(contextUser.user?._id!);
    data && setFollowers(data);
  },
  [contextUser.user]);

  // Loads followed users and followers after first render
  useEffect(() => {
    loadFollowing();
    loadFollowers();
  }, [contextUser.user, loadFollowing, loadFollowers]);

  const tabFollowingClick = () => {
    if (!followingTabActive) {
      setFollowingTabActive(true);
      setFollowersTabActive(false);
    }
  };

  const tabFollowersClick = () => {
    if (!followersTabActive) {
      setFollowersTabActive(true);
      setFollowingTabActive(false);
    }
  };

  const handleUnfollow = (event: React.MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const updateFollowing = async () => {
      const followingModified = contextUser.user!.following!
        .filter((el: { user: string }) => el.user !== clickedUser._id);
      const modifiedUser: User = { ...contextUser.user!, following: followingModified };
      // Modify user in context
      await contextUser.setUser(modifiedUser);
      // Modify list of followed users in database
      await userEndpoints.update(modifiedUser);
    };

    const updateFollowers = async () => {
      const followersModified = clickedUser.followers!
        .filter((el: { user: string }) => el.user !== contextUser.user!._id);
      const modifiedUser: User = { ...clickedUser!, followers: followersModified };
      // Modify list of followers in database
      await userEndpoints.update(modifiedUser);
    };
    updateFollowing();
    updateFollowers();
    // Loads followed users
    loadFollowing();
  };

  const handleFollow = async (event: React.MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const updateFollowing = async () => {
      const contextUserCopy: User = { ...contextUser!.user! };
      contextUserCopy.following!.push({ user: clickedUser._id! });
      // Modify user in context
      await contextUser.setUser(contextUserCopy);
      // Modify list of followed users in database
      await userEndpoints.update(contextUserCopy);
      // Loads followed users
      loadFollowing();
    };
    const updateFollowers = async () => {
      const clickedUserCopy: User = { ...clickedUser };
      clickedUserCopy.followers!.push({ user: contextUser!.user!._id! });
      // Modify list of followers in database
      await userEndpoints.update(clickedUserCopy);
    };
    await updateFollowing();
    await updateFollowers();
    loadFollowing();
  };

  const followingList = following.map((data) => {
    const { user } = data;
    return (
      <div
        key={user._id}
        className={styles.targetWrapper}
      >
        <ProfileCard
          description={user.description}
          name={user.name}
          surname={user.surname}
          id={user._id!}
          picture={user.profileImage}
          onClick={(e) => handleUnfollow(e, user)}
          textButton="Unfollow"
          colorButton="red"
        />
      </div>
    );
  });

  const followersList = followers.map((data) => {
    const { user: follower } = data;
    const usersFollowing = contextUser.user?.following;
    const allUserIds = usersFollowing?.map((element: { user: string }) => element.user);
    const isFollowing = allUserIds?.includes(follower._id!);
    if (isFollowing) {
      return (
        <div
          key={follower._id}
          className={styles.targetWrapper}
        >
          <ProfileCard
            description={follower.description}
            name={follower.name}
            surname={follower.surname}
            picture={follower.profileImage}
            id={follower._id!}
            onClick={(e) => handleUnfollow(e, follower)}
            textButton="Unfollow"
            colorButton="red"
          />
        </div>
      );
    }
    return (
      <div
        key={follower._id}
        className={styles.targetWrapper}
      >
        <ProfileCard
          description={follower.description}
          name={follower.name}
          surname={follower.surname}
          picture={follower.profileImage}
          id={follower._id!}
          onClick={(e) => handleFollow(e, follower)}
          textButton="Follow"
          colorButton="blue"
        />
      </div>
    );
  });

  return (
    <section className={styles.followSection}>
      <div className={styles.tabList}>
        <button
          onClick={tabFollowingClick}
          className={followingTabActive ? styles.activeTab : styles.notActiveTab}
        >
          Following
        </button>
        <button
          onClick={tabFollowersClick}
          className={followersTabActive ? styles.activeTab : styles.notActiveTab}
        >
          Followers
        </button>
      </div>
      {followingTabActive && followingList}
      {followersTabActive && followersList}
    </section>
  );
};

export default FollowSection;
