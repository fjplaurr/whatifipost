import React, { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import Logo from '../Logo';
import styles from './NavBar.module.scss';
import { UserContext } from '../../containers/App';
import SearchBar from '../SearchBar';
import ConfigureProfile from './ConfigureProfile';

const NavBar = () => {
  // Reads current connected user from Context
  const contextUser = useContext(UserContext);
  // Only if the user is logged in, the navbar is sticky
  const navBarClass = contextUser.user ? `${styles.navBar} ${styles.navBarSticky}` : styles.navBar;
  return (
    <div className={navBarClass}>
      {/* When clicking the logo, it will redirect to login */}
      {isMobile ? <Logo small /> : <Logo />}
      {contextUser.user && <SearchBar />}
      {contextUser.user && <ConfigureProfile />}
    </div>
  );
};

export default NavBar;
