import React, { useState, useEffect } from 'react';
import TextInput from '../TextInput';
import ProfileCard from '../ProfileCard';
import { User } from '../../interfaces/User';
import * as userEndpoints from '../../endpoints/user';
import { Search } from '../../assets/icons';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userResults, setUserResults] = useState<User[]>([]);

  // Sets searched term while writing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  // Makes a search every time the user inputs a carachter
  useEffect(() => {
    const fetchUsers = async () => {
      const users: User[] = await userEndpoints.getFilteredUsers(searchTerm);
      setUserResults(users);
    };
    // Performs search only if the searchTerm is not empty
    searchTerm && fetchUsers();
  }, [searchTerm]);

  useEffect(() => {
    console.log('results are');
    console.log(userResults);
  }, [userResults]);

  return (
    <div>
      <TextInput
        type="text"
        placeholder="Search"
        onChange={handleChange}
      >
        <Search />
      </TextInput>
    </div>
  );
};

export default SearchBar;
