import React, {
  useState, useEffect, useRef,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ConfigureProfile.module.scss';
import profileImage from '../../../assets/images/profileImage.png';
import { User } from '../../../interfaces/User';
import { useUserFetch, useUploadFetch } from '../../../endpoints';
import Button from '../../Button';
import { removeUser } from '../../../helpers/localStorage';
import {
  setUser, setIsConfiguringProfile, RootState,
} from '../../../context/redux';

const ConfigureProfile = () => {
  // Global State
  const user = useSelector((state: RootState) => state.user.user);
  const isConfiguringProfile = useSelector((state: RootState) => state.user.isConfiguringProfile);
  const dispatch = useDispatch();

  const [description, setDescription] = useState<string | undefined>(user!.description);
  const [profileModified, setProfileModified] = useState(false);

  // Ref for the profile configuration window
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Ref for the input to select picture
  const pictureRef = useRef<HTMLInputElement>(null);

  const { update } = useUserFetch();
  const { postPicture } = useUploadFetch();

  // Closes the profile configuration window if the user clicks outside
  useEffect(() => {
    // Detects if clicked on outside of element
    const handleClickOutside = (event: MouseEvent) => {
      // If the clickedElement is not in the wrapper then close the wrapper if it's opened.
      // We know it's opened whhen the user isConfiguring
      if (!isConfiguringProfile) {
        return;
      }
      const element = wrapperRef.current;
      const clickedElement = event.target;
      if (element && !element.contains(clickedElement as Node)) {
        // The user is not configuring the profile anymore
        dispatch(setIsConfiguringProfile(false));

        // Updates description in RootState user
        const modifiedUser: User = { ...user!, description };
        dispatch(setUser(modifiedUser));
        if (profileModified) {
          // Updates description in database
          update(modifiedUser);
          setProfileModified(false);
        }
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, isConfiguringProfile, user, description, profileModified]);

  const handleDescriptionChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setDescription(event.target.value);
    setProfileModified(true);
  };

  const handleChangePicture = async () => {
    const file: File = pictureRef?.current?.files![0]!;
    const response: { location?: string } = await postPicture(file!);
    if (response.location) {
      const modifUser: User = { ...user!, profileImage: response.location };
      // Updates profile image url in RootState user
      dispatch(setUser(modifUser));
      setProfileModified(true);
    }
  };

  const handleClick = () => {
    // The user is configuring the profile
    dispatch(setIsConfiguringProfile(true));
  };

  const handleLogout = () => {
    dispatch(setIsConfiguringProfile(false));
    removeUser();
    dispatch(setUser(undefined));
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
          src={user?.profileImage || profileImage}
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

  const configurationForm = (
    <>
      <div className={styles.wrapper}>
        <TextareaAutosize
          className={styles.textArea}
          id="descriptionInput"
          defaultValue={user!.description}
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
        user?.profileImage ? (
          <img
            className={styles.smallImageWrapper}
            src={user?.profileImage || profileImage}
            alt="Profile"
          />
        )
          : <FontAwesomeIcon className={styles.userIcon} icon={faUser} size="2x" />
      }
    </button>
  );

  return (
    <div className={styles.configureProfileContainer}>
      {imageButton}
      <div
        ref={wrapperRef}
        className={
          isConfiguringProfile
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
