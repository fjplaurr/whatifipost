import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { FiUser } from 'react-icons/fi';
import styles from './ConfigureProfile.module.scss';
import { UserContext } from '../../../containers/App';
import profileImage from '../../../assets/images/profileImage.png';
import { User } from '../../../interfaces/User';
import * as userEndpoints from '../../../endpoints/user';
import * as uploadEndpoints from '../../../endpoints/upload';
import TextInputsettings from '../../TextInputSettings';
import Button from '../../Button';

const ConfigureProfile = () => {
  const [showConfiguration, setShowConfiguration] = useState(false);
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
      // As Node used since event.target cannot be inferred to be a Node. It could have other types
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowConfiguration(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setShowConfiguration(false);
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

  const configurationForm = (
    <>
      <form
        onSubmit={onConfigurationSubmit}
        className={styles.formWrapper}
      >
        <TextInputsettings
          placeholder="Description"
          textLabel="Description"
          idInput="descriptionInput"
          type="text"
          initialValue={contextUser?.user?.description || 'What is going on?'}
          onChange={handleDescriptionChange}
        />
        <div
          className={styles.buttonWrapper}
        >
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
      <div>
        <button
          className={styles.iconButton}
          onClick={() => setShowConfiguration(true)}
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
            showConfiguration ? styles.configurationTargetShow : styles.configurationTargetHide
          }
        >
          {imagePicker}
          {configurationForm}
        </div>
      </div>
    </div>
  );
};

export default ConfigureProfile;
