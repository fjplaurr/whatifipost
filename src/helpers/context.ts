import { createContext } from 'react';
import { Context } from '../interfaces';

const UserContext = createContext<Context>({
  user: undefined,
  setUser: () => { },
});

export default UserContext;
