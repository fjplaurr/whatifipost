var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect, useRef, useContext, } from 'react';
import { FiUser } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './ConfigureProfile.module.scss';
import { UserContext } from '../../../containers/App';
import profileImage from '../../../assets/images/profileImage.png';
import * as userEndpoints from '../../../endpoints/user';
import * as uploadEndpoints from '../../../endpoints/upload';
import Button from '../../Button';
var ConfigureProfile = function () {
    var _a, _b, _c, _d;
    var _e = useState(''), description = _e[0], setDescription = _e[1];
    // Reads current connected user from Context
    var contextUser = useContext(UserContext);
    // Ref for the profile configuration window
    var wrapperRef = useRef(null);
    // Ref for the input to select picture
    var pictureRef = useRef(null);
    // Closes the profile configuration window if the user clicks outside
    useEffect(function () {
        // Detects if clicked on outside of element
        var handleClickOutside = function (event) {
            // If the event.target is not in the wrapper, it means it is another html element
            // the one that was clicked
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                contextUser.setIsConfiguringProfile(false);
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, contextUser]);
    var handleDescriptionChange = function (event) {
        setDescription(event.target.value);
    };
    var handleChangePicture = function () { return __awaiter(void 0, void 0, void 0, function () {
        var file, response, modifUser;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = pictureRef === null || pictureRef === void 0 ? void 0 : pictureRef.current) === null || _a === void 0 ? void 0 : _a.files[0];
                    return [4 /*yield*/, uploadEndpoints.postPicture(file)];
                case 1:
                    response = _b.sent();
                    if (response.location) {
                        modifUser = __assign(__assign({}, contextUser.user), { profileImage: response.location });
                        // Updates profile image url in database
                        userEndpoints.update(modifUser);
                        // Updates profile image url in context user
                        contextUser.setUser(modifUser);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var onConfigurationSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var modifiedUser;
        return __generator(this, function (_a) {
            event.preventDefault();
            modifiedUser = __assign(__assign({}, contextUser.user), { description: description });
            // Updates description in database
            userEndpoints.update(modifiedUser);
            // Updates description in context user
            contextUser.setUser(modifiedUser);
            // Closes configuration window
            contextUser.setIsConfiguringProfile(false);
            return [2 /*return*/];
        });
    }); };
    var imagePicker = (React.createElement(React.Fragment, null,
        React.createElement("button", { className: styles.imageButton, type: "button", onClick: function () { var _a; return (_a = pictureRef === null || pictureRef === void 0 ? void 0 : pictureRef.current) === null || _a === void 0 ? void 0 : _a.click(); } },
            React.createElement("img", { className: styles.imageWrapper, src: ((_a = contextUser === null || contextUser === void 0 ? void 0 : contextUser.user) === null || _a === void 0 ? void 0 : _a.profileImage) || profileImage, alt: "Profile" }),
            React.createElement("span", { className: styles.changeImageText }, "Change Profile Photo")),
        React.createElement("input", { className: styles.hiddenInput, accept: ".png, .jpg, .jpeg", type: "file", ref: pictureRef, onChange: handleChangePicture })));
    // Sets if the user is writing in the search input or not
    var handleClick = function () {
        contextUser.setIsConfiguringProfile(true);
    };
    useEffect(function () {
        console.log('user is isConfiguringProfile: ');
        console.log(contextUser.isConfiguringProfile);
    }, [contextUser.isConfiguringProfile]);
    var configurationForm = (React.createElement(React.Fragment, null,
        React.createElement("form", { onSubmit: onConfigurationSubmit, className: styles.formWrapper },
            React.createElement(TextareaAutosize, { className: styles.textArea, id: "descriptionInput", defaultValue: ((_b = contextUser === null || contextUser === void 0 ? void 0 : contextUser.user) === null || _b === void 0 ? void 0 : _b.description) || 'What is going on?', onChange: handleDescriptionChange, maxLength: 100 }),
            React.createElement("div", { className: styles.buttonWrapper },
                React.createElement(Button, { backgroundFull: true, text: "Save", color: "blue", type: "submit", small: true })))));
    return (React.createElement("div", { className: styles.configureProfileContainer },
        React.createElement("button", { className: styles.iconButton, onClick: handleClick }, ((_c = contextUser === null || contextUser === void 0 ? void 0 : contextUser.user) === null || _c === void 0 ? void 0 : _c.profileImage) ? (React.createElement("img", { className: styles.smallImageWrapper, src: ((_d = contextUser === null || contextUser === void 0 ? void 0 : contextUser.user) === null || _d === void 0 ? void 0 : _d.profileImage) || profileImage, alt: "Profile" }))
            : React.createElement(FiUser, { className: styles.profileIcon })),
        React.createElement("div", { ref: wrapperRef, className: contextUser.isConfiguringProfile
                ? styles.configurationTargetShow : styles.configurationTargetHide },
            imagePicker,
            configurationForm)));
};
export default ConfigureProfile;
