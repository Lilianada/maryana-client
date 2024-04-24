import React, { useState } from 'react';
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      onSearch(searchQuery); 
    };
  
    return (
      <form onSubmit={handleSearchSubmit} className="search_form">
          <input
            type="text"
            placeholder="Search for a Stock..."
            value={searchQuery}
            onChange={handleSearchChange}
            className='input_field'
          />
          <button type="submit" className='pass_icon'>
            <BiSearch size={20}/> 
          </button>
        <div className="search_field">

        </div>
      </form>
    );
  };
  

export default SearchBar;
