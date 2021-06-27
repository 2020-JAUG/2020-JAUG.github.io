import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { useHistory } from "react-router";



const RentMovie = (props) => {

    let history = useHistory();

    const [datos,setDatos] = useState({date:'', date1:''});
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


    // A continuamos, generamos el body de datos
    let body = {
        userId : props.userId,
        movieId: props.movieId,
        rentalDate: props.rentalDate,
        returnDate: props.returnDate
    }
    // Envío por axios

    axios
    .post('http://localhost:3001/orders', body)
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
        return (
            <div className="box1">
                <div className="errorsText">{msgError}</div>
                    <form className="form1">
                    <input className="input1" name="rentalDate" type="date" placeholder="rentalDate"  onChange={updateCredentials} onBlur={() => checkError ("email")} required/>
                    <input className="input1" name="rentalDate2" type="date" placeholder="returnDate"  onChange={updateCredentials} onBlur={() => checkError ("email")} required/>
                    </form>
            </div>
        )
}


export default connect((state) => ({
    credentials: state.credentials,
    movies: state.movies,
  }))(RentMovie);
