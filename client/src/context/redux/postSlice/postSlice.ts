import { Post } from '../../../interfaces';
import { PostsActionTypes, PostsState } from './types';

// Actions
export const SETPOSTS = 'SETPOSTS';
export const ADDPOST = 'ADDPOST';
export const DELETEPOST = 'DELETEPOST';

// Action creators
export const setPosts = (payload: Post[]): PostsActionTypes => ({
  type: SETPOSTS,
  payload,
});

export const addPost = (payload: Post): PostsActionTypes => ({
  type: ADDPOST,
  payload,
});

export const deletePost = (payload: string): PostsActionTypes => ({
  type: DELETEPOST,
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
    case DELETEPOST: {
      const filteredPosts = state.posts.filter((post) => post._id !== action.payload);
      return { ...state, posts: filteredPosts };
    }
    default:
      return state;
  }
};
