import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import TextInput from '../../../components/TextInput';
import { User } from '../../../interfaces';
import { saveUser } from '../../../helpers/localStorage';
import styles from './Signup.module.scss';
import { useAuthFetch } from '../../../endpoints';
import Button from '../../../components/Button';
import { setUser, setToken } from '../../../context/redux';

const Signup = () => {
  // Global state
  const globalDispatch = useDispatch();

  // Local state
  const initialState = {
    signupName: '',
    signupSurname: '',
    signupEmail: '',
    signupPassword: '',
  };

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

  // Endpoints
  const { signup } = useAuthFetch();

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
    const res: { user: User, token: string } = await signup(newUser);
    if (res.user) {
      saveUser({ token: res.token, id: res.user._id! });
      // Sets current user in global state
      globalDispatch(setUser(res.user));
      globalDispatch(setToken(res.token));
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
