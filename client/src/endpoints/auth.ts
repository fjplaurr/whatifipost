import { useSelector } from 'react-redux';
import { post } from '../helpers/fetch';
import { User } from '../interfaces';
import { RootState } from '../context/redux';

export const useAuthFetch = () => {
  const url = '/api/auth/';

  // Headers
  const token = useSelector((state: RootState) => state.auth.token);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  // Post
  const signup = (user: User) => post(`${url}signup`, user);
  const signin = ({ email, password }: { email: string, password: string }) => post(`${url}signin`, { email, password }, headers);

  return {
    signup,
    signin,
  };
};
