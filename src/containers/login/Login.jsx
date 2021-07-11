
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';


const Login = (props) => {

    let history = useHistory();

    // Hooks
    const [credentials,setCredentials] = useState({email:'',password:''});
    const [msgError, setMensajeError] = useState({eEmail:'',ePassword: '',eValidate:''});

    // Esto es un Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        //Este useEffect corresponde a una vez
        //el componente se HA montado. Sólo se ejecuta una vez.
        // templateLogin();
    },[]);


    useEffect(()=>{
        //Este useEffect sin el array vacio como segundo argumento,
        //corresponde al estado de cada actualización del componente. Se ejecutará
        //tantas veces como se cambie el estado del componente

    });

    const checkError = async (arg) => {

        switch (arg){

            case 'email':

                if (credentials.email.length < 1){
                    setMensajeError({...msgError, eEmail: "Please enter your email"});
                }else {
                    setMensajeError({...msgError, eEmail: ""});
                }

            break;

            case 'password':

                if (credentials.password.length < 1){
                    setMensajeError({...msgError, ePassword: "Please enter your password"});
                }else {
                    setMensajeError({...msgError, ePassword: ""});
                }
            break;

            default:
                break;
        }
    }

    const logeame = async () => {


        // A continuamos, generamos el body de datos
        let body = {
            email : credentials.email,
            password : credentials.password
        }
        // Envío por axios

        axios
        .post('https://back-movie.herokuapp.com/login', body)
        .then((res) => {
            //Guardo en RDX
            props.dispatch({type:LOGIN,payload:res.data});

            if(!res.data.user.isAdmin){
                history.push('/')
            } else {
                history.push('/admin')
            }
        })
        .catch((msgError) => {
            setMensajeError({...msgError, eValidate: 'Wrong email or password'});

        });
    }

    return(
        <div className="vistaLogin2">
                <div className="loginCard2">
                    <div className="boxLogin">
                        <div className="errorsText">{msgError.eEmail}</div>
                        <form className="form1">
                            <input className="input1" name="email" type="text"  onChange={updateCredentials} onBlur={() => checkError ("email")} required/>
                            <label className="lbl-nombre1">
                              <span className="text-nomb1">Email</span>
                            </label>
                        </form>
                    </div>

                    <div className="boxLogin2">
                        <div className="errorsText login">{msgError.ePassword}</div>
                        <form className="form3">
                            <input className="input3" name="password" type="password" onChange={updateCredentials} onBlur={() => checkError("password")} required/>
                            <label className="lbl-nombre3">
                              <span className="text-nomb3">Password</span>
                            </label>
                        </form>
                    </div>

                </div>

                <div className="send_button" onClick={()=>logeame()}>Sing in</div>
                <div>{msgError.eValidate}</div>
        </div>
        )
}

export default connect()(Login);