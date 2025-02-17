import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js';
import axios from 'axios';

const key = process.env.REACT_APP_apiKey;

export const SearchResults = () => {    
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getResults = async () => {
            try{
                const response = await axios.get(`https://api.watchmode.com/v1/autocomplete-search/`, {
                    params: {
                        apiKey: key,
                        search_value: query,
                        search_type: 1,
                    },
                });

                setResults(response.data.results || []);

                console.log(response.data);
            }
            catch(err){
                console.error('Error:', err); 
            }
        }

        getResults();

    }, [query]);

    const handleClick = (id) => {
        navigate(`/details/${id}`)
    }
    
    return (
        <div className='searchresults-box'>
            <div className='logo'>
                <h1>WatchItNow!</h1>
            </div>
            <div className='query'>
                <h3>Search Results for "{query}"</h3>
            </div>
            <div className="searchbar">
                <SearchBar/>
            </div>

            {results.length > 0 ? (
                <div className="results-grid">
                    {results.map((result) => (
                        <div key={result.id} className="result-card" onClick={() => handleClick(result.id)}>
                            <img
                                src={result.image_url}
                                alt={`${result.name} Poster`}
                                className="result-image"
                            />
                            <div className="result-info">
                                <h3>{result.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found for "{query}".</p>
            )}
            
        </div>
    )
};

export default SearchResults;