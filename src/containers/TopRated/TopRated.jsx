import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./TopRated.css";
import axios from "axios";
import { ADD_MOVIES } from "../../redux/types";
import { connect } from "react-redux";
import spinner from "../../assets/spinner2.gif";

const TopRated = (props) => {
  let history = useHistory();

  const [rated, setRated] = useState([]);

  //Equivalente a componentDidMount en componentes de Clase
  useEffect(() => {
    topRated();
  }, []);

  const topRated = async () => {
    try {
      let res = await axios.get("http://localhost:3001/movies");

      setRated(res.data.results);

      console.log(res.data.results);

      props.dispatch({ type: ADD_MOVIES, payload: res.data.results });
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const clickHandler = (detail) => {

    props.dispatch({ type: ADD_MOVIES, payload: detail });
    history.push("/detail");
  };
  // const llevame = () => {

  //     let token = props.credentials?.token;

  //     if(!token) {
  //         history.push("/login")
  //     } else {

  //         history.push("/appointments");
  //     }
  // }

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w200";

  if (rated[0]?.id) {
    return (
      <div className="allContent">
        <div className="movieImage">
          <div className="fondoIMage"></div>
        </div>

        <div className="movieContent">
          {rated.map((movie, index) => (
            <div className="content" onClick={() => clickHandler(movie)}>
              <div className="content2" key={index}>
                <p className="text">Name: {movie.title} </p>
                <img
                  src={`${baseImgUrl}/${size}${movie.poster_path}`}
                  alt="poster"
                />
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
      </div>
    );
  } else {
    return (
      <div className="spinnerContainer">
        <div className="spinner">
          <img src={spinner} alt="spinner" width="60" />
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  movies: state.movies,
}))(TopRated);
