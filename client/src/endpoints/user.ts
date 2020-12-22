import {
  get, put, deleteById,
} from '../helpers/fetch';
import { User } from '../interfaces';

const url = '/api/users/';

// Get
const getAll = () => get(`${url}`);
const getSingle = (id: string) => get(`${url}${id}`);
const getFollowing = (id: string) => get(`${url}following/${id}`);
const getFollowers = (id: string) => get(`${url}followers/${id}`);
const getOwnAndOthersPosts = (userId: string) => get(`${url}${userId}/following/posts`);
const getUsersPosts = (userId: string) => get(`${url}${userId}/posts`);
const getFilteredUsers = (term: string) => get(`${url}term/${term}`);

// Put
const update = (user: User) => put(`${url}${user._id}`, user);

// Delete
const deleteSingle = (id: string) => deleteById(`${url}${id}`);

export {
  getAll, getSingle, update, deleteSingle, getFollowing,
  getFollowers, getOwnAndOthersPosts, getUsersPosts, getFilteredUsers,
};
