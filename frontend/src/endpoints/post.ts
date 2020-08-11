import {
  get, post, put, deleteById,
} from '../helpers/fetch';
import { Post } from '../interfaces';
import { baseUrl } from '../config';

const url = `${baseUrl}posts/`;

// Get
const getAll = () => get(`${url}`);
const getSingle = (id: string) => get(`${url}${id}`);

// Post
const create = (message: Post) => post(`${url}`, message);

// Put
const update = (message: Post) => put(`${url}${message._id}`, message);

// Delete
const deleteSingle = (id: string) => deleteById(`${url}${id}`);

export {
  getAll, getSingle, create, update, deleteSingle,
};
