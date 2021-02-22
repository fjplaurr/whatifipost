import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ProfileHeader.module.scss';
import { User } from '../../../../interfaces/User';
import { useUserFetch } from '../../../../endpoints';
import profileImage from '../../../../assets/images/profileImage.png';
import { setWatchingOtherProfileId } from '../../../../context/redux';

type ProfileHeaderProps = {
  userId: string,
}

const ProfileHeader = ({ userId }: ProfileHeaderProps) => {
  // Global state
  const dispatch = useDispatch();

  // Local State
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
    dispatch(setWatchingOtherProfileId(''));
  };

  return (
    <>
      <div className={style.profileHeaderWrapper}>
        <button
          type="button"
          onClick={stopWatchingProfile}
          className={style.backArrowButton}
        >
          <FontAwesomeIcon className={style.backArrow} icon={faArrowLeft} size="3x" />
        </button>
        <div
          className={style.imageWrapper}
          style={{
            backgroundImage: user?.profileImage ? `url(${user?.profileImage})` : `url(${profileImage})`,
          }}
        />
        <div className={style.container}>
          <p className={style.nameWhatTheFuck}>{`${user?.name} ${user?.surname}`}</p>
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
