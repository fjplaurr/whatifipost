import React from 'react';
import { User } from './User';

export interface Context {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
}
