import { post } from '../helpers/fetch';
import { User } from '../interfaces';
// const baseUrl = 'https://backend-post-application.herokuapp.com/api/auth/';
const baseUrl = 'http://localhost:5000/api/auth/';

// Post
const signup = (user: User) => post(`${baseUrl}signup`, user);
const signin = ({ email, password }: { email: string, password: string }) => post(`${baseUrl}signin`, { email, password });

export { signup, signin };
