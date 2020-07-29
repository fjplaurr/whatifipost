import React, { useState, useEffect } from 'react';
import { User } from '../../interfaces';
import Routes from '../Routes';
import UserContext from '../../helpers/context';
import { loadUser, saveUser } from '../../helpers/localStorage';
import * as userEndpoints from '../../endpoints/user';

const App = () => {
  const [user, setUser] = useState<User>();

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

  return (
    <React.StrictMode>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes />
      </UserContext.Provider>
    </React.StrictMode>
  );
};

export { UserContext, App };
