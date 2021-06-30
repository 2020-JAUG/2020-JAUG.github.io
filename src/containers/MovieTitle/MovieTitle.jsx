import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import { ADD_MOVIES } from "../../redux/types";
import { connect } from "react-redux";
// import spinner from "../../assets/spinner2.gif";

const MovieTitle = (props) => {

  let history = useHistory();

    const [page, setPage] = useState(1);
    const [oldpage, setOldPage] = useState(1);

    //Equivalente a componentDidMount en componentes de Clase
    useEffect(() =>{
        // topRated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> {

        if(page !== oldpage){
            setOldPage(page);
            // topRated();
        }

    });

    // const topRated = async () => {
    //     try {
    //         let res = await axios.get(`https://api.themoviedb.org/3/movie/api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US&page=${page}`);

    //         // setRated(res.data.results);
    //         props.dispatch({type:ADD_MOVIES,payload:res.data.results});
    //     } catch (error) {
    //         console.log( { message: error.message} );
    //     }
    // }

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
    const clickHandler = (detail) => {

      props.dispatch({ type: ADD_MOVIES, payload: detail });
      history.push("/detail");
    };

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w200";


    if (props.movies[0]?.id) {

        console.log( props.movies.id);
        return (
            <div className="allContent">

                <div className="boton" onClick={()=> changePage("-")}>ANTERIOR</div>
                <div className="boton" onClick={()=> changePage("+")}>SIGUIENTE</div>

                <div className="movieContent" >
                        <div className="content" onClick={() => clickHandler(props.movies)}>
                            <div className="content2" >
                                <p className="text">{props.movies.title} </p>
                                <img src={`${baseImgUrl}/${size}${props.movies.poster_path}`} alt="poster"/>
                            </div>
                        </div>
                </div>
            </div>
    )
    } else {
        return (
            <div className="spinnerContainer">
                <div className="spinner">
                    {/* <img  src={spinner} alt="spinner" width="60" />
                    cargando... */}
                </div>
            </div>
        );
    }
};

export default connect((state) => ({
  credentials: state.credentials,
  movies: state.movies,
}))(MovieTitle);
