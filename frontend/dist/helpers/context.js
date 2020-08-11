import { createContext } from 'react';
var UserContext = createContext({
    user: undefined,
    setUser: function () { },
    isSearching: false,
    setIsSearching: function () { },
    isPosting: false,
    setIsPosting: function () { },
    watchingOtherProfileId: '',
    setWatchingOtherProfileId: function () { },
    isConfiguringProfile: false,
    setIsConfiguringProfile: function () { },
});
export default UserContext;
