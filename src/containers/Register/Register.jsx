import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "../../Global.css";

const Register = () => {
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
    console.log("body", body);

    let res = await axios.post("http://localhost:3001/users", body);

    // console.log( res.data.id);
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
            datosUser.phone
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
    <div className="vistaRegister">

      <div className="formulario1">
        <div className="box1">
          <div className="errorsText">{errors.eName}</div>
          <form className="form">
            <input
              className="input"
              name="name"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("name")}
              required
            />
            <label className="lbl-nombre">
              <span className="text-nomb">Name</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText">{errors.eLastName}</div>
          <form className="form1">
            <input
              className="input1"
              name="lastName"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("lastName")}
              required
            />
            <label className="lbl-nombre1">
              <span className="text-nomb1">Last Name</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText">{errors.eLastName2}</div>
          <form className="form2">
            <input
              className="input2"
              name="lastName2"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("lastName2")}
              required
            />
            <label className="lbl-nombre2">
              <span className="text-nomb2">Last Name 2</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText11">{errors.ePassword}</div>
          <form className="form3">
            <input
              className="input3"
              name="password"
              type="password"
              onChange={updateFormulario}
              onBlur={() => checkError("password")}
              required
            />
            <label className="lbl-nombre3">
              <span className="text-nomb3">Password</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText1">{errors.ePassword2}</div>
          <form className="form4">
            <input
              className="input4"
              name="password2"
              type="password"
              onChange={updateFormulario}
              onBlur={() => checkError("password2")}
              required
            />
            <label className="lbl-nombre4">
              <span className="text-nomb4">Repeat Password</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText">{errors.dateOfBirth}</div>
          <form className="form5">
            <input
              className="input5"
              name="dateOfBirth"
              type="date"
              onChange={updateFormulario}
              onBlur={() => checkError("dateOfBirth")}
              required
            />
            <label className="lbl-nombre5">
              <span className="text-nomb5">Date of Birth</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText">{errors.eCity}</div>
          <form className="form6">
            <input
              className="input6"
              name="city"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("city")}
              required
            />
            <label className="lbl-nombre6">
              <span className="text-nomb6">City</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText">{errors.eAddress}</div>
          <form className="form7">
            <input
              className="input7"
              name="address"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("address")}
              required
            />
            <label className="lbl-nombre7">
              <span className="text-nomb7">Address</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText">{errors.eCp}</div>
          <form className="form8">
            <input
              className="input8"
              name="cp"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("cp")}
              required
            />
            <label className="lbl-nombre8">
              <span className="text-nomb8">Postal Code</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText12">{errors.eEmail}</div>
          <form className="form9">
            <input
              className="input9"
              name="email"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("email")}
              required
            />
            <label className="lbl-nombre9">
              <span className="text-nomb9">Email</span>
            </label>
          </form>
        </div>

        <div className="box1">
          <div className="errorsText13">{errors.ePhone}</div>
          <form className="form10">
            <input
              className="input10"
              name="phone"
              type="text"
              onChange={updateFormulario}
              onBlur={() => checkError("phone")}
              required
            />
            <label className="lbl-nombre10">
              <span className="text-nomb10">Phone</span>
            </label>
          </form>
        </div>
        <div className="registerButton" onClick={() => applyRegister()}>
          Enviar
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credential: state.credential,
}))(Register);
