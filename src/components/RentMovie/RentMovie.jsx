import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { useHistory } from "react-router";



const RentMovie = (props) => {

    let history = useHistory();

    const [datos,setDatos] = useState({
        token: props.credentials?.token,
        user: props.credentials?.user,
        movieId: props.movies?.genre_ids,
        movieTitle: props.movies?.original_title,
        moviePoster: props.movies?.poster_path
    });

    const [msgError, setMensajeError] = useState({eFields: 'All fields are required'});

  // Esto es un Handler
  const updateCredentials = (e) => {
    setDatos({...datos, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    //Este useEffect corresponde a una vez
    //el componente se HA montado. Sólo se ejecuta una vez.
    // templateLogin();
  },[]);

  const order = async () => {

    let token = datos.token;

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

    axios
    .post('http://localhost:3001/orders', body, {headers:{'authorization':'Bearer ' + token}})
    .then((res) => {
        console.log('esto es res', res)
        //Guardo en RDX

        if(!res.data.user.isAdmin){
            history.push('/user')
        } else {
            history.push('/admin')
        }
    })
    .catch((msgError) => {
        setMensajeError({...msgError, eFields: ""});
        // throw new Error('All fields are required');

    });
}

    const checkError = async (arg) => {

        switch (arg){

            case 'rentalDate':

                if (datos.date.length === ''){
                    setMensajeError({...msgError, eFields: "Please enter your email"});
                }else {
                    setMensajeError({...msgError, eFields: ""});
                }
            break;

            case 'rentalDate2':

                if (datos.date1.length === ''){
                    setMensajeError({...msgError, eFields: "Please enter your email"});
                }else {
                    setMensajeError({...msgError, eFields: ""});
                }
            break;
            default:
                return null;
        }


    }

    if(props.credentials?.token) {

        return (
            <div>
            <h1>Rent Movie.jsx</h1>
            <div className="box1">
                <div className="errorsText">{msgError}</div>
                    <form className="form1">
                    <input className="input1" name="rentalDate" type="date"   onChange={updateCredentials} onBlur={() => checkError ("email")} required/>
                    <input className="input1" name="rentalDate2" type="date"  onChange={updateCredentials} onBlur={() => checkError ("email")} required/>
                    </form>
            </div>
            <button onClick={() => order()}>Order</button>
            </div>
        )
    } else {
        return (
            <h1>Cargando</h1>
        )
    }
}


export default connect((state) => ({
    credentials: state.credentials,
    movies: state.movies,
  }))(RentMovie);
