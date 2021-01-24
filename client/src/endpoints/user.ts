import {
  get, put, deleteById,
} from '../helpers/fetch';
import { User } from '../interfaces';
import { getHeadersIfLocalStorage } from '../helpers/localStorage';

const useUserFetch = () => {
  const url = '/api/users/';
  const headers = getHeadersIfLocalStorage();

  // Get
  const getAll = () => get(`${url}`, headers);
  const getSingle = (id: string) => get(`${url}${id}`, headers);
  const getFollowing = (id: string) => get(`${url}following/${id}`, headers);
  const getFollowers = (id: string) => get(`${url}followers/${id}`, headers);
  const getOwnAndOthersPosts = (userId: string) => get(`${url}${userId}/following/posts`, headers);
  const getUsersPosts = (userId: string) => get(`${url}${userId}/posts`, headers);
  const getFilteredUsers = (term: string) => get(`${url}term/${term}`, headers);

  // Put
  const update = (user: User) => put(`${url}${user._id}`, user, headers);

  // Delete
  const deleteSingle = (id: string) => deleteById(`${url}${id}`, headers);

  return {
    getAll,
    getSingle,
    update,
    deleteSingle,
    getFollowing,
    getFollowers,
    getOwnAndOthersPosts,
    getUsersPosts,
    getFilteredUsers,
  };
};

export { useUserFetch };
