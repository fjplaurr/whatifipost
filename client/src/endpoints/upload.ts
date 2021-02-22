import { useSelector } from 'react-redux';
import { postFile } from '../helpers/fetch';
import { RootState } from '../context/redux';

export const useUploadFetch = () => {
  const url = '/api/image-upload/';

  // Headers
  const token = useSelector((state: RootState) => state.auth.token);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  // Post
  const postPicture = (picture: File) => postFile(url, picture, headers);
  return { postPicture };
};
