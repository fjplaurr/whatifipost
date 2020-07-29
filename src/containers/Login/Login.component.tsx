import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.scss';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import * as authEndpoints from '../../endpoints/auth';
import { User } from '../../interfaces';
import UserContext from '../../helpers/context';

function Login() {
  // React-context to access current connected user
  const contextUser = useContext(UserContext);

  // React-router history
  const history = useHistory();

  // Fetch hooks for sigin and singup

  // Signin state
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [incorrectUserPasswordError, setIncorrectUserPasswordError] = useState('');

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupSurname, setSignupSurname] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Signin email change handler
  const onSigninEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninEmail(e.currentTarget.value);
  };

  // Signin password change handler
  const onSigninPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninPassword(e.currentTarget.value);
  };

  // Signup name change handler
  const onSignupNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupName(e.currentTarget.value);
  };

  // Signup surname change handler
  const onSignupSurnameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupSurname(e.currentTarget.value);
  };

  // Signup email change handler
  const onSignupEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupEmail(e.currentTarget.value);
  };

  // Signup password change handler
  const onSignupPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupPassword(e.currentTarget.value);
  };

  // Function triggered when submiting sign in
  const onSigninSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const login = {
      email: signinEmail,
      password: signinPassword,
    };
    try {
      const res: { user: User, token: string } = await authEndpoints.signin(login);
      // checks if res has an user property
      if (res.user) {
        // Sets current user in context
        await contextUser.setUser(res.user);
        // Pushes to home screen
        history.push('./home');
      } else {
        setIncorrectUserPasswordError('The email and/or password are not correct');
      }
    } catch (err) {
      history.push('./notfound');
    }
  };

  // Autologin after user is set if the local storage contains it
  useEffect(() => {
    const autologin = () => {
      if (contextUser.user) {
        history.push('./home');
      }
    };
    autologin();
  }, [contextUser.user]);

  // Function triggered when submiting sign up
  const onSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: User = {
      email: signupEmail,
      password: signupPassword,
      name: signupName,
      surname: signupSurname,
    };
    try {
      const res: { user: User, token: string } = await authEndpoints.signup(newUser);
      if (res) {
        // Sets current user in context
        await contextUser.setUser(res.user);
        // Pushes to home screen
        history.push('./home');
      }
    } catch (err) {
      history.push('./notfound');
    }
  };

  const signinRender = (
    <div className={styles.signinContainer}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Already have an account?</h1>
      </div>
      <form onSubmit={onSigninSubmit}>
        <div className={styles.inputWrapper}>
          <TextInput
            onChange={onSigninEmailChangeHandler}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            onChange={onSigninPasswordChangeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        {incorrectUserPasswordError && <p className={styles.error}>{incorrectUserPasswordError}</p>}
        <Button
          backgroundFull
          text="Sign in"
          color="blue"
          type="submit"
        />
      </form>
    </div>
  );

  const signupRender = (
    <div className={styles.signupContainer}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Don&apos;t have an account?</h1>
      </div>
      <form onSubmit={onSignupSubmit}>
        <div className={styles.inputWrapper}>
          <TextInput onChange={onSignupNameChangeHandler} type="text" placeholder="Name" />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput onChange={onSignupSurnameChangeHandler} type="text" placeholder="Surname" />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput onChange={onSignupEmailChangeHandler} type="email" placeholder="Email" />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            onChange={onSignupPasswordChangeHandler}
            type="password"
            placeholder="Password"
            minLength={6}
          />
        </div>
        <Button
          backgroundFull
          text="Join"
          color="blue"
          type="submit"
        />
      </form>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        {signinRender}
        {signupRender}
      </div>
    </div>
  );
}

export default Login;
