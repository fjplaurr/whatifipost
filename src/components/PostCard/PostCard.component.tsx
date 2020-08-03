import React, { useContext } from 'react';
import styles from './PostCard.module.scss';
import profileImage from '../../assets/images/profileImage.png';
import { UserContext } from '../../containers/App';
import { getTimeInterval } from '../../helpers/functions';

type PostCardProps = {
  name: string,
  message: string,
  picture?: string,
  surname: string,
  last: boolean,
  timestamp: Date,
  authorId?: string,
}

const PostCard = ({
  name, surname, message = '', picture, last, timestamp, authorId,
}: PostCardProps) => {
  const contextUser = useContext(UserContext);
  if (contextUser.watchingOtherProfileId) {
    return (
      <div className={last ? styles.lastContainer : styles.container}>
        <div className={styles.nameMessageWrapperSeeingProfile}>
          <p className={styles.message}>
            {message}
          </p>
        </div>
      </div>
    );
  }

  const handleClickOnUser = () => {
    authorId && contextUser.setWatchingOtherProfileId(authorId);
  };

  return (
    <div className={last ? styles.lastContainer : styles.container}>
      <button
        onClick={handleClickOnUser}
        type="button"
        className={styles.buttonImageWrapper}
      >
        <div
          className={styles.imageWrapper}
          style={{ backgroundImage: picture ? `url(${picture})` : `url(${profileImage})` }}
        />
      </button>
      <div className={styles.nameMessageWrapper}>
        <div className={styles.nameAndTimestampWrapper}>
          <p className={styles.name}>
            {`${name} ${surname}`}
          </p>
          <p className={styles.time}>{getTimeInterval(timestamp)}</p>
        </div>
        <p className={styles.message}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
