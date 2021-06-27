import React, { useState } from 'react'
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cart from "../../components/Cart/Cart";
import { ADD_MOVIES } from '../../redux/types';


const Detail = (props) => {

  let history = useHistory();

  const [state, setState] = useState(false);
  // const [datos,setDatos] = useState({date:'', date1:''});
  const [datos,setDatos] = useState({
    token: props.credentials?.token,
    user: props.credentials?.user,
    movieId: props.movies?.genre_ids,
    movieTitle: props.movies?.original_title,
    moviePoster: props.movies?.poster_path
});

  // Esto es un Handler
  const updateCredentials = (e) => {
    setDatos({...datos, [e.target.name]: e.target.value})
  }


  const RentMovie = () => { setState(true) }

  // let allStatements
  // if (state) {
  //   allStatements = <div>otra cosa</div>
  // }
  const Addroom = (props) => {

  const order = async () => {

    let token = props.credentials?.token;

    // A continuamos, generamos el body de datos
    let body = {
        user : datos.user,
        movieId: datos.movieId,
        movieTitle: datos.movieTitle,
        moviePoster : datos.moviePoster,
        rentalDate: props.rentalDate,
        returnDate: props.returnDate
    }

    // Envío por axios
    console.log('body', body);
    axios
    .post('http://localhost:3001/orders', body, {headers:{'authorization':'Bearer ' + token}})
    .then((res) => {
        console.log('esto es res', res)

        if(!res.data.user.isAdmin){
            history.push('/user')
        } else {
            history.push('/admin')
        }
    })
    .catch(() => {
        console.log('Err');
        // throw new Error('All fields are required');

    });
}

    return (
      <div>
        <div className="box1 rent">
            <form><p>Rental Day</p>
            <input className="input1" name="rentalDate" type="date"   onChange={updateCredentials}  required/>
            <p>Return Day</p>
            <input className="input1" name="rentalDate2" type="date" onChange={updateCredentials}  required/>
            </form>
            <button onClick={() => order()}>Send</button>
        </div>
        <h2>{props.a}</h2>
      </div>
    );
}
  const HomePage = (props) => {
    return (
      <div>
        <h2> {props.h}</h2>
      </div>
    );
  }

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size_back_drop = "w1280";
  const size = "w300";

  const rent = () => {

    props.dispatch({type:ADD_MOVIES,payload: props.movies});
  }


  if (props.movies?.id && props.credentials?.user) {
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

        <Link to={"/rent"} onClick={() => rent()}>Rent</Link>

        <button onClick={() => RentMovie(!state)}> Rent Movie
          {/* {allStatements} */}
        </button>
        {state ? <Addroom a={state} /> : <HomePage h={state} />}

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
