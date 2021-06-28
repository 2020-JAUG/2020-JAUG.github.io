import React from "react";
import { useHistory } from "react-router-dom";
import "./Profile.scss";
import { connect } from "react-redux";
import spinner from "../../assets/spinner2.gif";
import { FAVORITES, ORDERS } from "../../redux/types"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Profile = (props) => {
  let history = useHistory();

  const cambiaDatos = async (info) => {
    switch (info) {
      case "profile":
        props.dispatch({ type: FAVORITES, payload: info });

        break;

      case "favoritos":
        props.dispatch({ type: FAVORITES, payload: info });

        break;

      case "orders":
        props.dispatch({ type: ORDERS, payload: info });

        break;
      default:

        break;
    }
  };

  const go  = () => {

    history.push("/ordersuser");
  }


  if (props.credentials?.token) {
    return (
      <div className="baseProfile">
          <div className="clientDates1">
            <div className="clientRightSide">
              <p>NAME : {props.credentials?.user.name} </p>
              <p>EMAIL : {props.credentials?.user.email} </p>
              <p>PHONE : {props.credentials?.user.phone}</p>
              <p>CITY : {props.credentials?.user.city}</p>
              <p>ADDRESS : {props.credentials?.user.address}</p>
              <p>CP : {props.credentials?.user.cp}</p>
              <p>CREATECOUNT : {props.credentials?.user.createdAt} </p>
              <div className="buttons">
                <div
                  className="buttonUpdateC"
                  onClick={() => history.push("/updateuser")}
                >
                  UPDATE
                </div>
              </div>
                <div className="botomMenuLateral" onClick={() => cambiaDatos("profile")}>Profile</div>
                <div className="botomMenuLateral" onClick={() => cambiaDatos("favoritos")}>favorites</div>
                <div className="botomMenuLateral" onClick={() => cambiaDatos("orders")}>Orders</div>
                <div className="botomMenuLateral" onClick={() => go()}>Orders 1</div>
            </div>
          </div>
      </div>
    );
  } else {
    setTimeout(() => {
      history.push("/");
    }, 1000);

    return (
      <div className="spinnerContainer">
        <div className="spinnerC">
          <img src={spinner} alt="spinner" width="60" />
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  infoUser: state.infoUser
}))(Profile);
