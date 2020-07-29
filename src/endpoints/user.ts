import {
  get, put, deleteById,
} from '../helpers/fetch';
import { User } from '../interfaces';

// const baseUrl = 'https://backend-post-application.herokuapp.com/api/users/';
const baseUrl = 'http://localhost:5000/api/users/';

// Get
const getAll = () => get(`${baseUrl}`);
const getSingle = (id: string) => get(`${baseUrl}${id}`);
const getFollowing = (id: string) => get(`${baseUrl}following/${id}`);
const getFollowers = (id: string) => get(`${baseUrl}followers/${id}`);
const getPostsFromFollowedUsers = (userId: string) => get(`${baseUrl}${userId}/following/posts`);
const getUsersPosts = (userId: string) => get(`${baseUrl}${userId}/posts`);
const getFilteredUsers = (term: string) => get(`${baseUrl}term/${term}`);

// Put
const update = (user: User) => put(`${baseUrl}${user._id}`, user);

// Delete
const deleteSingle = (id: string) => deleteById(`${baseUrl}${id}`);

export {
  getAll, getSingle, update, deleteSingle, getFollowing,
  getFollowers, getPostsFromFollowedUsers, getUsersPosts,
  getFilteredUsers,
};
