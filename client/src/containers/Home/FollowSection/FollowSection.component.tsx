/* eslint-disable no-return-await */
import React, {
  useState, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileCard from '../../../components/ProfileCard';
import styles from './FollowSection.module.scss';
import { useUserFetch } from '../../../endpoints';
import { User } from '../../../interfaces';
import { setFollowing, RootState } from '../../../context/redux';
import { useFollow } from '../../../hooks';

const FollowSection = () => {
  // Global state
  const user = useSelector((state: RootState) => state.user.user);
  const following = useSelector((state: RootState) => state.user.following);
  const dispatch = useDispatch();

  // Hooks
  const { handleFollow, handleUnfollow } = useFollow();

  // Local State
  const [followingTabActive, setFollowingTabActive] = useState(true);
  const [followersTabActive, setFollowersTabActive] = useState(false);
  const [followers, setFollowers] = useState<User[]>([]);

  // Endpoints
  const { getFollowingAndFollowers } = useUserFetch();

  // Loads following users after first render
  useEffect(() => {
    async function fetchAndSet() {
      const pFollowingAndFollowers = await getFollowingAndFollowers(user?._id!);
      // setFollowing(pFollowingAndFollowers.following);
      setFollowers(pFollowingAndFollowers.followers);
      dispatch(setFollowing(pFollowingAndFollowers.following));
    }
    if (!following.length && !followers.length) {
      fetchAndSet();
    }
  }, []);

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

  const followingList = following?.map((followingUser: User) => (
    <div
      key={followingUser._id}
      className={styles.targetWrapper}
    >
      <ProfileCard
        description={followingUser.description}
        name={followingUser.name}
        surname={followingUser.surname}
        id={followingUser._id!}
        picture={followingUser.profileImage}
        onClick={(e: any) => handleUnfollow(e, followingUser)}
        textButton="Unfollow"
        colorButton="red"
      />
    </div>
  ));

  const followersList = followers?.map((follower) => {
    const usersFollowing = user?.following;
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
            onClick={(e: any) => handleUnfollow(e, follower)}
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
          onClick={(e: any) => handleFollow(e, follower)}
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
