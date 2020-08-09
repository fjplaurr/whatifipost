import { get, put, deleteById, } from '../helpers/fetch';
import { baseUrl } from '../config';
var url = baseUrl + "users/";
// Get
var getAll = function () { return get("" + url); };
var getSingle = function (id) { return get("" + url + id); };
var getFollowing = function (id) { return get(url + "following/" + id); };
var getFollowers = function (id) { return get(url + "followers/" + id); };
var getPostsFromFollowedUsers = function (userId) { return get("" + url + userId + "/following/posts"); };
var getUsersPosts = function (userId) { return get("" + url + userId + "/posts"); };
var getFilteredUsers = function (term) { return get(url + "term/" + term); };
// Put
var update = function (user) { return put("" + url + user._id, user); };
// Delete
var deleteSingle = function (id) { return deleteById("" + url + id); };
export { getAll, getSingle, update, deleteSingle, getFollowing, getFollowers, getPostsFromFollowedUsers, getUsersPosts, getFilteredUsers, };
