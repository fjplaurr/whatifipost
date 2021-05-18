import * as actions from './authSlice';

interface setToken {
  type: typeof actions.SETTOKEN,
  payload: string
}

export type AuthActionTypes = setToken;

export interface AuthState {
  token: string,
}
