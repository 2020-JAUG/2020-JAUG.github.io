import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { ADD_MOVIES } from '../../redux/types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import  spinner  from "../../assets/spinner2.gif";

const MoviesGenre = (props) => {

    let history = useHistory();

    const [, setMovie] = useState ([]);
    const [page, setPage] = useState(1);
    const [oldpage, setOldPage] = useState(1);



    const clickHandler = (detail) => {

        props.dispatch({ type: ADD_MOVIES, payload: detail });
        history.push("/detail");
    };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(()=> {

        if(page !== oldpage){
          setOldPage(page);
          change();
        }

    });
      const changePage = (operacion) => {

        if(operacion === "+"){

          //Cambiamos la página
          let newPage = page + 1;

          setOldPage(page);
          setPage(newPage);

        } else if (operacion === "-" && page > 1) {

          let newPage = page - 1;
          setOldPage(page);
          setPage(newPage);
        }
    }

        const change = async () => {

          let genre = document.getElementById("opciones").value;

          axios
          .get(`https://api.themoviedb.org/3/discover/movie?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US&with_genres=${genre}&page=${page}`)
          .then((res) => {

              setMovie(res.data.results);

              props.dispatch({type:ADD_MOVIES, payload: res.data.results});

              history.push('/moviesgenre');
          })
          .catch(() => {
          throw new Error("Wrong user or password");
      });
      }
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

                    <div className="left" onClick={()=> changePage("-")}><FontAwesomeIcon icon={faArrowLeft}/></div>
                    <div className="left2" onClick={()=> changePage("-")}><FontAwesomeIcon icon={faArrowLeft}/></div>
                    <div className="right" onClick={()=> changePage("+")}><FontAwesomeIcon icon={faArrowRight}/></div>
                    <div className="right2" onClick={()=> changePage("+")}><FontAwesomeIcon icon={faArrowRight}/></div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="spinnerContainer">
                <div className="spinner"><img  src={spinner} alt="spinner" width="60" /></div>
            </div>
        );
    }
};
export default connect((state) => ({
    credentials: state.credentials,
    movies: state.movies
}))(MoviesGenre);