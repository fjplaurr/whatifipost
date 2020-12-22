import { post } from '../helpers/fetch';
import { User } from '../interfaces';

const url = '/api/auth/';

// Post
const signup = (user: User) => post(`${url}signup`, user);
const signin = ({ email, password }: { email: string, password: string }) => post(`${url}signin`, { email, password });

export { signup, signin };
