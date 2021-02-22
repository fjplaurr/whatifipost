import * as actions from './userSlice';
import { User } from '../../../interfaces';

interface setIsSearchingAction {
  type: typeof actions.SETISSEARCHING,
  payload: boolean
}

interface setIsConfiguringProfileAction {
  type: typeof actions.SETISCONFIGURINGPROFILE,
  payload: boolean
}

interface setWatchingOtherProfileIdAction {
  type: typeof actions.SETWATCHINGOTHERPROFILE,
  payload: string,
}

interface setUserAction {
  type: typeof actions.SETUSER,
  payload: User | undefined
}

interface setFollowingAction {
  type: typeof actions.SETFOLLOW,
  payload: User[]
}

interface setUnfollowingAction {
  type: typeof actions.SETUNFOLLOW,
  payload: User
}

export type UserActionTypes = setIsSearchingAction | setIsConfiguringProfileAction
   | setWatchingOtherProfileIdAction | setUserAction |
  setFollowingAction | setUnfollowingAction

export interface UserState {
  user: User | undefined,
  isSearching: boolean,
  watchingOtherProfileId: string,
  isConfiguringProfile: boolean,
  following: User[],
}
