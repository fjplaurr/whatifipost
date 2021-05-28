import { createStore, combineReducers } from 'redux';
import { userReducer } from './userSlice/userSlice';
import { authReducer } from './authSlice/authSlice';
import { postsReducer } from './postSlice/postSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  posts: postsReducer,
});

const devTools = process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__
  && (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (a: any) => a;

export const store = createStore(
  rootReducer,
  devTools,
);
