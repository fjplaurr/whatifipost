import { AuthActionTypes, AuthState } from './types';

// Actions
export const SETTOKEN = 'SETTOKEN';
export const SETLOGOUT = 'SETLOGOUT';

// Action creators
export const setToken = (payload: string): AuthActionTypes => ({
  type: SETTOKEN,
  payload,
});

export const setLogOut = (payload: boolean): AuthActionTypes => ({
  type: SETLOGOUT,
  payload,
});

// Reducer
const initialState: AuthState = {
  token: '',
  logsOut: false,
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SETTOKEN:
      return { ...state, token: action.payload };
    case SETLOGOUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
