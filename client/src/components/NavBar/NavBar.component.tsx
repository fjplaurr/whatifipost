import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import Logo from '../Logo';
import styles from './NavBar.module.scss';
import SearchBar from '../SearchBar';
import ConfigureProfile from './ConfigureProfile';
import { RootState } from '../../context/redux';

const NavBar = () => {
  // Global state
  const user = useSelector((state: RootState) => state.user.user);
  // Only if the user is logged in, the navbar is sticky
  const navBarClass = user ? `${styles.navBar} ${styles.navBarSticky}` : styles.navBar;
  return (
    <div className={navBarClass}>
      {/* When clicking the logo, it will redirect to login */}
      {isMobile ? <Logo small /> : <Logo />}
      {user && <SearchBar />}
      {user && <ConfigureProfile />}
    </div>
  );
};

export default NavBar;
