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
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextInput from '../../../components/TextInput';
import UserContext from '../../../helpers/context';
import styles from './Signin.module.scss';
import * as authEndpoints from '../../../endpoints/auth';
import Button from '../../../components/Button';
var Signin = function () {
    // React-context to access current connected user
    var contextUser = useContext(UserContext);
    // React-router history
    var history = useHistory();
    // Signin state
    var _a = useState(''), signinEmail = _a[0], setSigninEmail = _a[1];
    var _b = useState(''), signinPassword = _b[0], setSigninPassword = _b[1];
    var _c = useState(''), incorrectUserPasswordError = _c[0], setIncorrectUserPasswordError = _c[1];
    // Signin email change handler
    var onSigninEmailChangeHandler = function (e) {
        setSigninEmail(e.currentTarget.value);
    };
    // Signin password change handler
    var onSigninPasswordChangeHandler = function (e) {
        setSigninPassword(e.currentTarget.value);
    };
    // Function triggered when submiting sign in
    var onSigninSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var login, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    login = {
                        email: signinEmail,
                        password: signinPassword,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, authEndpoints.signin(login)];
                case 2:
                    res = _a.sent();
                    if (!res.user) return [3 /*break*/, 4];
                    // Sets current user in context
                    return [4 /*yield*/, contextUser.setUser(res.user)];
                case 3:
                    // Sets current user in context
                    _a.sent();
                    // Pushes to home screen
                    history.push('./home');
                    return [3 /*break*/, 5];
                case 4:
                    setIncorrectUserPasswordError('The email and/or password are not correct');
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    history.push('./notfound');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    // Autologin after user is set if the local storage contains it
    useEffect(function () {
        var autologin = function () {
            if (contextUser.user) {
                history.push('./home');
            }
        };
        autologin();
    }, [contextUser.user, history]);
    return (React.createElement("div", { className: styles.signinContainer, "data-testid": "signinContainer" },
        React.createElement("div", { className: styles.titleWrapper },
            React.createElement("h1", { className: styles.title }, "Already have an account?")),
        React.createElement("form", { onSubmit: onSigninSubmit },
            React.createElement("div", { className: styles.inputWrapper },
                React.createElement(TextInput, { idInput: "email", onChange: onSigninEmailChangeHandler, type: "email", placeholder: "Email" })),
            React.createElement("div", { className: styles.inputWrapper },
                React.createElement(TextInput, { idInput: "password", onChange: onSigninPasswordChangeHandler, type: "password", placeholder: "Password" })),
            incorrectUserPasswordError && React.createElement("p", { className: styles.error }, incorrectUserPasswordError),
            React.createElement(Button, { backgroundFull: true, text: "Sign in", color: "blue", type: "submit" }))));
};
export default Signin;
