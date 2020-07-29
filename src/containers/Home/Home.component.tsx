import React, { useState, useContext } from 'react';
import styles from './Home.module.scss';
import FollowSection from './FollowSection';
import PostSection from './PostSection';
import ReadingSection from './ReadingSection';
import SearchBar from '../../components/SearchBar';

const Home = () => (
  <div className={styles.horizontalContainer}>
    <div className={styles.followSectionWrapper}>
      <FollowSection />
    </div>
    <div className={styles.verticalContainer}>
      <div className={styles.postSectionWrapper}>
        <PostSection />
      </div>
      <ReadingSection />
    </div>
  </div>
);

export default Home;
