import React, { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './Home.module.scss';
import FollowSection from './FollowSection';
import PostSection from './PostSection';
import ReadingSection from './ReadingSection';
import UserContext from '../../helpers/context';
var Home = function () {
    var contextUser = useContext(UserContext);
    // If the user is using the bar to search or is configuring profile,
    // then make the background darker
    var classContainer = contextUser.isSearching || contextUser.isConfiguringProfile
        ? styles.homeContainer + " " + styles.opacity : styles.homeContainer;
    return (React.createElement("div", { className: classContainer },
        !isMobile && (React.createElement("div", { className: styles.followSectionWrapper },
            React.createElement(FollowSection, null))),
        React.createElement("div", { className: styles.verticalContainer },
            React.createElement("div", { className: styles.postSectionWrapper },
                React.createElement(PostSection, null)),
            React.createElement(ReadingSection, null))));
};
export default Home;
