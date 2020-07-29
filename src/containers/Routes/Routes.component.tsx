import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Login from '../Login';
import Home from '../Home';
import NotFound from '../NotFound';
import UserContext from '../../helpers/context';

type PrivateRouteProps = { isLoggedIn: boolean } & RouteProps;

const PrivateRoute = ({ isLoggedIn, ...rest }: PrivateRouteProps) => {
  if (isLoggedIn) {
    return <Route {...rest} />;
  }
  return <Redirect to="/" />;
};

const Routes = () => {
  const contextUser = useContext(UserContext);
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute isLoggedIn={!!contextUser.user} path="/home" component={Home} />
        <Route path="/notfound" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
