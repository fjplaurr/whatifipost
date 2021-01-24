import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextInput from '../../../components/TextInput';
import { User } from '../../../interfaces';
import UserContext from '../../../helpers/context';
import styles from './Signin.module.scss';
import { useAuthFetch } from '../../../endpoints/auth';
import Button from '../../../components/Button';

const Signin = () => {
  // React-router history
  const history = useHistory();

  // React-context to access current connected user
  const contextUser = useContext(UserContext);

  // State
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
    try {
      const res: { user: User, token: string } = await signin(login);
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
  }, [contextUser.user, history]);

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
