import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextInput from '../../../components/TextInput';
import { User } from '../../../interfaces';
import styles from './Signin.module.scss';
import { useAuthFetch } from '../../../endpoints';
import Button from '../../../components/Button';
import { setUser, setToken } from '../../../context/redux';
import { saveUser } from '../../../helpers/localStorage';

const Signin = () => {
  // Global state
  const dispatch = useDispatch();

  // Local state
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [incorrectUserPasswordError, setIncorrectUserPasswordError] = useState('');

  // Endpoints
  const { signin } = useAuthFetch();

  // Signin email change handler
  const onSigninEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninEmail(e.currentTarget.value);
  };

  // Signin password change handler
  const onSigninPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninPassword(e.currentTarget.value);
  };

  // Function triggered when submiting sign in
  const onSigninSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const login = {
      email: signinEmail,
      password: signinPassword,
    };
    const res: { user: User, token: string } = await signin(login);
    // checks if res has an user property
    if (res.user) {
      saveUser({ token: res.token, id: res.user._id! });
      // Sets current user in global state
      dispatch(setUser(res.user));
      dispatch(setToken(res.token));
    } else {
      setIncorrectUserPasswordError('The email and/or password are not correct');
    }
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Already have an account?</h1>
      </div>
      <form onSubmit={onSigninSubmit}>
        <div className={styles.inputWrapper}>
          <TextInput
            idInput="signinEmail"
            onChange={onSigninEmailChangeHandler}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            idInput="signinPassword"
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
};

export default Signin;
