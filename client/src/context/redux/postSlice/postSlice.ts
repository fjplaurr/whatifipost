import { Post } from '../../../interfaces';
import { PostsActionTypes, PostsState } from './types';

// Actions
export const SETPOSTS = 'SETPOSTS';
export const ADDPOST = 'ADDPOST';

// Action creators
export const setPosts = (payload: Post []): PostsActionTypes => ({
  type: SETPOSTS,
  payload,
});

export const addPost = (payload: Post): PostsActionTypes => ({
  type: ADDPOST,
  payload,
});

// Reducer
const initialState: PostsState = {
  posts: [],
};

export const postsReducer = (state = initialState, action: PostsActionTypes): PostsState => {
  switch (action.type) {
    case SETPOSTS:
      return { ...state, posts: action.payload };
    case ADDPOST:
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state;
  }
};
