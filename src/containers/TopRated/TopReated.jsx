
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './TopReated.css';
import axios from 'axios';
import { ADD_CHARACTERS } from '../../redux/types';
import { connect } from 'react-redux';
import spinner from '../../assets/spinner2.gif';


const TopReated = (props) => {

    let history = useHistory();

    const [ reated, setReated ] = useState([]);

    //Equivalente a componentDidMount en componentes de Clase
    useEffect(() =>{
        topRated();
    },[]);

    const topRated = async () => {
        try {
            let res = await axios.get("http://localhost:3001/movies");

            setReated(res.data.results);

            console.log( res.data.results);

            props.dispatch({type:ADD_CHARACTERS,payload:res.data.results});
        } catch (error) {
            console.log( { message: error.message} );
        }
    }

    const clickHandler = () => {
        history.push('/detail');
    }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    if(reated[0]?.id) {
        return (

            <div className="allContent">

                <div className="movieImage">
                    <div className="fondoIMage"></div>
                </div>

                <div className="movieContent">

                    {reated.map((movie, index) => (

                        <div className="content" onClick={()=>clickHandler(movie)}>
                            <div className="content2" key={index} >
                                    <p className="text">Name: {movie.title} </p>
                                    <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                                    {/* <p className="text">{movie.popularity}</p> */}
                                    {/* <p className="text">{movie.release_date}</p> */}
                                    {/* <p className="text">{movie.vote_average}</p> */}
                                    {/* <p className="text">{movie.genre_id}</p> */}
                                    {/* <p className="text">{movie.overview}</p> */}
                                    {/* <p className="text">{movie.getSimilarMovies}</p> */}

                                {/* <div className="enviar" onClick={() => llevame()}></div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (

            <div className="spinnerContainer">
              <div className="spinner">
                 <img  src={spinner} alt="spinner" width="60" />
              </div>
            </div>
        );
    }
}

export default connect((state) => ({

    credentials:state.credentials

}))(TopReated);