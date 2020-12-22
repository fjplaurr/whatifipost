import { postFile } from '../helpers/fetch';

const url = '/api/image-upload/';

// Post
const postPicture = (picture: File) => postFile(url, picture);

export { postPicture };
