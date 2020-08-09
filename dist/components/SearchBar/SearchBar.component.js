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
import React, { useState, useEffect, useContext, useRef, } from 'react';
import SearchBarTextInput from './SearchBarTextInput';
import ProfileCard from '../ProfileCard';
import * as userEndpoints from '../../endpoints/user';
import { Search } from '../../assets/icons';
import styles from './SearchBar.module.scss';
import { UserContext } from '../../containers/App';
var SearchBar = function () {
    var _a = useState(''), searchTerm = _a[0], setSearchTerm = _a[1];
    var _b = useState([]), userResults = _b[0], setUserResults = _b[1];
    // Ref for the broken down results div
    var wrapperRef = useRef(null);
    // Reads current connected user from Context
    var contextUser = useContext(UserContext);
    // Sets searched term while writing
    var handleChange = function (e) {
        setSearchTerm(e.currentTarget.value);
    };
    // Makes a search every time the user inputs a carachter
    useEffect(function () {
        var fetchUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userEndpoints.getFilteredUsers(searchTerm)];
                    case 1:
                        users = _a.sent();
                        setUserResults(users);
                        return [2 /*return*/];
                }
            });
        }); };
        // Performs search only if the searchTerm is not empty. If it is not
        // empty (e.g., cleaning the input), then the results must change to empty
        if (searchTerm) {
            fetchUsers();
        }
        else {
            setUserResults([]);
        }
    }, [searchTerm]);
    var handleUnfollow = function (event, clickedUser) {
        var updateFollowing = function () { return __awaiter(void 0, void 0, void 0, function () {
            var followingModified, modifiedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        followingModified = contextUser.user.following
                            .filter(function (el) { return el.user !== clickedUser._id; });
                        modifiedUser = __assign(__assign({}, contextUser.user), { following: followingModified });
                        // Modify user in context
                        return [4 /*yield*/, contextUser.setUser(modifiedUser)];
                    case 1:
                        // Modify user in context
                        _a.sent();
                        // Modify list of followed users in database
                        return [4 /*yield*/, userEndpoints.update(modifiedUser)];
                    case 2:
                        // Modify list of followed users in database
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        var updateFollowers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var followersModified, modifiedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        followersModified = clickedUser.followers
                            .filter(function (el) { return el.user !== contextUser.user._id; });
                        modifiedUser = __assign(__assign({}, clickedUser), { followers: followersModified });
                        // Modify list of followers in database
                        return [4 /*yield*/, userEndpoints.update(modifiedUser)];
                    case 1:
                        // Modify list of followers in database
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        updateFollowing();
        updateFollowers();
    };
    var handleFollow = function (event, clickedUser) { return __awaiter(void 0, void 0, void 0, function () {
        var updateFollowing, updateFollowers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateFollowing = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var contextUserCopy;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    contextUserCopy = __assign({}, contextUser.user);
                                    contextUserCopy.following.push({ user: clickedUser._id });
                                    // Modify user in context
                                    return [4 /*yield*/, contextUser.setUser(contextUserCopy)];
                                case 1:
                                    // Modify user in context
                                    _a.sent();
                                    // Modify list of followed users in database
                                    return [4 /*yield*/, userEndpoints.update(contextUserCopy)];
                                case 2:
                                    // Modify list of followed users in database
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    updateFollowers = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var clickedUserCopy;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    clickedUserCopy = __assign({}, clickedUser);
                                    clickedUserCopy.followers.push({ user: contextUser.user._id });
                                    // Modify list of followers in database
                                    return [4 /*yield*/, userEndpoints.update(clickedUserCopy)];
                                case 1:
                                    // Modify list of followers in database
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, updateFollowing()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, updateFollowers()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var usersList = userResults.map(function (user) {
        var _a, _b;
        // If the user finds his/her own profile, then doesn't render a follow/unfollow button
        if (((_a = contextUser.user) === null || _a === void 0 ? void 0 : _a._id) === user._id) {
            return (React.createElement("div", { key: user._id, className: styles.cardWrapper },
                React.createElement(ProfileCard, { description: user.description, name: user.name, surname: user.surname, picture: user.profileImage, id: user._id })));
        }
        var usersFollowing = (_b = contextUser.user) === null || _b === void 0 ? void 0 : _b.following;
        var allUserIds = usersFollowing === null || usersFollowing === void 0 ? void 0 : usersFollowing.map(function (element) { return element.user; });
        var isFollowing = allUserIds === null || allUserIds === void 0 ? void 0 : allUserIds.includes(user._id);
        if (isFollowing) {
            return (React.createElement("div", { key: user._id, className: styles.cardWrapper },
                React.createElement(ProfileCard, { description: user.description, name: user.name, surname: user.surname, picture: user.profileImage, id: user._id, onClick: function (e) { return handleUnfollow(e, user); }, textButton: "Unfollow", colorButton: "red", backgroundFull: true })));
        }
        return (React.createElement("div", { key: user._id, className: styles.cardWrapper },
            React.createElement(ProfileCard, { description: user.description, name: user.name, surname: user.surname, picture: user.profileImage, id: user._id, onClick: function (e) { return handleFollow(e, user); }, textButton: "Follow", colorButton: "blue", backgroundFull: true })));
    });
    // Sets if the user is writing in the search input or not
    useEffect(function () {
        if (searchTerm) {
            contextUser.setIsSearching(true);
        }
        else {
            contextUser.setIsSearching(false);
        }
    }, [searchTerm, contextUser]);
    // Closes the search results if the user clicks outside
    useEffect(function () {
        // Detects if clicked on outside of element
        var handleClickOutside = function (event) {
            // As Node used since event.target cannot be inferred to be a Node. It could have other types
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                contextUser.setIsSearching(false);
                setSearchTerm('');
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, contextUser]);
    var brokenDownSearch = function () {
        if (contextUser.isSearching && userResults.length > 0) {
            return (React.createElement("div", { className: styles.resultsWrapperShow, ref: wrapperRef }, usersList));
        }
        if (contextUser.isSearching && userResults.length === 0) {
            return (React.createElement("div", { className: styles.resultsWrapperShow, ref: wrapperRef },
                React.createElement("div", { className: styles.cardWrapper }, "No results found.")));
        }
        return React.createElement(React.Fragment, null, " ");
    };
    return (React.createElement("div", { className: styles.searchBarWrapper },
        React.createElement(SearchBarTextInput, { idInput: "searchBar", type: "text", placeholder: "Search", onChange: handleChange, color: "white", maxLength: 50 },
            React.createElement(Search, null)),
        brokenDownSearch()));
};
export default SearchBar;
