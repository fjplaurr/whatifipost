import { AuthActionTypes, AuthState } from './types';

// Actions
export const SETTOKEN = 'SETTOKEN';

// Action creators
export const setToken = (payload: string): AuthActionTypes => ({
  type: SETTOKEN,
  payload,
});

// Reducer
const initialState: AuthState = {
  token: '',
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SETTOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
