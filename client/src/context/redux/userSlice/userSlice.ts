import { User } from '../../../interfaces';
import { UserActionTypes, UserState } from './types';

// Actions
export const SETUSER = 'SETUSER';
export const SETISSEARCHING = 'SETISSEARCHING';
export const SETWATCHINGOTHERPROFILE = 'SETWATCHINGOTHERPROFILE';
export const SETISCONFIGURINGPROFILE = 'SETISCONFIGURINGPROFILE';
export const SETFOLLOW = 'SETFOLLOW';
export const SETUNFOLLOW = 'SETUNFOLLOW';

// Action creators
export const setIsSearching = (payload: boolean): UserActionTypes => ({
  type: SETISSEARCHING,
  payload,
});

export const setIsConfiguringProfile = (payload: boolean): UserActionTypes => ({
  type: SETISCONFIGURINGPROFILE,
  payload,
});

export const setWatchingOtherProfileId = (payload: string): UserActionTypes => ({
  type: SETWATCHINGOTHERPROFILE,
  payload,
});

export const setUser = (payload: User | undefined): UserActionTypes => ({
  type: SETUSER,
  payload,
});

export const setFollowing = (payload: User[]): UserActionTypes => ({
  type: SETFOLLOW,
  payload,
});

export const setUnfollowing = (payload: User): UserActionTypes => ({
  type: SETUNFOLLOW,
  payload,
});

// Reducer
const initialState: UserState = {
  user: undefined,
  isConfiguringProfile: false,
  isSearching: false,
  watchingOtherProfileId: '',
  following: [],
};

export const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SETISCONFIGURINGPROFILE:
      return { ...state, isConfiguringProfile: action.payload };
    case SETISSEARCHING:
      return { ...state, isSearching: action.payload };
    case SETWATCHINGOTHERPROFILE:
      return { ...state, watchingOtherProfileId: action.payload };
    case SETUSER:
      return { ...state, user: action.payload };
    case SETFOLLOW:
      return { ...state, following: action.payload };
    case SETUNFOLLOW:
    {
      const followingUpdate = state.following.filter((el: any) => el._id !== action.payload._id);
      return { ...state, following: followingUpdate };
    }
    default:
      return state;
  }
};
