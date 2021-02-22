import { useSelector } from 'react-redux';
import {
  get, post, put, deleteById,
} from '../helpers/fetch';
import { Post } from '../interfaces';
import { RootState } from '../context/redux';

export const usePostFetch = () => {
  const url = '/api/posts/';

  // Headers
  const token = useSelector((state: RootState) => state.auth.token);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  // Get
  const getAll = () => get(`${url}`, headers);
  const getSingle = (id: string) => get(`${url}${id}`, headers);

  // Post
  const create = (message: Post) => post(`${url}`, message, headers);

  // Put
  const update = (message: Post) => put(`${url}${message._id}`, message, headers);

  // Delete
  const deleteSingle = (id: string) => deleteById(`${url}${id}`, headers);

  return {
    getAll,
    getSingle,
    create,
    update,
    deleteSingle,
  };
};
