/* eslint-disable no-return-await */
import React, {
  useState, useEffect, useContext,
} from 'react';
import ProfileCard from '../../../components/ProfileCard';
import styles from './FollowSection.module.scss';
import { useUserFetch } from '../../../endpoints/user';
import { User } from '../../../interfaces';
import { UserContext } from '../../App';

const FollowSection = () => {
  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  // State
  const [followingTabActive, setFollowingTabActive] = useState(true);
  const [followersTabActive, setFollowersTabActive] = useState(false);
  const [following, setFollowing] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);

  // Endpoints
  const { getFollowingAndFollowers, update } = useUserFetch();

  // // Loads followers after first render
  // useEffect(() => {
  //   async function fetchAndSet() {
  //     const pFollowers = await getFollowers(contextUser.user?._id!);
  //     setFollowers(pFollowers);
  //   }
  //   fetchAndSet();
  //   // eslint-disable-next-line
  // }, [contextUser.user?.followers?.length]);

  // Loads following users after first render
  useEffect(() => {
    async function fetchAndSet() {
      const pFollowingAndFollowers = await getFollowingAndFollowers(contextUser.user?._id!);
      setFollowing(pFollowingAndFollowers.following);
      setFollowers(pFollowingAndFollowers.followers);
    }
    fetchAndSet();
    // eslint-disable-next-line
  }, [contextUser.user?.following?.length, contextUser.user?.followers?.length]);

  // Set following tab active
  const tabFollowingClick = () => {
    if (!followingTabActive) {
      setFollowingTabActive(true);
      setFollowersTabActive(false);
    }
  };

  // Set followers tab active
  const tabFollowersClick = () => {
    if (!followersTabActive) {
      setFollowersTabActive(true);
      setFollowingTabActive(false);
    }
  };

  const handleUnfollow = (event: React.MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const updateFollowing = async () => {
      const followingModified = contextUser.user!.following!
        .filter((el: string) => el !== clickedUser._id);
      const modifiedUser: User = { ...contextUser.user!, following: followingModified };
      // Modify list of followed users in database
      await update(modifiedUser);
      // Modify user in context
      contextUser.setUser(modifiedUser);
    };
    const updateFollowers = async () => {
      const followersModified = clickedUser.followers!
        .filter((el: string) => el !== contextUser.user!._id);
      const modifiedUser: User = { ...clickedUser!, followers: followersModified };
      // Modify list of followers in database
      await update(modifiedUser);
    };
    updateFollowing();
    updateFollowers();
  };

  const handleFollow = async (event: React.MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const updateFollowing = async () => {
      const contextUserCopy: User = { ...contextUser!.user! };
      contextUserCopy.following!.push(clickedUser._id!);
      // Modify list of followed users in database
      await update(contextUserCopy);
      // Modify user in context
      contextUser.setUser(contextUserCopy);
    };
    const updateFollowers = async () => {
      const clickedUserCopy: User = { ...clickedUser };
      clickedUserCopy.followers!.push(contextUser!.user!._id!);
      // Modify list of followers in database
      await update(clickedUserCopy);
    };
    await updateFollowing();
    await updateFollowers();
  };

  const followingList = following.map((user) => (
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
  ));

  const followersList = followers.map((follower) => {
    const usersFollowing = contextUser.user?.following;
    const isFollowing = usersFollowing?.includes(follower._id!);
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
    <section data-testid="followersSection" className={styles.followSection}>
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
