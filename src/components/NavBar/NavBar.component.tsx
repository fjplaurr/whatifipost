import React, { useContext } from 'react';
import Logo from '../Logo';
import styles from './NavBar.module.scss';
import { UserContext } from '../../containers/App';
import SearchBar from '../SearchBar';

const NavBar = () => {
  const contextUser = useContext(UserContext);
  // Only if the user is logged in, the navbar is sticky∫∂∫ææ∂∂æ©∆∫Æ∑
  const navBarClass = contextUser.user ? `${styles.navBar} ${styles.navBarSticky}` : styles.navBar;
  return (
    <div className={navBarClass}>
      {/* When clicking the logo, it will redirect to login */}
      <Logo />
      <div className={styles.searchBarWrapper}>
        {contextUser.user && <SearchBar />}
      </div>
    </div>
  );
};

export default NavBar;
