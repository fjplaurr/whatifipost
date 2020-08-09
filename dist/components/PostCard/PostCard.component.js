import React, { useContext } from 'react';
import styles from './PostCard.module.scss';
import profileImage from '../../assets/images/profileImage.png';
import { UserContext } from '../../containers/App';
import { getTimeInterval } from '../../helpers/functions';
var PostCard = function (_a) {
    var name = _a.name, surname = _a.surname, _b = _a.message, message = _b === void 0 ? '' : _b, picture = _a.picture, last = _a.last, timestamp = _a.timestamp, authorId = _a.authorId;
    var contextUser = useContext(UserContext);
    if (contextUser.watchingOtherProfileId) {
        return (React.createElement("div", { className: last ? styles.lastContainer : styles.container },
            React.createElement("div", { className: styles.nameMessageWrapperSeeingProfile },
                React.createElement("p", { className: styles.message }, message))));
    }
    var handleClickOnUser = function () {
        authorId && contextUser.setWatchingOtherProfileId(authorId);
    };
    return (React.createElement("div", { className: last ? styles.lastContainer : styles.container },
        React.createElement("button", { onClick: handleClickOnUser, type: "button", className: styles.buttonImageWrapper },
            React.createElement("div", { className: styles.imageWrapper, style: { backgroundImage: picture ? "url(" + picture + ")" : "url(" + profileImage + ")" } })),
        React.createElement("div", { className: styles.nameMessageWrapper },
            React.createElement("div", { className: styles.nameAndTimestampWrapper },
                React.createElement("p", { className: styles.name }, name + " " + surname),
                React.createElement("p", { className: styles.time }, getTimeInterval(timestamp))),
            React.createElement("p", { className: styles.message }, message))));
};
export default PostCard;
