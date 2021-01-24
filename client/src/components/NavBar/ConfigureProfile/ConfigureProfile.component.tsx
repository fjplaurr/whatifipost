import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { FiUser } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import { useHistory } from 'react-router-dom';
import styles from './ConfigureProfile.module.scss';
import { UserContext } from '../../../containers/App';
import profileImage from '../../../assets/images/profileImage.png';
import { User } from '../../../interfaces/User';
import { useUserFetch } from '../../../endpoints/user';
import { useUploadFetch } from '../../../endpoints/upload';
import Button from '../../Button';
import { removeUser } from '../../../helpers/localStorage';

const ConfigureProfile = () => {
  const [description, setDescription] = useState<string | undefined>('');

  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  // Ref for the profile configuration window
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Ref for the input to select picture
  const pictureRef = useRef<HTMLInputElement>(null);

  const { update } = useUserFetch();
  const { postPicture } = useUploadFetch();

  const history = useHistory();

  // Closes the profile configuration window if the user clicks outside
  useEffect(() => {
    // Detects if clicked on outside of element
    const handleClickOutside = (event: MouseEvent) => {
      // If the clickedElement is not in the wrapper then close the wrapper if it's opened.
      // We know it's opened whhen the user isConfiguring
      if (!contextUser.isConfiguringProfile) {
        return;
      }
      const wrapper = wrapperRef.current;
      const clickedElement = event.target;
      if (wrapper && !wrapper.contains(clickedElement as Node)) {
        // The user is not configuring the profile anymore
        contextUser.setIsConfiguringProfile(false);
        // Updates description in database
        const modifiedUser: User = { ...contextUser.user!, description };
        // Updates description in database
        update(modifiedUser);
        // Updates description in context user
        contextUser.setUser(modifiedUser);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, contextUser.isConfiguringProfile]);

  const handleDescriptionChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setDescription(event.target.value);
  };

  const handleChangePicture = async () => {
    const file: File = pictureRef?.current?.files![0]!;
    const response: { location?: string } = await postPicture(file!);
    if (response.location) {
      const modifUser: User = { ...contextUser.user!, profileImage: response.location };
      // Updates profile image url in database
      update(modifUser);
      // Updates profile image url in context user
      contextUser.setUser(modifUser);
    }
  };

  const imagePicker = (
    <>
      <button
        className={styles.imageButton}
        type="button"
        onClick={() => pictureRef?.current?.click()}
      >
        <img
          className={styles.imageWrapper}
          src={contextUser?.user?.profileImage || profileImage}
          alt="Profile"
        />
        <span className={styles.changeImageText}>Change Profile Photo</span>
      </button>
      <input
        className={styles.hiddenInput}
        accept=".png, .jpg, .jpeg"
        type="file"
        ref={pictureRef}
        onChange={handleChangePicture}
      />
    </>
  );

  const handleClick = () => {
    // The user is configuring the profile
    contextUser.setIsConfiguringProfile(true);
  };

  const handleLogout = () => {
    removeUser();
    contextUser.setUser(undefined);
    contextUser.setIsConfiguringProfile(false);
    history.push('/');
  };

  const configurationForm = (
    <>
      <div className={styles.wrapper}>
        <TextareaAutosize
          className={styles.textArea}
          id="descriptionInput"
          defaultValue={contextUser?.user?.description || 'What is going on?'}
          onChange={handleDescriptionChange}
          maxLength={100}
        />
        <div className={styles.logoutButtonWrapper}>
          <Button
            onClick={handleLogout}
            backgroundFull
            text="Logout"
            color="darkWhite"
            type="submit"
            small
          />
        </div>
      </div>
    </>
  );

  const imageButton = (
    <button
      className={styles.iconButton}
      onClick={handleClick}
      data-testid="profile-button"
    >
      {
        contextUser?.user?.profileImage ? (
          <img
            className={styles.smallImageWrapper}
            src={contextUser?.user?.profileImage || profileImage}
            alt="Profile"
          />
        )
          : <FiUser className={styles.profileIcon} />
      }
    </button>
  );

  return (
    <div className={styles.configureProfileContainer}>
      {imageButton}
      <div
        ref={wrapperRef}
        className={
          contextUser.isConfiguringProfile
            ? styles.configurationTargetShow : styles.configurationTargetHide
        }
      >
        {imagePicker}
        {configurationForm}
      </div>
    </div>
  );
};

export default ConfigureProfile;
