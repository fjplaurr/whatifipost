import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { FiUser } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './ConfigureProfile.module.scss';
import { UserContext } from '../../../containers/App';
import profileImage from '../../../assets/images/profileImage.png';
import { User } from '../../../interfaces/User';
import * as userEndpoints from '../../../endpoints/user';
import * as uploadEndpoints from '../../../endpoints/upload';
import Button from '../../Button';

const ConfigureProfile = () => {
  const [description, setDescription] = useState<string | undefined>('');

  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  // Ref for the profile configuration window
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Ref for the input to select picture
  const pictureRef = useRef<HTMLInputElement>(null);

  // Closes the profile configuration window if the user clicks outside
  useEffect(() => {
    // Detects if clicked on outside of element
    const handleClickOutside = (event: MouseEvent) => {
      // If the event.target is not in the wrapper, it means it is another html element
      // the one that was clicked
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        contextUser.setIsConfiguringProfile(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, contextUser]);

  const handleDescriptionChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setDescription(event.target.value);
  };

  const handleChangePicture = async () => {
    const file: File = pictureRef?.current?.files![0]!;
    const response: { location?: string } = await uploadEndpoints.postPicture(file!);
    if (response.location) {
      const modifUser: User = { ...contextUser.user!, profileImage: response.location };
      // Updates profile image url in database
      userEndpoints.update(modifUser);
      // Updates profile image url in context user
      contextUser.setUser(modifUser);
    }
  };

  const onConfigurationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Updates description in database
    const modifiedUser: User = { ...contextUser.user!, description };
    // Updates description in database
    userEndpoints.update(modifiedUser);
    // Updates description in context user
    contextUser.setUser(modifiedUser);
    // Closes configuration window
    contextUser.setIsConfiguringProfile(false);
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

  // Sets if the user is writing in the search input or not
  const handleClick = () => {
    contextUser.setIsConfiguringProfile(true);
  };

  useEffect(() => {
    console.log('user is isConfiguringProfile: ')
    console.log(contextUser.isConfiguringProfile)

  }, [contextUser.isConfiguringProfile]);

  const configurationForm = (
    <>
      <form
        onSubmit={onConfigurationSubmit}
        className={styles.formWrapper}
      >
        <TextareaAutosize
          className={styles.textArea}
          id="descriptionInput"
          defaultValue={contextUser?.user?.description || 'What is going on?'}
          onChange={handleDescriptionChange}
          maxLength={100}
        />
        <div className={styles.buttonWrapper}>
          <Button
            backgroundFull
            text="Save"
            color="blue"
            type="submit"
            small
          />
        </div>
      </form>
    </>
  );

  return (
    <div className={styles.configureProfileContainer}>
      <button
        className={styles.iconButton}
        onClick={handleClick}
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
