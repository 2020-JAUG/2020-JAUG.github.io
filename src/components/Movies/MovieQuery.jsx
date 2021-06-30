import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ADD_MOVIES } from '../../redux/types';
import { useHistory } from 'react-router';


const MovieQuery = (props) => {

    let history = useHistory();

    const [querys, setQuerys] = useState ([]);
    const [title, setTitle] = useState ([]);

     // Esto es un Handler
     const updateDatos = (e) => {
        setQuerys({...querys, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        setQuerys();
    }, []);

    const query = async (props) => {

        let query = document.getElementById("title").value;
        let body = {
            query: query
        }

        axios
        .post("http://localhost:3001/movies/search", body)
        .then((res) => {
            setTitle(res.data.results);
            // history.push("/movietitle");
            console.log('datos', res.data.results);
            //Guardo en RDX
            props.dispatch({type:ADD_MOVIES, payload: res.data.results});
        })
        .catch((err) => {
            // console.log(err.response.data.message);
            return Error("Files not Found");
        });
    }
    const clickHandler = (detail) => {
        props.dispatch({ type: ADD_MOVIES, payload: detail });
            // history.push("/movietitle");
    };

    // if(props.movies?.id) {

    //     return (

    //         <div>
    //             <input className="option" type="text" id="title"  onChange={updateDatos}/>
    //             <button className="sendButton" name="movie" onClick={() => query()}>Find</button>
    //         </div>
    //     )
    // }

    const baseImgUrl = "https://image.tmdb.org/t/p";
    const size = "w200";

    if(title[0]?.id) {

        return(

            <div className="movieContent">

            {title.map((movie, index) => (

                <div className="content" onClick={() => clickHandler(movie)}  key={index}>
                    <div className="content2"  >
                            <p className="text">{movie.title} </p>
                            <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                            {/* <p className="text">{movie.popularity}</p> */}
                            {/* <p className="text">{movie.release_date}</p>
                            {/* <p className="text">{movie.vote_average}</p>
                            {/* <p className="text">{movie.genre_id}</p>
                            {/* <p className="text">{movie.overview}</p> */}
                            {/* <p className="text">{movie.getSimilarMovies}</p>
                        {/* <div className="enviar" onClick={() => llevame()}></div> */}
                    </div>
                </div>
            ))}
        </div>
    )} else {
        return(
            <div>
               <input className="option" type="text" id="title"  onChange={updateDatos}/>
               <button className="sendButton" name="movie" onClick={() => query()}>Find</button>
            </div>
        )
    }
}

export default connect((state) => ({
    credentials:state.credentials,
    movies: state.movies,
}))(MovieQuery);