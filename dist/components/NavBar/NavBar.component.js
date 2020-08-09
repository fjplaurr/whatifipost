import React, { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import Logo from '../Logo';
import styles from './NavBar.module.scss';
import { UserContext } from '../../containers/App';
import SearchBar from '../SearchBar';
import ConfigureProfile from './ConfigureProfile';
var NavBar = function () {
    // Reads current connected user from Context
    var contextUser = useContext(UserContext);
    // Only if the user is logged in, the navbar is sticky
    var navBarClass = contextUser.user ? styles.navBar + " " + styles.navBarSticky : styles.navBar;
    return (React.createElement("div", { className: navBarClass },
        isMobile ? React.createElement(Logo, { small: true }) : React.createElement(Logo, null),
        contextUser.user && React.createElement(SearchBar, null),
        contextUser.user && React.createElement(ConfigureProfile, null)));
};
export default NavBar;
