import { post } from '../helpers/fetch';
import { baseUrl } from '../config';
var url = baseUrl + "auth/";
// Post
var signup = function (user) { return post(url + "signup", user); };
var signin = function (_a) {
    var email = _a.email, password = _a.password;
    return post(url + "signin", { email: email, password: password });
};
export { signup, signin };
