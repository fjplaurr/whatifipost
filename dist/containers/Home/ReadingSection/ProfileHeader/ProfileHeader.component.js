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
import React, { useState, useEffect, useContext } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import style from './ProfileHeader.module.scss';
import * as userEndpoints from '../../../../endpoints/user';
import profileImage from '../../../../assets/images/profileImage.png';
import { UserContext } from '../../../App';
var ProfileHeader = function (_a) {
    var _b, _c;
    var userId = _a.userId;
    var _d = useState(), user = _d[0], setUser = _d[1];
    // Reads current connected user from Context
    var contextUser = useContext(UserContext);
    // Reads user from database
    useEffect(function () {
        var getUser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var userFromDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userEndpoints.getSingle(userId)];
                    case 1:
                        userFromDB = _a.sent();
                        setUser(userFromDB);
                        return [2 /*return*/];
                }
            });
        }); };
        getUser();
    }, [userId]);
    // stops watching a particular profile and comes back to see posts from all followed users
    var stopWatchingProfile = function () {
        contextUser.setWatchingOtherProfileId('');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: style.profileHeaderWrapper },
            React.createElement("button", { type: "button", onClick: stopWatchingProfile, className: style.backArrowButton },
                React.createElement(IoIosArrowRoundBack, { className: style.backArrow })),
            React.createElement("div", { className: style.imageWrapper, style: {
                    backgroundImage: (user === null || user === void 0 ? void 0 : user.profileImage) ? "url(" + (user === null || user === void 0 ? void 0 : user.profileImage) + ")" : "url(" + profileImage + ")",
                } }),
            React.createElement("div", { className: style.container },
                React.createElement("p", { className: style.name }, (user === null || user === void 0 ? void 0 : user.name) + " " + (user === null || user === void 0 ? void 0 : user.surname)),
                React.createElement("p", { className: style.description }, user === null || user === void 0 ? void 0 : user.description),
                React.createElement("ul", { className: style.infoWrapper },
                    React.createElement("li", { className: style.listItem },
                        React.createElement("span", { className: style.spanlistItem }, (_b = user === null || user === void 0 ? void 0 : user.followers) === null || _b === void 0 ? void 0 : _b.length),
                        ' followers'),
                    React.createElement("li", { className: style.listItem },
                        React.createElement("span", { className: style.spanlistItem }, (_c = user === null || user === void 0 ? void 0 : user.following) === null || _c === void 0 ? void 0 : _c.length),
                        ' following')))),
        React.createElement("h1", { className: style.postsHeader }, "Posts")));
};
export default ProfileHeader;
