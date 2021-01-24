import React, { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { User, Context } from '../../interfaces';
import { loadUser } from '../../helpers/localStorage';
import { useUserFetch } from '../../endpoints/user';
import NavBar from '../../components/NavBar';
import Login from '../Login';
import Home from '../Home';
import NotFound from '../NotFound';

// Context
const UserContext = createContext<Context>({} as Context);

const App = () => {
  // Global context state
  const [user, setUser] = useState<User>();
  const [isSearching, setIsSearching] = useState(false);
  const [isConfiguringProfile, setIsConfiguringProfile] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [watchingOtherProfileId, setWatchingOtherProfileId] = useState('');
  const [token, setToken] = useState('');

  // Endpoints
  const { getSingle } = useUserFetch();

  // Loads user after first render
  useEffect(() => {
    const getUser = async () => {
      const parsedObject = loadUser();
      if (parsedObject) {
        await setToken(parsedObject.token);
        const userFromDatabase = await getSingle(parsedObject.id);
        setUser(userFromDatabase);
      }
    };
    getUser();
  }, []);

  type PrivateRouteProps = { isLoggedIn: boolean } & RouteProps;
  const PrivateRoute = ({ isLoggedIn, ...rest }: PrivateRouteProps) => (
    isLoggedIn ? <Route {...rest} /> : <Redirect to="/" />
  );

  return (
    <React.StrictMode>
      <UserContext.Provider
        value={{
          user,
          setUser,
          isSearching,
          setIsSearching,
          isPosting,
          setIsPosting,
          watchingOtherProfileId,
          setWatchingOtherProfileId,
          setIsConfiguringProfile,
          isConfiguringProfile,
          token,
          setToken,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute isLoggedIn={!!user} path="/home" component={Home} />
            <Route path="/notfound" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </React.StrictMode>
  );
};

export { UserContext, App };
