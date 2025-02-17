import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && query.trim() !== '') {
            e.preventDefault();
            navigate(`/search/${query}`);
            console.log(`User searched for: ${query}`); // testing stuff
        }
    };

    return (
        <div className="search-box">
            <div className="searchbar">
                <input 
                    type="text" 
                    id="home-search" 
                    placeholder="..." 
                    value={query} 
                    onChange={handleInputChange} 
                    onKeyDown={handleKeyPress}
                />
            </div>
        </div>
    );
};

export default SearchBar;
