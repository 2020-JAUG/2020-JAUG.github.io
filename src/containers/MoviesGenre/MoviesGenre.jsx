import React from "react";
import { connect } from 'react-redux';
import { ADD_MOVIES } from '../../redux/types';
import { useHistory } from 'react-router-dom';

const MoviesGenre = (props) => {

    let history = useHistory();

    const clickHandler = (detail) => {

        props.dispatch({ type: ADD_MOVIES, payload: detail });
        history.push("/detail");
      };

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    if (props.movies[0]?.id) {
        return (
            <div className="allContent">
                <div className="movieImage">
                    <div className="fondoIMage"></div>
                </div>
                <div className="movieContent" >
                    {props.movies.map((movie, index) => (
                        <div className="content" key={index} onClick={() => clickHandler(movie)}>
                            <div className="content2" >
                                <p className="text">{movie.title} </p>
                                <img src={`${baseImgUrl}/${size}${movie.poster_path}`} alt="poster"/>
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
                    {/* <img  src={spinner} alt="spinner" width="60" /> */}
                    cargando...
                </div>
            </div>
        );
    }
};
export default connect((state) => ({
    credentials: state.credentials,
    movies: state.movies
}))(MoviesGenre);