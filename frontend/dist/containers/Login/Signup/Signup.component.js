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
import React, { useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import TextInput from '../../../components/TextInput';
import UserContext from '../../../helpers/context';
import styles from './Signup.module.scss';
import * as authEndpoints from '../../../endpoints/auth';
import Button from '../../../components/Button';
var Signup = function () {
    // React-context to access current connected user
    var contextUser = useContext(UserContext);
    // Signup state
    var initialState = {
        signupName: '',
        signupSurname: '',
        signupEmail: '',
        signupPassword: '',
    };
    // React-router history
    var history = useHistory();
    var reducer = function (state, action) {
        switch (action.type) {
            case 'supName':
                return __assign(__assign({}, state), { signupName: action.payload });
            case 'supSurname':
                return __assign(__assign({}, state), { signupSurname: action.payload });
            case 'supEmail':
                return __assign(__assign({}, state), { signupEmail: action.payload });
            case 'supPassword':
                return __assign(__assign({}, state), { signupPassword: action.payload });
            default:
                return state;
        }
    };
    var _a = useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
    // Signup email change handler
    var onstateHandler = function (e, SignupActionType) {
        dispatch({ type: SignupActionType, payload: e.currentTarget.value });
    };
    // Function triggered when submiting sign up
    var onSignupSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var newUser;
        return __generator(this, function (_a) {
            event.preventDefault();
            newUser = {
                email: state.signupEmail,
                password: state.signupPassword,
                name: state.signupName,
                surname: state.signupSurname,
            };
            createUser(newUser);
            return [2 /*return*/];
        });
    }); };
    var createUser = function (newUser) { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authEndpoints.signup(newUser)];
                case 1:
                    res = _a.sent();
                    if (!res) return [3 /*break*/, 3];
                    // Sets current user in context
                    return [4 /*yield*/, contextUser.setUser(res.user)];
                case 2:
                    // Sets current user in context
                    _a.sent();
                    // Pushes to home screen
                    history.push('./home');
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    history.push('./notfound');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: styles.container, "data-testid": "signupContainer" },
        React.createElement("div", { className: styles.titleWrapper },
            React.createElement("h1", { className: styles.title }, "Don't have an account?")),
        React.createElement("form", { onSubmit: onSignupSubmit },
            React.createElement("div", { className: styles.inputWrapper },
                React.createElement(TextInput, { onChange: function (e) { return onstateHandler(e, 'supName'); }, type: "text", placeholder: "Name", idInput: "name" })),
            React.createElement("div", { className: styles.inputWrapper },
                React.createElement(TextInput, { onChange: function (e) { return onstateHandler(e, 'supSurname'); }, type: "text", placeholder: "Surname", idInput: "surname" })),
            React.createElement("div", { className: styles.inputWrapper },
                React.createElement(TextInput, { onChange: function (e) { return onstateHandler(e, 'supEmail'); }, type: "email", placeholder: "Email", idInput: "email" })),
            React.createElement("div", { className: styles.inputWrapper },
                React.createElement(TextInput, { onChange: function (e) { return onstateHandler(e, 'supPassword'); }, type: "password", placeholder: "Password", minLength: 6, idInput: "password" })),
            React.createElement(Button, { backgroundFull: true, text: "Join", color: "blue", type: "submit" }))));
};
export default Signup;
