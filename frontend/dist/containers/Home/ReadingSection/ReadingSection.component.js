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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useEffect, useContext } from 'react';
import style from './ReadingSection.module.scss';
import PostCard from '../../../components/PostCard';
import { UserContext } from '../../App';
import * as userEndpoints from '../../../endpoints/user';
import ProfileHeader from './ProfileHeader';
var ReadingSection = function () {
    var _a = useState([]), posts = _a[0], setPosts = _a[1];
    var contextUser = useContext(UserContext);
    // Loops an array of posts and transforms every string date into Date type
    var parseDate = function (arr) {
        var arrCopy = __spreadArrays(arr);
        arrCopy.forEach(function (post, index) {
            var postCopy = __assign({}, post);
            postCopy.date = new Date(post.date);
            arrCopy[index] = postCopy;
        });
        return arrCopy;
    };
    // Realoads posts from followed users every time the user
    // changes (for instance, when following/unfollowing users).
    // It also reloads when the user sends a post
    useEffect(function () {
        var getPostsFromAllFollowedusers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var followedUsersPosts, ownPosts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userEndpoints.getPostsFromFollowedUsers(contextUser.user._id)];
                    case 1:
                        followedUsersPosts = _a.sent();
                        return [4 /*yield*/, userEndpoints.getUsersPosts(contextUser.user._id)];
                    case 2:
                        ownPosts = _a.sent();
                        ownPosts.forEach(function (post, index) {
                            var postCopy = __assign({}, post);
                            postCopy.date = new Date(postCopy.date);
                            ownPosts[index] = postCopy;
                        });
                        setPosts(__spreadArrays(parseDate(followedUsersPosts), parseDate(ownPosts)));
                        return [2 /*return*/];
                }
            });
        }); };
        var getPostsFromOneUser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var usersPosts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userEndpoints.getUsersPosts(contextUser.watchingOtherProfileId)];
                    case 1:
                        usersPosts = _a.sent();
                        setPosts(__spreadArrays(parseDate(usersPosts)));
                        return [2 /*return*/];
                }
            });
        }); };
        contextUser.watchingOtherProfileId ? getPostsFromOneUser() : getPostsFromAllFollowedusers();
    }, [contextUser]);
    var getPosts = posts.map(function (post, index) {
        if (contextUser.watchingOtherProfileId) {
            return (React.createElement(React.Fragment, { key: post._id },
                React.createElement(PostCard, { name: post.author.name, surname: post.author.surname, message: post.text, picture: post.author.profileImage, last: posts.length - 1 === index, timestamp: post.date, authorId: post.author._id })));
        }
        return (React.createElement(React.Fragment, { key: post._id },
            React.createElement(PostCard, { name: post.author.name, surname: post.author.surname, message: post.text, picture: post.author.profileImage, last: posts.length - 1 === index, timestamp: post.date, authorId: post.author._id })));
    });
    var postsFromEveryone = function () { return getPosts; };
    var PostFromOne = function () { return (React.createElement(React.Fragment, null,
        React.createElement(ProfileHeader, { userId: contextUser.watchingOtherProfileId }),
        getPosts)); };
    return (React.createElement("section", { className: style.readingSection }, contextUser.watchingOtherProfileId ? PostFromOne() : postsFromEveryone()));
};
export default ReadingSection;
