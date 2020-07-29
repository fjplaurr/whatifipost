import {
  get, post, put, deleteById,
} from '../helpers/fetch';
import { Post } from '../interfaces';

// const baseUrl = 'https://backend-post-application.herokuapp.com/api/posts/';
const baseUrl = 'http://localhost:5000/api/posts/';

// Get
const getAll = () => get(`${baseUrl}`);
const getSingle = (id: string) => get(`${baseUrl}${id}`);

// Post
const create = (message: Post) => post(`${baseUrl}`, message);

// Put
const update = (message: Post) => put(`${baseUrl}${message._id}`, message);

// Delete
const deleteSingle = (id: string) => deleteById(`${baseUrl}${id}`);

export {
  getAll, getSingle, create, update, deleteSingle
};
