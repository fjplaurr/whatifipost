import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import SearchBarTextInput from './SearchBarTextInput';
import ProfileCard from '../ProfileCard';
import { User } from '../../interfaces/User';
import * as userEndpoints from '../../endpoints/user';
import { Search } from '../../assets/icons';
import styles from './SearchBar.module.scss';
import { UserContext } from '../../containers/App';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userResults, setUserResults] = useState<User[]>([]);
  const [ClearOut, setClearOut] = useState(false);

  // Ref for the broken down results div
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Reads current connected user from Context
  const contextUser = useContext(UserContext);

  // Sets searched term while writing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  // Makes a search every time the user inputs a carachter
  useEffect(() => {
    const fetchUsers = async () => {
      let users: User[] = await userEndpoints.getFilteredUsers(searchTerm);
      // Removes searcher user from the search
      users = users.filter((el) => el._id !== contextUser.user?._id);
      setUserResults(users);
    };
    // Performs search only if the searchTerm is not empty. If it is not
    // empty (e.g., cleaning the input), then the results must change to empty
    if (searchTerm) {
      fetchUsers();
    } else {
      setUserResults([]);
    }
  }, [searchTerm]);

  const handleUnfollow = (event: React.MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const updateFollowing = async () => {
      const followingModified = contextUser.user!.following!
        .filter((el: string) => el !== clickedUser._id);
      const modifiedUser: User = { ...contextUser.user!, following: followingModified };
      // Modify list of followed users in database
      await userEndpoints.update(modifiedUser);
      // Modify user in context
      await contextUser.setUser(modifiedUser);
    };
    const updateFollowers = async () => {
      const followersModified = clickedUser.followers!
        .filter((el: string) => el !== contextUser.user!._id);
      const modifiedUser: User = { ...clickedUser!, followers: followersModified };
      // Modify list of followers in database
      await userEndpoints.update(modifiedUser);
    };
    updateFollowing();
    updateFollowers();
  };

  const handleFollow = async (event: React.MouseEvent<HTMLButtonElement>, clickedUser: User) => {
    const updateFollowing = async () => {
      const contextUserCopy: User = { ...contextUser!.user! };
      contextUserCopy.following!.push(clickedUser._id!);
      // Modify list of followed users in database
      await userEndpoints.update(contextUserCopy);
      // Modify user in context
      await contextUser.setUser(contextUserCopy);
    };
    const updateFollowers = async () => {
      const clickedUserCopy: User = { ...clickedUser };
      clickedUserCopy.followers!.push(contextUser!.user!._id!);
      // Modify list of followers in database
      await userEndpoints.update(clickedUserCopy);
    };
    await updateFollowing();
    await updateFollowers();
  };

  const usersList = userResults.map((user: User) => {
    // If the user finds his/her own profile, then doesn't render a follow/unfollow button
    if (contextUser.user?._id === user._id) {
      return (
        <div
          key={user._id}
          className={styles.cardWrapper}
        >
          <ProfileCard
            description={user.description}
            name={user.name}
            surname={user.surname}
            picture={user.profileImage}
            id={user._id!}
          />
        </div>
      );
    }
    const usersFollowing = contextUser.user?.following;
    const allUserIds = usersFollowing?.map((element: string) => element);
    const isFollowing = allUserIds?.includes(user._id!);
    if (isFollowing) {
      return (
        <div
          key={user._id}
          className={styles.cardWrapper}
        >
          <ProfileCard
            description={user.description}
            name={user.name}
            surname={user.surname}
            picture={user.profileImage}
            id={user._id!}
            onClick={(e) => handleUnfollow(e, user)}
            textButton="Unfollow"
            colorButton="red"
            backgroundFull
          />
        </div>
      );
    }
    return (
      <div
        key={user._id}
        className={styles.cardWrapper}
      >
        <ProfileCard
          description={user.description}
          name={user.name}
          surname={user.surname}
          picture={user.profileImage}
          id={user._id!}
          onClick={(e) => handleFollow(e, user)}
          textButton="Follow"
          colorButton="blue"
          backgroundFull
        />
      </div>
    );
  });

  // Sets if the user is writing in the search input or not
  useEffect(() => {
    if (searchTerm) {
      contextUser.setIsSearching(true);
    } else {
      contextUser.setIsSearching(false);
    }
  }, [searchTerm, contextUser]);

  // Closes the search results if the user clicks outside
  useEffect(() => {
    // Detects if clicked on outside of element
    const handleClickOutside = (event: MouseEvent) => {
      // As Node used since event.target cannot be inferred to be a Node. It could have other types
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        contextUser.setIsSearching(false);
        setSearchTerm('');
        setClearOut(true);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, contextUser]);

  const brokenDownSearch = () => {
    if (contextUser.isSearching && userResults.length > 0) {
      return (
        <div className={styles.resultsWrapperShow} ref={wrapperRef}>
          {usersList}
        </div>
      );
    }
    if (contextUser.isSearching && userResults.length === 0) {
      return (
        <div className={styles.resultsWrapperShow} ref={wrapperRef}>
          <div className={styles.cardWrapper}>
            No results found.
          </div>
        </div>
      );
    }
    return <> </>;
  };

  return (
    <div className={styles.searchBarWrapper}>
      <SearchBarTextInput
        idInput="searchBar"
        type="text"
        placeholder="Search"
        onChange={handleChange}
        color="white"
        maxLength={50}
        empty={ClearOut}
      >
        <Search />
      </SearchBarTextInput>
      {/* Show div with results when the results array has data */}
      {brokenDownSearch()}
    </div>
  );
};

export default SearchBar;
