import React, { useState, useEffect, useContext } from 'react';
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
  async function loadFollowing() {
    const data = await userEndpoints.getFollowing(contextUser.user?._id!);
    data && setFollowing(data);
  }

  // Loads followers from database
  async function loadFollowers() {
    const data = await userEndpoints.getFollowers(contextUser.user?._id!);
    data && setFollowers(data);
  }

  // Loads followed users and followers after first render
  useEffect(() => {
    loadFollowing();
    loadFollowers();
  }, [contextUser.user]);

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

  const unfollowUser = async (event: React.MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const { user: currentUser } = contextUser;
    const followingModified = currentUser!.following!.filter((el) => el.user !== clickedUser._id);
    const modifiedUser: User = { ...currentUser!, following: followingModified };
    // Modify user in context
    await contextUser.setUser(modifiedUser);
    // Modify list of followed users in database
    await userEndpoints.update(modifiedUser);
    // Loads followed users
    loadFollowing();
  };

  const followUser = async (event: React.MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const contextUserCopy: User = { ...contextUser!.user! };
    contextUserCopy.following!.push({ user: clickedUser._id! });
    // Modify user in context
    await contextUser.setUser(contextUserCopy);
    // Modify list of followed users in database
    await userEndpoints.update(contextUserCopy);
    // Loads followed users
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
          pictureUrl={user.profileImage?.url}
          onClick={(e) => unfollowUser(e, user)}
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
            pictureUrl={follower.profileImage?.url}
            onClick={(e) => unfollowUser(e, follower)}
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
          pictureUrl={follower.profileImage?.url}
          onClick={(e) => followUser(e, follower)}
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
