import { postFile } from '../helpers/fetch';
import { baseUrl } from '../config';
var url = baseUrl + "image-upload/";
// Post
var postPicture = function (picture) { return postFile(url, picture); };
export { postPicture };
