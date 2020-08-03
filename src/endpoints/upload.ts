import { postFile } from '../helpers/fetch';

// const baseUrl = 'https://backend-post-application.herokuapp.com/api/posts/';
const baseUrl = 'http://localhost:5000/api/image-upload/';

// Post
const postPicture = (picture: File) => postFile(baseUrl, picture);

export { postPicture };
