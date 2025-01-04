import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const key = process.env.REACT_APP_apiKey;

export const Details = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);

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

    }, [id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="results-box">
            <div className='logo'>
                <h1>WatchItNow!</h1>
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
                    </div>
                </div>
            </div>
            
            <div className="movieSources">

            </div>
            

        </div>
    );
};

export default Details;