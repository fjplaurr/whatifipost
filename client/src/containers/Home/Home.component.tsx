import React, { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './Home.module.scss';
import FollowSection from './FollowSection';
import PostSection from './PostSection';
import ReadingSection from './ReadingSection';
import UserContext from '../../helpers/context';

const Home = () => {
  const contextUser = useContext(UserContext);
  // If the user is using the bar to search or is configuring profile,
  // then make the background darker
  const classContainer = contextUser.isSearching || contextUser.isConfiguringProfile
    ? `${styles.homeContainer} ${styles.opacity}` : styles.homeContainer;
  return (
    <div className={classContainer}>
      {!isMobile && (
        <div className={styles.followSectionWrapper}>
          <FollowSection />
        </div>
      )}
      <div className={styles.verticalContainer}>
        <div className={styles.postSectionWrapper}>
          <PostSection />
        </div>
        <ReadingSection />
      </div>
    </div>
  );
};

export default Home;
