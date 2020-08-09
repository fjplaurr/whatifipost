import React from 'react';
import styles from './Login.module.scss';
import Signup from './Signup';
import Signin from './Signin';
function Login() {
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.container },
            React.createElement(Signin, null),
            React.createElement(Signup, null))));
}
export default Login;
