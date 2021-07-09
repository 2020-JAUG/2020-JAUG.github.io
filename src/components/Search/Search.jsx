import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ADD_MOVIES } from '../../redux/types';
import { useHistory } from 'react-router';


const Search = (props) => {

    let history = useHistory();

    const [, setComedy] = useState ([]);

    const change = async () => {

        let genre = document.getElementById("opciones").value;

        axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US&with_genres=${genre}`)
        .then((res) => {

            setComedy(res.data.results);

            props.dispatch({type:ADD_MOVIES, payload: res.data.results});

            history.push('/moviesgenre');
        })
        .catch(() => {
        throw new Error("Wrong user or password");
    });
    }

    if(props.credentials?.token) {

        return (

            <div className="drop_dow-select mt-4  " >
                <select  id="opciones"  className="input  dropdown-toggle"  onChange={ change } >
                    <option value="35">Comedy</option>
                    <option value="10749">Romance</option>
                    <option value="12">Adventure</option>
                    <option value="80">Crime</option>
                    <option value="10751">Family</option>
                    <option value="878">Science Fitcion</option>
                    <option value="37">Western</option>
                </select>
          </div>
        )
    } else {
        return(
            <div></div>
        )
    }
}

export default connect((state) => ({
    credentials:state.credentials,
    movies: state.movies,
}))(Search);