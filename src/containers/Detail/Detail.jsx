import React from "react";
import "./Detail.scss";
import { connect } from "react-redux";

const Detail = (props) => {

    const baseImgUrl = "https://image.tmdb.org/t/p";
    const size = "w200";

    console.log('props', props);

    if(props.movies?.id){
  return (

    <div className="info">
      {/* {console.log(props)} */}
       <div className="content tarjeta">
            <div className="content2 tarjeta" >
                <p className="text">Name: {props.movies.title} </p>
                <img src={`${baseImgUrl}/${size}${props.movies.poster_path}`}  alt="poster"/>
                <p className="text">{props.movies.popularity}</p>
                <p className="text">{props.movies.release_date}</p>
                <p className="text">{props.movies.vote_average}</p>
                <p className="text">{props.movies.genre_id}</p>
                <p className="text">{props.movies.overview}</p>
                {/* <p className="text">{props.detalle.getSimilarMovies}</p> */}
                <div className="enviar" ></div>
            </div>
        </div>
    </div>
  );

} else {
    return (
        <div>
            ESTOY CARGANDO!
        </div>
    )
}
}

export default connect((state) => ({
  credentials: state.credentials,
  movies: state.movies,
}))(Detail);
