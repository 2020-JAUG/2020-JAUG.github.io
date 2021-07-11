import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ADD_MOVIES } from "../../redux/types";
import { connect } from "react-redux";
import spinner from "../../assets/spinner2.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UpComing = (props) => {
  let history = useHistory();

  const [movies, setUpComing] = useState([]);
  const [page, setPage] = useState(1);
  const [oldpage, setOldPage] = useState(1);

  //Equivalente a componentDidMount en componentes de Clase
  useEffect(() => {
    upcoming();
    //eslint-disable-next-line
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (page !== oldpage) {
      setOldPage(page);
      upcoming();
    }
  });

  const upcoming = async () => {
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US&page=${page}`
      );

      setUpComing(res.data.results);

      props.dispatch({ type: ADD_MOVIES, payload: res.data.results });
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const changePage = (operacion) => {
    if (operacion === "+") {
      //Cambiamos la página
      let newPage = page + 1;

      setOldPage(page);
      setPage(newPage);
    } else if (operacion === "-" && page > 1) {
      let newPage = page - 1;
      setOldPage(page);
      setPage(newPage);
    }
  };
  const clickHandler = (detail) => {
    props.dispatch({ type: ADD_MOVIES, payload: detail });
    history.push("/detail");
  };

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w200";

  if (movies[0]?.id) {
    return (
      <div className="allContent">
        <div className="movieImage">
          <div className="fondoIMage"></div>
        </div>

        <div className="movieContent">
            <div className="leftt" onClick={()=> changePage("-")}><FontAwesomeIcon icon={faArrowLeft}/></div><div Style="width: 17em;"></div>
            <div className="rightt" onClick={()=> changePage("+")}><FontAwesomeIcon icon={faArrowRight}/></div>
          {movies.map((movie, index) => (
            <div
              className="content"
              key={index}
              onClick={() => clickHandler(movie)}
            >
              <div className="content2">
                <img
                  className="imgaPort"
                  src={`${baseImgUrl}/${size}${movie.poster_path}`}
                  alt="poster"
                />
              </div>
            </div>
          ))}
            <div onClick={()=> changePage("-")}><FontAwesomeIcon icon={faArrowLeft}/></div><div Style="width: 17em;"></div>
            <div onClick={()=> changePage("+")}><FontAwesomeIcon icon={faArrowRight}/></div>
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
}))(UpComing);
