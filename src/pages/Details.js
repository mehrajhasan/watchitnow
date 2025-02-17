import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const key = process.env.REACT_APP_apiKey;

export const Details = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [sources, setSources] = useState([]);

    useEffect(() => {

        const getDetails = async () => {
            try{
                const response = await axios.get(`https://api.watchmode.com/v1/title/${id}/details/?apiKey=${key}`);

                setDetails(response.data || {});
                console.log(response.data);
            }
            catch(err){
                console.error('Error:', err); 
            }
        }

        getDetails();

        const getSources = async () => {
            try{
                const response = await axios.get(`https://api.watchmode.com/v1/title/${id}/sources/?apiKey=${key}`);

                setSources(response.data || []);
                console.log(response.data);
            }
            catch(err){
                console.error('Error:', err);
            }
        }

        getSources();

    }, [id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="results-box">
            <div className='logo'>
                <h1>WatchItNow!</h1>
            </div>
            <div className="searchbar">
                <SearchBar/>
            </div>
            <div className="movieDetails">
                <div className="moviePoster">
                    <img src={details.posterLarge} alt={`${details.name} Poster`} className="poster-image"/>
                </div>
                
                <div className="movieMore">
                    <div className="movieNotes">
                        <div className="movieTitle">
                            <h2>{details.title}</h2>
                            <h4>{details.year} &#183; {details.us_rating} &#183; {Math.floor(details.runtime_minutes / 60)}h {details.runtime_minutes % 60}m</h4>
                        </div>

                        <div className="movieDesc">
                            <h4>{details.plot_overview}</h4>
                        </div>

                        <div className="movieTrailer">
                            <iframe
                                width="448"
                                height="252"
                                src={`https://www.youtube.com/embed/${details.trailer.split("v=")[1]}`}
                                title="Movie Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <div className="movieSources">
                {sources.length > 0 ? (
                    <div className="sources-grid">
                        <ul>
                            <h1>Streaming at:</h1>
                            {sources.filter((source) => source.region === 'US' && source.type !== 'rent' && source.type !== 'buy' && source.type !== 'tve').map((source) => (
                                <li key={source.source_id} className="source-card">
                                    <a href={source.web_url}>
                                        <h3>{source.name}</h3>
                                    </a>
                                    <h4>{source.type === 'sub'
                                            ? 'Subscription Required'
                                            : source.type === 'free'
                                            ? 'Free'
                                            : source.type
                                        }
                                    </h4>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No sources available</p>
                )}
            </div>
            

        </div>
    );
};

export default Details;