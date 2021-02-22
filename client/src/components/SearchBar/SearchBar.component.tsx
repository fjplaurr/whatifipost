import React, {
  useState, useEffect, useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBarTextInput from './SearchBarTextInput';
import ProfileCard from '../ProfileCard';
import { User } from '../../interfaces/User';
import { useUserFetch } from '../../endpoints';
import { Search } from '../../assets/icons';
import styles from './SearchBar.module.scss';
import { setIsSearching, RootState } from '../../context/redux';
import { useFollow } from '../../hooks';

const SearchBar = () => {
  // Global state
  const user = useSelector((state: RootState) => state.user.user);
  const isSearching = useSelector((state: RootState) => state.user.isSearching);
  const dispatch = useDispatch();

  // Hooks
  const { handleFollow, handleUnfollow } = useFollow();

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [userResults, setUserResults] = useState<User[]>([]);
  const [ClearOut, setClearOut] = useState(false);

  // Endpoints
  const { getFilteredUsers } = useUserFetch();

  // Ref for the broken down results div
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sets searched term while writing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  // Makes a search at 300ms since last tyiping from the user
  useEffect(() => {
    const delayId = setTimeout(() => {
      const fetchUsers = async () => {
        let users: User[] = await getFilteredUsers(searchTerm);
        // Removes searcher user from the search
        users = users.filter((el) => el._id !== user?._id);
        setUserResults(users);
      };
      // Performs search only if the searchTerm is not empty. If it is not
      // empty (e.g., cleaning the input), then the results must change to empty
      if (searchTerm) {
        fetchUsers();
      } else {
        setUserResults([]);
      }
    }, 300);
    return () => clearTimeout(delayId);
  }, [searchTerm]);

  const usersList = userResults.map((userSearched: User) => {
    // If the user finds his/her own profile, then doesn't render a follow/unfollow button
    if (user?._id === userSearched._id) {
      return (
        <div
          key={userSearched._id}
          className={styles.cardWrapper}
        >
          <ProfileCard
            description={userSearched.description}
            name={userSearched.name}
            surname={userSearched.surname}
            picture={userSearched.profileImage}
            id={userSearched._id!}
          />
        </div>
      );
    }
    const allUserIds = user!.following?.map((element: string) => element);
    const isFollowing = allUserIds?.includes(userSearched._id!);
    if (isFollowing) {
      return (
        <div
          key={userSearched._id}
          className={styles.cardWrapper}
        >
          <ProfileCard
            description={userSearched.description}
            name={userSearched.name}
            surname={userSearched.surname}
            picture={userSearched.profileImage}
            id={userSearched._id!}
            onClick={(e: any) => handleUnfollow(e, userSearched)}
            textButton="Unfollow"
            colorButton="red"
            backgroundFull
          />
        </div>
      );
    }
    return (
      <div
        key={userSearched._id}
        className={styles.cardWrapper}
      >
        <ProfileCard
          description={userSearched.description}
          name={userSearched.name}
          surname={userSearched.surname}
          picture={userSearched.profileImage}
          id={userSearched._id!}
          onClick={(e: any) => handleFollow(e, userSearched)}
          textButton="Follow"
          colorButton="blue"
          backgroundFull
        />
      </div>
    );
  });

  // Sets if the user is writing in the search input or not
  useEffect(() => {
    if (searchTerm && !isSearching) {
      dispatch(setIsSearching(true));
    }
  }, [searchTerm]);

  // Closes the search results if the user clicks outside
  useEffect(() => {
    // Detects if clicked on outside of element
    const handleClickOutside = (event: MouseEvent) => {
      // As Node used since event.target cannot be inferred to be a Node. It could have other types
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        dispatch(setIsSearching(false));
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
  }, [wrapperRef]);

  const brokenDownSearch = () => {
    if (isSearching && userResults.length > 0) {
      return (
        <div className={styles.resultsWrapperShow} ref={wrapperRef}>
          {usersList}
        </div>
      );
    }
    if (isSearching && userResults.length === 0) {
      return (
        <div className={styles.resultsWrapperShow} ref={wrapperRef}>
          <div className={styles.cardWrapper}>
            <FontAwesomeIcon size="3x" icon={faSpinner} pulse />
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
