import React, { useState } from 'react'
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
// import Cart from "../../components/Cart/Cart";
import { ADD_MOVIES } from '../../redux/types';


const Detail = (props) => {

  let history = useHistory();

  const [card, setCard] = useState(false);

  const [datos,setDatos] = useState({
    token: props.credentials?.token,
    user: props.credentials?.user,
    movieId: props.movies?.id,
    movieTitle: props.movies?.original_title,
    moviePoster: props.movies?.poster_path,
    rentalDate: new Date(),
    returnDate: new Date()
});

  // Esto es un Handler
  const updateCredentials = (e) => {
    setDatos({...datos, [e.target.name]: e.target.value})
  }


  const RentMovie = () => { setCard(true) }

  // let allStatements
  // if (state) {
  //   allStatements = <div>otra cosa</div>
  // }

  const Addroom = () => {

    const order = async () => {

    let token = props.credentials?.token;

    // A continuamos, generamos el body de datos
    let body = {
        userId : datos.user.id,
        movieId: datos.movieId,
        movieTitle: datos.movieTitle,
        moviePoster : datos.moviePoster,
        rentalDate: datos.rentalDate,
        returnDate: datos.returnDate
    }

      // Envío por axios
      axios
      .post("http://localhost:3001/orders", body, {headers:{'authorization':'Bearer ' + token}})
      .then((res) => {

        setTimeout(()=>{
          history.push("/profile");
        },250)

        if(!res.data.user.isAdmin){
          history.push('/user')
        } else {
            history.push('/admin')
        }
    })
    .catch((err) => {
      // console.log(err.response.data.message);
        console.log('Err');
        //  console.log(err.response.data.message);
    });
}

    return (
      <div>
        <div className="box1 rent">

            <input className="input1" type="date" value={datos.rentalDate} name="rentalDate" onChange={updateCredentials} />
            <input className="input1" type="date" value={datos.returnDate} name="returnDate" onChange={updateCredentials} />

            <button onClick={() => order()}>Send</button>
        </div>
        {/* <h2>{props.a}</h2> */}
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
              <p className="titleD">{props.movies.original_title} </p>
              <p className=" over">Overview {props.movies.overview}</p>
              <p className=" vote">Vote {props.movies.vote_average}</p>
              <p className=" popu">populatity{props.movies.popularity}</p>
              <p className=" date">premiere{props.movies.release_date}</p>
              <p className=" lang">original language {props.movies.original_language}</p>
            {/* <p className="text">{props.movies.getSimilarMovies}</p> */}
          </div>
        </div>

        {/* <Cart /> */}

        {/* <Link to={"/rentmovie"} onClick={() => rent()}>Rent</Link> */}

        <button onClick={() => RentMovie(!card)}> Rent Movie
          {/* {allStatements} */}
        </button>
        {card ? <Addroom a={card} /> : <HomePage h={card} />}

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
