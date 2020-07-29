import * as userEndpoints from '../endpoints/user';
import { User } from '../interfaces';

const loadUser = () => {
  const serializedState = localStorage.getItem('user');
  const parsedObject: {
    id: string,
    token: string,
  } = serializedState && JSON.parse(serializedState);
  return parsedObject;
};

const saveUser = (id: string) => {
  const serializedState = JSON.stringify({ id });
  localStorage.setItem('user', serializedState);
};

export { loadUser, saveUser };
