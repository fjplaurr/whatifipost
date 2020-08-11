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
import React, { useState, useEffect, useContext, useCallback, } from 'react';
import ProfileCard from '../../../components/ProfileCard';
import styles from './FollowSection.module.scss';
import * as userEndpoints from '../../../endpoints/user';
import { UserContext } from '../../App';
var FollowSection = function () {
    // Reads current connected user from Context
    var contextUser = useContext(UserContext);
    var _a = useState(true), followingTabActive = _a[0], setFollowingTabActive = _a[1];
    var _b = useState(false), followersTabActive = _b[0], setFollowersTabActive = _b[1];
    var _c = useState([]), following = _c[0], setFollowing = _c[1];
    var _d = useState([]), followers = _d[0], setFollowers = _d[1];
    // Loads followed users from database
    var loadFollowing = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, userEndpoints.getFollowing((_a = contextUser.user) === null || _a === void 0 ? void 0 : _a._id)];
                case 1:
                    data = _b.sent();
                    data && setFollowing(data);
                    return [2 /*return*/];
            }
        });
    }); }, [contextUser.user]);
    // Loads followers from database
    var loadFollowers = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, userEndpoints.getFollowers((_a = contextUser.user) === null || _a === void 0 ? void 0 : _a._id)];
                case 1:
                    data = _b.sent();
                    data && setFollowers(data);
                    return [2 /*return*/];
            }
        });
    }); }, [contextUser.user]);
    // Loads followed users and followers after first render
    useEffect(function () {
        loadFollowing();
        loadFollowers();
    }, [contextUser.user, loadFollowing, loadFollowers]);
    var tabFollowingClick = function () {
        if (!followingTabActive) {
            setFollowingTabActive(true);
            setFollowersTabActive(false);
        }
    };
    var tabFollowersClick = function () {
        if (!followersTabActive) {
            setFollowersTabActive(true);
            setFollowingTabActive(false);
        }
    };
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
        // Loads followed users
        loadFollowing();
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
                                    // Loads followed users
                                    loadFollowing();
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
                    loadFollowing();
                    return [2 /*return*/];
            }
        });
    }); };
    var followingList = following.map(function (data) {
        var user = data.user;
        return (React.createElement("div", { key: user._id, className: styles.targetWrapper },
            React.createElement(ProfileCard, { description: user.description, name: user.name, surname: user.surname, id: user._id, picture: user.profileImage, onClick: function (e) { return handleUnfollow(e, user); }, textButton: "Unfollow", colorButton: "red" })));
    });
    var followersList = followers.map(function (data) {
        var _a;
        var follower = data.user;
        var usersFollowing = (_a = contextUser.user) === null || _a === void 0 ? void 0 : _a.following;
        var allUserIds = usersFollowing === null || usersFollowing === void 0 ? void 0 : usersFollowing.map(function (element) { return element.user; });
        var isFollowing = allUserIds === null || allUserIds === void 0 ? void 0 : allUserIds.includes(follower._id);
        if (isFollowing) {
            return (React.createElement("div", { key: follower._id, className: styles.targetWrapper },
                React.createElement(ProfileCard, { description: follower.description, name: follower.name, surname: follower.surname, picture: follower.profileImage, id: follower._id, onClick: function (e) { return handleUnfollow(e, follower); }, textButton: "Unfollow", colorButton: "red" })));
        }
        return (React.createElement("div", { key: follower._id, className: styles.targetWrapper },
            React.createElement(ProfileCard, { description: follower.description, name: follower.name, surname: follower.surname, picture: follower.profileImage, id: follower._id, onClick: function (e) { return handleFollow(e, follower); }, textButton: "Follow", colorButton: "blue" })));
    });
    return (React.createElement("section", { className: styles.followSection },
        React.createElement("div", { className: styles.tabList },
            React.createElement("button", { onClick: tabFollowingClick, className: followingTabActive ? styles.activeTab : styles.notActiveTab }, "Following"),
            React.createElement("button", { onClick: tabFollowersClick, className: followersTabActive ? styles.activeTab : styles.notActiveTab }, "Followers")),
        followingTabActive && followingList,
        followersTabActive && followersList));
};
export default FollowSection;
