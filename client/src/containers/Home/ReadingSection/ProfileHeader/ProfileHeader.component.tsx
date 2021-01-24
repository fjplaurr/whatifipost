import React, { useState, useEffect, useContext } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import style from './ProfileHeader.module.scss';
import { User } from '../../../../interfaces/User';
import { useUserFetch } from '../../../../endpoints/user';
import profileImage from '../../../../assets/images/profileImage.png';
import { UserContext } from '../../../App';

type ProfileHeaderProps = {
  userId: string,
}

const ProfileHeader = ({ userId }: ProfileHeaderProps) => {
  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  // State
  const [user, setUser] = useState<User>();

  // Endpoints
  const { getSingle } = useUserFetch();

  // Reads user from database
  useEffect(() => {
    const getUser = async () => {
      const userFromDB = await getSingle(userId);
      setUser(userFromDB);
    };
    getUser();
  }, [userId]);

  // stops watching a particular profile and comes back to see posts from all followed users
  const stopWatchingProfile = () => {
    contextUser.setWatchingOtherProfileId('');
  };

  return (
    <>
      <div className={style.profileHeaderWrapper}>
        <button
          type="button"
          onClick={stopWatchingProfile}
          className={style.backArrowButton}
        >
          <IoIosArrowRoundBack className={style.backArrow} />
        </button>
        <div
          className={style.imageWrapper}
          style={{
            backgroundImage: user?.profileImage ? `url(${user?.profileImage})` : `url(${profileImage})`,
          }}
        />
        <div className={style.container}>
          <p className={style.name}>{`${user?.name} ${user?.surname}`}</p>
          <p className={style.description}>{user?.description}</p>
          <ul className={style.infoWrapper}>
            <li className={style.listItem}>
              <span className={style.spanlistItem}>
                {user?.followers?.length}
              </span>
              {' followers'}
            </li>
            <li className={style.listItem}>
              <span className={style.spanlistItem}>
                {user?.following?.length}
              </span>
              {' following'}
            </li>
          </ul>
        </div>
      </div>
      <h1 className={style.postsHeader}>Posts</h1>
    </>
  );
};

export default ProfileHeader;
