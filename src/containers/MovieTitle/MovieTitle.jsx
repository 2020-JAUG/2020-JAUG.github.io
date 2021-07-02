import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ADD_MOVIES } from "../../redux/types";
import { connect } from "react-redux";
import spinner from "../../assets/spinner2.gif";

const MovieTitle = (props) => {

  let history = useHistory();

    const [, setMovieTitle] = useState([]);

    //Equivalente a componentDidMount en componentes de Clase
    useEffect(() => {
      setMovieTitle(props.movies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const detail = (movies) => {
      props.dispatch({ type: ADD_MOVIES, payload: movies });
      history.push("/detail");
    };

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w200";

    if (props.movies[0]?.id) {

        return (
            <div className="allContent">
                <div className="movieContent" >
                {props.movies.map((movies, index) => (

                  <div className="content" >
                    <div className="content2" key={index} onClick={() => detail(movies)} >
                      <p className="text">{movies.title} </p>
                      <img src={`${baseImgUrl}/${size}${movies.poster_path}`} alt="poster"/>
                    </div>
                  </div>
                ))}
                </div>
            </div>
    )
    } else {
        return (
            <div className="spinnerContainer">
                    <img  src={spinner} alt="spinner" width="60" />
            </div>
        );
    }
};

export default connect((state) => ({
  credentials: state.credentials,
  movies: state.movies,
}))(MovieTitle);