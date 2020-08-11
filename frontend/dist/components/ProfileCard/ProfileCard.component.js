import React, { useContext } from 'react';
import styles from './ProfileCard.module.scss';
import Button from '../Button';
import profileImage from '../../assets/images/profileImage.png';
import { UserContext } from '../../containers/App';
var ProfileCard = function (_a) {
    var name = _a.name, surname = _a.surname, _b = _a.description, description = _b === void 0 ? '' : _b, picture = _a.picture, onClick = _a.onClick, textButton = _a.textButton, colorButton = _a.colorButton, backgroundFull = _a.backgroundFull, id = _a.id;
    // Reads current connected user from Context
    var contextUser = useContext(UserContext);
    var handleClickOnUser = function () {
        contextUser.setWatchingOtherProfileId(id);
    };
    return (React.createElement("div", { className: styles.container },
        React.createElement("button", { onClick: handleClickOnUser, type: "button", className: styles.buttonImageWrapper },
            React.createElement("div", { className: styles.imageWrapper, style: { backgroundImage: picture ? "url(" + picture + ")" : "url(" + profileImage + ")" } })),
        React.createElement("div", { className: styles.nameDescriptionWrapper },
            React.createElement("p", { className: styles.name }, name + " " + surname),
            React.createElement("p", { className: styles.description }, description)),
        React.createElement("div", { className: styles.buttonWrapper }, textButton
            && colorButton && (React.createElement(Button, { text: textButton, color: colorButton, onClick: onClick, backgroundFull: backgroundFull })))));
};
export default ProfileCard;
