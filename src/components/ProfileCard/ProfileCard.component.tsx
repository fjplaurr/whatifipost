import React from 'react';
import styles from './ProfileCard.module.scss';
import Button from '../Button';
import profileImage from '../../assets/images/profileImage.png';

type ProfileCardProps = {
  name: string,
  description?: string,
  pictureUrl?: string,
  surname: string,
  textButton: string,
  colorButton: 'blue' | 'red';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const ProfileCard = ({
  name, surname, description = '', pictureUrl = profileImage, onClick, textButton, colorButton,
}: ProfileCardProps) => (
  <div className={styles.container}>
    <div
      className={styles.imageWrapper}
      style={{ backgroundImage: `url(${pictureUrl})` }}
    />
    <div className={styles.nameDescriptionWrapper}>
      <p className={styles.name}>
        {`${name} ${surname}`}
      </p>
      <p className={styles.description}>
        {description}
      </p>
    </div>
    <div
      className={styles.buttonWrapper}
    >
      <Button
        text={textButton}
        color={colorButton}
        onClick={onClick}
      />
    </div>
  </div>
);

export default ProfileCard;
