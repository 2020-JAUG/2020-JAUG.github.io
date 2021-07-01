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

        return (

            <div className="spinnerContainer">
                <div className="spinner">
                    <input className="option" type="text" id="title" name="name"  onChange={updateDatos}/>
                    <button className="sendButton" name="movie" onClick={() => findTitle()}>Find</button>
                </div>
            </div>
    );
};
export default connect((state) => ({
    credentials: state.credentials,
    movies: state.movies
}))(MoviesQuery);