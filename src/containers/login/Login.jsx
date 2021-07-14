import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { LOGIN } from "../../redux/types";
import {notification} from 'antd';

const Login = (props) => {
  let history = useHistory();

  // Hooks
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [msgError, setMensajeError] = useState({
    eEmail: "",
    ePassword: "",
    eValidate: "",
  });

  // Esto es un Handler
  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    //Este useEffect corresponde a una vez
    //el componente se HA montado. Sólo se ejecuta una vez.
    // templateLogin();
  }, []);

  useEffect(() => {
    //Este useEffect sin el array vacio como segundo argumento,
    //corresponde al estado de cada actualización del componente. Se ejecutará
    //tantas veces como se cambie el estado del componente
  });

  const checkError = async (arg) => {
    switch (arg) {
      case "email":
        if (credentials.email.length < 1) {
          setMensajeError({ ...msgError, eEmail: "Please enter your email" });
        } else {
          setMensajeError({ ...msgError, eEmail: "" });
        }

        break;

      case "password":
        if (credentials.password.length < 1) {
          setMensajeError({
            ...msgError,
            ePassword: "Please enter your password",
          });
        } else {
          setMensajeError({ ...msgError, ePassword: "" });
        }
        break;

      default:
        break;
    }
  };

  const logeame = async () => {
    // A continuamos, generamos el body de datos
    let body = {
      email: credentials.email,
      password: credentials.password,
    };
    // Envío por axios
    // "https://video-rados-b.herokuapp.com/1/user/login", body)
    axios
      .post("https://back-movie.herokuapp.com/login", body)
      .then((res) => {
        //Guardo en RDX
        props.dispatch({ type: LOGIN, payload: res.data });

        if (!res.data.user.isAdmin) {
          history.push("/");
        } else {
          history.push("/admin");
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        // setMensajeError({ ...msgError, eValidate: "Wrong email or password" });
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
      });
  };

  return (
    <form>
      <div className="vistaLogin2">
        <div className="loginCard2">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              className="form-control"
              name="email"
              type="text"
                id="exampleInputEmail1" aria-describedby="emailHelp"
              onChange={updateCredentials}
              onBlur={() => checkError("email")}
              required
            />
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                name="password"
                type="password"
                onChange={updateCredentials}
                onBlur={() => checkError("password")}
                required
              />
            </div>
          </div>
        </div>
        <div className="send_button" onClick={() => logeame()}>
          Sing in
        </div>
      </div>
    </form>
  );
};

export default connect()(Login);
