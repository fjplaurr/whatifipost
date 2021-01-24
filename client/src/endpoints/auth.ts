import { post } from '../helpers/fetch';
import { User } from '../interfaces';
import { getHeadersIfLocalStorage } from '../helpers/localStorage';

const useAuthFetch = () => {
  const url = '/api/auth/';
  const headers = getHeadersIfLocalStorage();

  // Post
  const signup = (user: User) => post(`${url}signup`, user);
  const signin = ({ email, password }: { email: string, password: string }) => post(`${url}signin`, { email, password }, headers);

  return { signup, signin };
};

export { useAuthFetch };
