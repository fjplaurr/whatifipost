import React, { useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import TextInput from '../../../components/TextInput';
import { User } from '../../../interfaces';
import UserContext from '../../../helpers/context';
import styles from './Signup.module.scss';
import * as authEndpoints from '../../../endpoints/auth';
import Button from '../../../components/Button';

const Signup = () => {
  // React-context to access current connected user
  const contextUser = useContext(UserContext);

  // Signup state
  const initialState = {
    signupName: '',
    signupSurname: '',
    signupEmail: '',
    signupPassword: '',
  };

  // React-router history
  const history = useHistory();

  type SignupActionType = 'supName' | 'supSurname' | 'supEmail' | 'supPassword'
  type SignupAction = { type: SignupActionType; payload: string };

  const reducer = (state: typeof initialState, action: SignupAction) => {
    switch (action.type) {
      case 'supName':
        return { ...state, signupName: action.payload };
      case 'supSurname':
        return { ...state, signupSurname: action.payload };
      case 'supEmail':
        return { ...state, signupEmail: action.payload };
      case 'supPassword':
        return { ...state, signupPassword: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // Signup email change handler
  const onstateHandler = (e: React.ChangeEvent<HTMLInputElement>,
    signupActionType: SignupActionType) => {
    dispatch({ type: signupActionType, payload: e.currentTarget.value });
  };

  // Function triggered when submiting sign up
  const onSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: User = {
      email: state.signupEmail,
      password: state.signupPassword,
      name: state.signupName,
      surname: state.signupSurname,
    };
    createUser(newUser);
  };

  const createUser = async (newUser: User) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Don&apos;t have an account?</h1>
      </div>
      <form onSubmit={onSignupSubmit}>
        <div className={styles.inputWrapper}>
          <TextInput
            onChange={(e) => onstateHandler(e, 'supName')}
            type="text"
            placeholder="Name"
            idInput="name"
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            onChange={(e) => onstateHandler(e, 'supSurname')}
            type="text"
            placeholder="Surname"
            idInput="surname"
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            onChange={(e) => onstateHandler(e, 'supEmail')}
            type="email"
            placeholder="Email"
            idInput="signupEmail"
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            onChange={(e) => onstateHandler(e, 'supPassword')}
            type="password"
            placeholder="Password"
            minLength={6}
            idInput="signupPassword"
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
};

export default Signup;
