import React from 'react';
import styles from './Login.module.scss';
import Signup from './Signup';
import Signin from './Signin';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <Signin />
        <Signup />
      </div>
    </div>
  );
}

export default Login;
