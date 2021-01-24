import { postFile } from '../helpers/fetch';
import { getHeadersIfLocalStorage } from '../helpers/localStorage';

const useUploadFetch = () => {
  const url = '/api/image-upload/';
  const headers = getHeadersIfLocalStorage();

  // Post
  const postPicture = (picture: File) => postFile(url, picture, headers);
  return { postPicture };
};

export { useUploadFetch };
