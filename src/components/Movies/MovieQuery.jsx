import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { ADD_MOVIES } from '../../redux/types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MoviesQuery = (props) => {

    let history = useHistory();
    const [movie, setMovie] = useState ({
        name: "",
    });


    useEffect(() => {
        findTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // Esto es un Handler
     const updateDatos = (e) => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const clickHandler = (detail) => {

        props.dispatch({ type: ADD_MOVIES, payload: detail });
        history.push("/detail");
    };


    const findTitle = async () => {

        let query = document.getElementById("title").value;
        let body = {
            query: query,
        }

          axios
          .post("http://localhost:3001/movies/search", body)
          .then((res) => {

                props.dispatch({type:ADD_MOVIES, payload: res.data.results});
                document.getElementById("title").value = "";
                history.push('/moviesgenre');
          })
          .catch(() => {
            return Error("Wrong user or password");
        });
    }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    if (movie[0]?.id) {
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
                    <input className="option" type="text" id="title" name="name"  onChange={updateDatos}/>
                    <button className="sendButton" name="movie" onClick={() => findTitle()}>Find</button>
                </div>
            </div>
        );
    }
};
export default connect((state) => ({
    credentials: state.credentials,
    movies: state.movies
}))(MoviesQuery);