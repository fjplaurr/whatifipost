import React from 'react';
import styles from './PostCard.module.scss';
import profileImage from '../../assets/images/profileImage.png';

type PostCardProps = {
  name: string,
  message: string,
  pictureUrl?: string,
  surname: string,
}

const PostCard = ({
  name, surname, message = '', pictureUrl = profileImage,
}: PostCardProps) => (
  <div className={styles.container}>
    <div
      className={styles.imageWrapper}
      style={{ backgroundImage: `url(${pictureUrl})` }}
    />
    <div className={styles.nameMessageWrapper}>
      <div className={styles.nameWrapper}>
        <p className={styles.name}>
          {`${name} ${surname}`}
        </p>
      </div>
      <p className={styles.message}>
        {message}
      </p>
    </div>
  </div>
);

export default PostCard;
