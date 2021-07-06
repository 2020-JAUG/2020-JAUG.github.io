/* eslint-disable no-lone-blocks */
import React, { useState } from 'react'
import { useHistory } from "react-router";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import axios from 'axios';
// import Cart from "../../components/Cart/Cart";
import moment from 'moment';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowCircleLeft, faCartPlus, faFilm, faStar, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
const Detail = (props) => {

  let history = useHistory();

  const [card, setCard] = useState(false);


  const [datos,setDatos] = useState({
    token: props.credentials?.token,
    user: props.credentials?.user,
    userName: props.credentials?.user.name,
    lastName: props.credentials?.user.lastName,
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

  const RentMovie = () => { setCard(true)}

  const Addroom = () => {

    const order = async () => {

    let token = props.credentials?.token;

    // A continuamos, generamos el body de datos
    let body = {
        userId : datos.user.id,
        userName : datos.userName,
        lastName : datos.lastName,
        movieId: datos.movieId,
        movieTitle: datos.movieTitle,
        moviePoster : datos.moviePoster,
        rentalDate: datos.rentalDate,
        returnDate: datos.returnDate
    }
    console.log('datoss', body);


      // Envío por axios
      axios
      .post("https://back-movie.herokuapp.com/orders", body, {headers:{'authorization':'Bearer ' + token}})
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
    });
}

    return (
      <div>
        <div className="takeDate">
            <h3>Rental Date</h3><div className="gapinput"></div>
            <input className="input1" type="date" value={datos.rentalDate} name="rentalDate" onChange={updateCredentials} /><div className="gapDetail"></div>
            <h3>Renturn Date</h3><div className="gapinput"></div>
            <input className="input1" type="date" value={datos.returnDate} name="returnDate" onChange={updateCredentials} />

        </div>
            <div className="buttonSend">
              <button className="button_rent2" id="send_" onClick={() => order()}>Send</button>
            </div>
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

  if ( props.credentials.user?.name) {
    return (
      <div className="contentDetail">
  {/* <div className="iconDataMovie"><FontAwesomeIcon className="iconDataMovie" icon={faFilm}/></div> */}

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
              <div className="titleD">
                <p>{props.movies.original_title} </p>
              </div>
          </div>

          <div className="over">
            <p>Overview {props.movies.overview}</p>
          </div>

          <div className="vote">
                <p>Vote {props.movies.vote_average}</p>
          </div>

          <div className="popu">
                <p>Populatity:  {props.movies.popularity}</p>
          </div>

          <div className="date popu">
                <p>Premiere  { moment ( props.movies.release_date).format('LL') }</p>{/*LL es el formato en que se enseña la hora*/}
          </div>
          </div>

          <button className="button_rent"   onClick={() => RentMovie(!card)}> Rent Movie </button>
          {card ? <Addroom a={card} /> : <HomePage h={card} />}


        {/* <div className="arrows">
          <Link className="" to={"/"}>
            Go Back
          </Link>
          <Link to={"/toprated"}>topRated</Link>
        </div> */}
      </div>
  );
  } else {
    return(

      <div className="baseProfile singUp">
        <div className="clientRightSide" onClick={() => history.push('/register')}> Sign up to rent a movie</div>
      </div>
    )}
};

export default connect((state) => ({
  credentials: state.credentials,
  movies: state.movies,
}))(Detail);