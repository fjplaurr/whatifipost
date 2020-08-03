import React, { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './Home.module.scss';
import FollowSection from './FollowSection';
import PostSection from './PostSection';
import ReadingSection from './ReadingSection';
import UserContext from '../../helpers/context';

const Home = () => {
  const contextUser = useContext(UserContext);
  const classContainer = contextUser.isSearching ? `${styles.homeContainer} ${styles.opacity}` : styles.homeContainer;
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
