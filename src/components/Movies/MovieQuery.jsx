import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ADD_MOVIES } from '../../redux/types';
import { useHistory } from 'react-router';


const MovieQuery = (props) => {

    let history = useHistory();

    const [querys, setQuerys] = useState ([]);

     // Esto es un Handler
     const updateDatos = (e) => {
        setQuerys({...querys, [e.target.name]: e.target.value})
    }

    const query = async (props) => {

        let query = document.getElementById("title").value;
        let body = {
            query: query
        }

        axios
        .post("http://localhost:3001/movies/search", body)
        .then((res) => {
            setQuerys(res.data.results);
            history.push("/detail");
            console.log('datos', res.data.results);
            //Guardo en RDX
            props.dispatch({type:ADD_MOVIES, payload: res.data.results});
        })
        .catch((err) => {
            // console.log(err.response.data.message);
            return Error("Files not Found");
        });
    }

    if(props.credentials?.token) {

        return (

            <div>
                <input className="option" type="text" id="title"  onChange={updateDatos}/>
                <button className="sendButton" name="movie" onClick={() => query()}>Find</button>
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
}))(MovieQuery);