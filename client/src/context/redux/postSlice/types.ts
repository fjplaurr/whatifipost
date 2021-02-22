import * as actions from './postSlice';
import { Post } from '../../../interfaces';

interface setPosts {
  type: typeof actions.SETPOSTS,
  payload: Post []
}

interface addPost {
  type: typeof actions.ADDPOST,
  payload: Post
}

export type PostsActionTypes = setPosts | addPost

export interface PostsState {
  posts: Post [],
}
