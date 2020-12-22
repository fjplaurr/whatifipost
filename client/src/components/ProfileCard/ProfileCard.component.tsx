import React, { useContext } from 'react';
import styles from './ProfileCard.module.scss';
import Button from '../Button';
import profileImage from '../../assets/images/profileImage.png';
import { UserContext } from '../../containers/App';

type ProfileCardProps = {
  name: string,
  description?: string,
  picture?: string,
  surname: string,
  textButton?: string,
  colorButton?: 'blue' | 'red';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  backgroundFull?: boolean,
  id: string,
}

const ProfileCard = ({
  name, surname, description = '', picture, onClick, textButton, colorButton, backgroundFull, id,
}: ProfileCardProps) => {
  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  const handleClickOnUser = () => {
    contextUser.setWatchingOtherProfileId(id);
  };

  return (
    <div className={styles.container}>
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
      <div className={styles.nameDescriptionWrapper}>
        <p className={styles.name}>{`${name} ${surname}`}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.buttonWrapper}>
        {
          textButton
          && colorButton && (
            <Button
              text={textButton}
              color={colorButton}
              onClick={onClick}
              backgroundFull={backgroundFull}
            />
          )
        }
      </div>
    </div>
  );
};
export default ProfileCard;
