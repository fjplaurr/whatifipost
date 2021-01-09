import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { User } from '../../interfaces';
import UserContext from '../../helpers/context';
import { loadUser, saveUser } from '../../helpers/localStorage';
import * as userEndpoints from '../../endpoints/user';
import NavBar from '../../components/NavBar';
import Login from '../Login';
import Home from '../Home';
import NotFound from '../NotFound';

const App = () => {
  const [user, setUser] = useState<User>();
  const [isSearching, setIsSearching] = useState(false);
  const [isConfiguringProfile, setIsConfiguringProfile] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [watchingOtherProfileId, setWatchingOtherProfileId] = useState('');

  useEffect(() => {
    user && saveUser(user._id!);
  });

  // Loads user after first render
  useEffect(() => {
    const getUser = async () => {
      const parsedObject = loadUser();
      if (parsedObject) {
        const userFromDatabase = await userEndpoints.getSingle(parsedObject.id);
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
