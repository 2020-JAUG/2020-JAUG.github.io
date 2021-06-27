import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../../components/Cart/Cart";
import { ADD_MOVIES } from '../../redux/types';


const Detail = (props) => {

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size_back_drop = "w1280";
  const size = "w300";

  const rent = () => {

    props.dispatch({type:ADD_MOVIES,payload: props.movies});
  }


  if (props.movies?.id) {
    return (
      <div className="contentDetail">
        <div className="vistaDetail">
          <div className="imagenD">
            <img
              src={`${baseImgUrl}/${size}${props.movies.poster_path}`}
              alt="poster"
            />
          <img className="back_img" src={`${baseImgUrl}/${size_back_drop}${props.movies.backdrop_path}`}
          alt="backdrop_path"/>
          </div>
          <div className="contentSpan">
            <div className="textD titleD">{props.movies.original_title} </div>
            <div className="textD vote">Vote {props.movies.vote_average}</div>
            <div className="textD">populatity{props.movies.popularity}</div>
            <div className="textD">premiere{props.movies.release_date}</div>
            <div className="textD">original language {props.movies.original_language}</div>
            <div className="textD">Overview {props.movies.overview}</div>
            {/* <p className="text">{props.movies.getSimilarMovies}</p> */}
          </div>
        </div>

        <Cart />
        <Link to={"/rentmovie"} onClick={() => rent()}>RentCart</Link>
        <div className="arrows">
          <Link className="" to={"/upcoming"}>
            Go Back
          </Link>
          <Link to={"/toprated"}>topRated</Link>
        </div>
      </div>
    );
  } else {
    return <div>ESTOY CARGANDO!</div>;
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  movies: state.movies,
}))(Detail);
