import React from 'react';
import { User } from './User';

export interface Context {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  isSearching: boolean,
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
  isPosting: boolean,
  setIsPosting: React.Dispatch<React.SetStateAction<boolean>>,
  watchingOtherProfileId: string,
  setWatchingOtherProfileId: React.Dispatch<React.SetStateAction<string>>,
  isConfiguringProfile: boolean,
  setIsConfiguringProfile: React.Dispatch<React.SetStateAction<boolean>>,
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>,
}
