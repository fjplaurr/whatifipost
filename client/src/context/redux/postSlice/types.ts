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

interface deletePost {
  type: typeof actions.DELETEPOST,
  payload: string
}

export type PostsActionTypes = setPosts | addPost | deletePost

export interface PostsState {
  posts: Post [],
}
