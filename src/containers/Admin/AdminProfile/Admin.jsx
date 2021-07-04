import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

const Admin = (props) => {

  if (props.credentials?.user.isAdmin === true) {
    return (
      <div className="admin">
        <div className="nombre"></div>
        <div className="users">
          <div className="userContent">
            <h2>Welcome&nbsp; &nbsp; {props.credentials?.user.name}</h2>
            <p>EMAIL : {props.credentials?.user.email} </p>
            <p>PHONE : {props.credentials?.user.phone}</p>
            <p>CITY : {props.credentials?.user.city}</p>
            <p>ADDRESS : {props.credentials?.user.address}</p>
            <p>CP : {props.credentials?.user.cp}</p>
            <p>
              CREATECOUNT :{" "}
              {moment(props.credentials?.user.createdAt).format("LL")}{" "}{/*Con 3 LLL te muestra la hora*/}
            </p>

            <div className="box2">
              <Link to={"/updateuser"} className="updateButton">UPDATE</Link>
            </div>
          </div>
        </div>

        <div className="orders">
          <div className="orderContent">
            <h2 className="titleUpdate">Access</h2>
            <div className="box2">
                <Link className="updateButton" to={"/allorders"}>ORDERS</Link>
                <Link className="updateButton" to={"/allusers"}>USERS </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (

      <div className="spinnerContainer">
        <div className="spinner notOrder">
          <h1>You do not have permission</h1>
        </div>
      </div>

    )}
};

export default connect((state) => ({
  credentials: state.credentials,
  infoUser: state.infoUser,
}))(Admin);