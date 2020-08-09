import { get, post, put, deleteById, } from '../helpers/fetch';
import { baseUrl } from '../config';
var url = baseUrl + "posts/";
// Get
var getAll = function () { return get("" + url); };
var getSingle = function (id) { return get("" + url + id); };
// Post
var create = function (message) { return post("" + url, message); };
// Put
var update = function (message) { return put("" + url + message._id, message); };
// Delete
var deleteSingle = function (id) { return deleteById("" + url + id); };
export { getAll, getSingle, create, update, deleteSingle, };
