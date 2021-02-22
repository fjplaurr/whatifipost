import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PostCard.module.scss';
import profileImage from '../../assets/images/profileImage.png';
import { getTimeInterval } from '../../helpers/functions';
import { setWatchingOtherProfileId, RootState } from '../../context/redux';

type PostCardProps = {
  name: string,
  message: string,
  picture?: string,
  surname: string,
  last: boolean,
  timestamp: Date,
  authorId?: string,
}

const PostCard = React.memo(({
  name, surname, message = '', picture, last, timestamp, authorId,
}: PostCardProps) => {
  // Global state
  const watchingOtherProfileId = useSelector(
    (state: RootState) => state.user.watchingOtherProfileId,
  );
  const dispatch = useDispatch();
  if (watchingOtherProfileId) {
    return (
      <div className={last ? styles.lastContainer : styles.container}>
        <div className={styles.messageAndTimestampWrapper}>
          <p className={styles.message}>{message}</p>
          <p className={styles.time}>{getTimeInterval(timestamp)}</p>
        </div>
      </div>
    );
  }

  const handleClickOnUser = () => {
    authorId && dispatch(setWatchingOtherProfileId(authorId));
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
          <p className={styles.name}>{`${name} ${surname}`}</p>
          <p className={styles.time}>{getTimeInterval(timestamp)}</p>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
});

export default PostCard;
