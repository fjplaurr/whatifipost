import { createContext } from 'react';
import { Context } from '../interfaces';

const UserContext = createContext<Context>({
  user: undefined,
  setUser: () => { },
  isSearching: false,
  setIsSearching: () => { },
  isPosting: false,
  setIsPosting: () => { },
  watchingOtherProfileId: '',
  setWatchingOtherProfileId: () => { },
  isConfiguringProfile: false,
  setIsConfiguringProfile: () => { },
});

export default UserContext;
