import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter'  && query.trim() !== '') {
            e.preventDefault();
            navigate(`/search/${query}`);
            console.log(`User searched for: ${query}`); //testing stuff
        }
    };

    return (
        <form action="/" method="GET">
        <div className="home-box">
            <div className="search-box">
                <div className="searchprompt">
                    <h2>What are you watching?</h2>
                </div>

                <div className="searchbar">
                    <input type="text" id="home-search" placeholder="..." value={query} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
                </div>
            </div>
        </div>
        </form>
    )
};

export default Home;