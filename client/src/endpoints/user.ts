import { useSelector } from 'react-redux';
import {
  get, put, deleteById,
} from '../helpers/fetch';
import { User } from '../interfaces';
import { RootState } from '../context/redux';

export const useUserFetch = () => {
  const url = '/api/users/';

  // Headers
  const token = useSelector((state: RootState) => state.auth.token);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  // Get
  const getAll = () => get(`${url}`, headers);
  const getSingle = (id: string) => get(`${url}${id}`, headers);
  const getFollowing = (id: string) => get(`${url}following/${id}`, headers);
  const getFollowers = (id: string) => get(`${url}followers/${id}`, headers);
  const getFollowingAndFollowers = (id: string): Promise<{ following: User[], followers: User[] }> => get(`${url}followingandfollowers/${id}`, headers);
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
    getFollowingAndFollowers,
    getOwnAndOthersPosts,
    getUsersPosts,
    getFilteredUsers,
  };
};
