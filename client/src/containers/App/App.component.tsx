import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadUser } from '../../helpers/localStorage';
import { useUserFetch } from '../../endpoints';
import {
  setToken, setUser, RootState,
} from '../../context/redux';
import styles from './App.module.scss';

const Login = React.lazy(() => import('../Login'));
const Home = React.lazy(() => import('../Home'));

const App = () => {
  // Global state
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.auth.token);

  // Endpoints
  const { getSingle } = useUserFetch();

  // Reads token from local storage, fetches user from DB and sets it in global context
  useEffect(() => {
    const getUser = async () => {
      const parsedObject = loadUser();
      if (parsedObject) {
        dispatch(setToken(parsedObject.token));
        if (token) {
          const userFromDB = await getSingle(parsedObject.id);
          dispatch(setUser(userFromDB));
        }
      }
    };
    getUser();
  }, [token]);

  return (
    <React.Suspense fallback={Spinner}>
      {(user && token) ? <Home /> : <Login />}
    </React.Suspense>
  );
};

const Spinner = (
  <div className={styles.spinnerWrapper}>
    <FontAwesomeIcon className={styles.spinner} size="6x" icon={faSpinner} pulse />
  </div>
);

export default App;
