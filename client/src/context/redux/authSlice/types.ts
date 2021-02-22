import * as actions from './authSlice';

interface setToken {
  type: typeof actions.SETTOKEN,
  payload: string
}

interface setLogOut {
  type: typeof actions.SETLOGOUT,
  payload: boolean
}

export type AuthActionTypes = setToken | setLogOut

export interface AuthState {
  token: string,
  logsOut: boolean,
}
