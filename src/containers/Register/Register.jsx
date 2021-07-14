import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "../../Global.css";
import { useHistory } from "react-router";
import { notification } from 'antd';

const Register = () => {

  let history = useHistory();
  // Hook
  const [datosUser, setDatosUser] = useState({
    name: "",
    lastName: "",
    lastName2: "",
    password: "",
    password2: "",
    isAdmin: "",
    dateOfBirth: "",
    city: "",
    address: "",
    cp: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    eName: "",
    eLastName: "",
    eLastName2: "",
    ePassword: "",
    ePassword2: "",
    eIsAdmin: "",
    eDateofBirth: "",
    eCity: "",
    eAddress: "",
    eCp: "",
    eEmail: "",
    ePhone: "",
  });

  const [ , setError] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {});

  // Handler
  const updateFormulario = (e) => {
    setDatosUser({ ...datosUser, [e.target.name]: e.target.value });
  };

  const applyRegister = async () => {
    // e.preventDefault();

    let body = {
      name: datosUser.name,
      lastName: datosUser.lastName,
      lastName2: datosUser.lastName2,
      password: datosUser.password,
      dateOfBirth: datosUser.dateOfBirth,
      city: datosUser.city,
      address: datosUser.address,
      cp: datosUser.cp,
      email: datosUser.email,
      phone: datosUser.phone,
    };

    axios
        .post("https://back-movie.herokuapp.com/users", body)
        .then((res) => {

          setDatosUser(res.data.results);
          notification.success({message:'Registered User.',description: "We have sent you an email to activate the account." });
          history.push("/login");
        })
          .catch((err) => {
            var errorText = err.response.data.message;

              if (errorText?.includes("email")){

                notification.warning({message:'Attention.',description: JSON.stringify(err.response.data.message)});
                setError(JSON.stringify("The email is already registered."));

              } else if (errorText?.includes("phone")){

                notification.warning({message:'Attention.',description: JSON.stringify(err.response.data.message)});
                setError(JSON.stringify("The phone is already registered."));
              }else{

                notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
                setError(JSON.stringify(err.response.data.message));
              }
              return Error("Files not Found");
          });
  };

  const checkError = (arg) => {
    switch (arg) {
      case "name":
      case "lastName":
      case "lastName2":
        if (
          datosUser.name.length < 2 ||
          !/^[a-z ,.'-]+$/i.test(datosUser.name) ||
          datosUser.name.length > 20
        ) {
          setErrors({ ...errors, eName: "Introduce un nombre válido" });
        } else {
          setErrors({ ...errors, eName: "" });
        }
        break;

      case "email":
        if (
          !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
            datosUser.email
          )
        ) {
          setErrors({ ...errors, eEmail: "Introduce un email válido" });
        } else {
          setErrors({ ...errors, eEmail: "" });
        }

        break;

      case "password":
        if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
            datosUser.password
          )
        ) {
          // if (datosUser.password.length < 8){
          setErrors({
            ...errors,
            ePassword:
              "At least 8 movies, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
          });
        } else {
          setErrors({ ...errors, ePassword: "" });
        }
        break;

      case "phone":
        if (
          !/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(
            datosUser.phone.length
          ) ||
          datosUser.phone.length > 16
        ) {
          // if (datosUser.password.length < 8){
          setErrors({ ...errors, ePhone: "Wrong phone number" });
        } else {
          setErrors({ ...errors, ePhone: "" });
        }
        break;

      case "password2":
        if (datosUser.password !== datosUser.password2) {
          setErrors({ ...errors, ePassword2: "Password should be the same" });
        } else {
          setErrors({ ...errors, ePassword2: "" });
        }
        break;

      default:
        break;
    }
  };
  const errorStyle = (arg) => {
    let errorDefault = "name";
    let errorWarning = "red";

    if (errors.eName !== "") {
      return errorWarning;
    }

    return errorDefault;
  };

  return (
    <form className="row g-3 top needs-validation">
    <div className="vistaRegister">

      <div className="formulario1">
        <div className="col-md-4 mt-2">
            <label for="validationCustom01" className="form-label">
              First name
            </label>
            <input
              className="input form-control"
              id="validationCustom01"
              name="name"
              type="text"
              onChange={updateFormulario}
              required
            />
        </div>

        <div className="col-md-4">
            <label for="validationCustom02" className="form-label">
              Last name
            </label>
            <input
              className="input1 form-control"
              id="validationCustom02"
              name="lastName"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("lastName")}
              required
            />
        </div>

        <div className="col-md-4">
            <label for="validationCustom03" className="form-label">
              Last name2
            </label>
            <input
              className="input2 form-control"
              name="lastName2"
              id="validationCustom03"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("lastName2")}
              required
            />
        </div>

        <div className="col-md-4">
            <div className="errorsText11">{errors.ePassword}</div>
            <label for="validationCustom04" className="form-label">
              Password
            </label>
            <input
              className="input3 form-control"
              id="validationCustom04"
              name="password"
              type="password"
              onChange={updateFormulario}
              onBlur={() => checkError("password")}
              required
            />
        </div>

        <div className="col-md-4">
            <div className="errorsText1">{errors.ePassword2}</div>
            <label for="validationCustom05" className="form-label">
              Repeat password
            </label>
            <input
              className="input4 form-control"
              id="validationCustom05"
              name="password2"
              type="password"
              onChange={updateFormulario}
              onBlur={() => checkError("password2")}
              required
            />
        </div>

        <div className="col-md-4">
            <label for="validationCustom06" className="form-label">
              Date of Birth
            </label>
            <input
              className="input5 form-control"
              id="validationCustom06"
              name="dateOfBirth"
              type="date"
              onChange={updateFormulario}
              onBlur={() => checkError("dateOfBirth")}
              required
            />
        </div>

        <div className="col-md-4">
            <div className="errorsText12">{errors.eCity}</div>
            <label for="validationCustom07" className="form-label">
              City
            </label>
            <input
              className="input6 form-control"
              id="validationCustom07"
              name="city"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("city")}
              required
            />
        </div>

        <div className="col-md-4">
            <div className="errorsText12">{errors.eAddress}</div>
            <label for="validationCustom08" className="form-label">
              Address
            </label>
            <input
              className="input7 form-control"
              id="validationCustom08"
              name="address"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("address")}
              required
            />
        </div>

        <div className="col-md-4">
            <div className="errorsText12">{errors.eCp}</div>
            <label for="validationCustom09" className="form-label">
              Postal Code
            </label>
            <input
              className="form-control"
              id="validationCustom09"
              name="cp"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("cp")}
              required
            />
        </div>

        <div className="col-md-4">
            <div className="errorsText12">{errors.eEmail}</div>
            <label for="validationCustom10" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              id="validationCustom10"
              name="email"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("email")}
              required
            />
        </div>

        <div className="col-md-4">
            <div className="errorsText13">{errors.ePhone}</div>
            <label for="validationCustom11" className="form-label">
              Phone
            </label>
            <input
              className="form-control"
              id="validationCustom11"
              name="phone"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("phone")}
              required
            />
        </div>
        <div className="">
          <div className="registerButton " onClick={() => applyRegister()}>
            Send
          </div>
      </div>
        </div>
    </div>
    </form>
  );
};

export default connect((state) => ({
  credential: state.credential,
}))(Register);
