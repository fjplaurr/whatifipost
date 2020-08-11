import { postFile } from '../helpers/fetch';
import { baseUrl } from '../config';

const url = `${baseUrl}image-upload/`;

// Post
const postPicture = (picture: File) => postFile(url, picture);

export { postPicture };
