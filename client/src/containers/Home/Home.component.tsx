import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';
import FollowSection from './FollowSection';
import PostSection from './PostSection';
import ReadingSection from './ReadingSection';
import { RootState } from '../../context/redux';

const Home = () => {
  // If the user is using the bar to search or is configuring profile,
  // then make the background darker
  const isConfiguringProfile = useSelector((state: RootState) => state.user.isConfiguringProfile);
  const isSearching = useSelector((state: RootState) => state.user.isSearching);
  const classContainer = isSearching || isConfiguringProfile
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
