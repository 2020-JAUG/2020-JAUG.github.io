import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Detail = (props) => {
  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w300";


 

  if (props.movies?.id) {
    return (
      <div className="contentDetail">
        <div className="vistaDetail">
          <div className="imagenD">
            <img
              src={`${baseImgUrl}/${size}${props.movies.poster_path}`}
              alt="poster"
            />
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
        <Link to={"/rent"}>Rent</Link>
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
