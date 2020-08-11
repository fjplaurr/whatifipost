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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useContext } from 'react';
import { Switch, Route, Redirect, } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Login from '../Login';
import Home from '../Home';
import NotFound from '../NotFound';
import UserContext from '../../helpers/context';
var PrivateRoute = function (_a) {
    var isLoggedIn = _a.isLoggedIn, rest = __rest(_a, ["isLoggedIn"]);
    if (isLoggedIn) {
        return React.createElement(Route, __assign({}, rest));
    }
    return React.createElement(Redirect, { to: "/" });
};
var Routes = function () {
    var contextUser = useContext(UserContext);
    return (React.createElement(React.Fragment, null,
        React.createElement(NavBar, null),
        React.createElement(Switch, null,
            React.createElement(Route, { exact: true, path: "/", component: Login }),
            React.createElement(PrivateRoute, { isLoggedIn: !!contextUser.user, path: "/home", component: Home }),
            React.createElement(Route, { path: "/notfound", component: NotFound }))));
};
export default Routes;
