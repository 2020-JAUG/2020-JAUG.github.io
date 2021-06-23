import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Profile.scss";
import axios from "axios";
import { connect } from "react-redux";
import { LOGOUT } from "../../redux/types";
// import imgUser from '../../img/user.png'
import spinner from "../../assets/spinner2.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Profile = (props) => {
  let history = useHistory();

  const [user, setUser] = useState({
    dateApp: [],
    i: 0,
  });

  // Handler
  const updateUSer = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    searchData();
  }, []);

  useEffect(() => {});

  const searchData = async () => {
    try {
      let token = props.credentials?.token;
      let user = props.credentials?.user;

      let body = {
        user: user._id,
      };

      let res = await axios.get("http://localhost:3001/users", body, { headers: { authorization: "Bearer " + token } });

      setUser({ ...user, dateApp: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    props.dispatch({ type: LOGOUT });
  };

  const goRight = () => {
    let i = user.i;

    if (i < user.dateApp.length - 1) {
      i++;
    } else {
      i= 0;
    }
     setUser({ ...user, i: i });
  };

  const goLeft = () => {
    let i = user.i;

    if (i > 0) {
      i--;
    } else {
      i = user.dateApp.length - 1;
    }
    setUser({ ...user, i: i });
  };


  let data1 = user.dateApp;

  let result = [];
  for (let j = 0; j < data1.length; j++) {
    if (user.i === j) {
      result.push(
        <div className="clientAppointmentAll" >
        <div className="clientAppointmentProfile" >
          <div className="buttonGo" onClick={() => goLeft()}>
          <FontAwesomeIcon icon={faArrowLeft}/>
          </div>

          <div className="appointmentCardProfile">
            <p>CLINIC : {props.credential?.data1[j].user.name}</p>
            <p>PHONE : {data1[j].user.phone}</p>
            <p>EMAIL : {data1[j].user.Email}</p>
            <p>DENTIST : {data1[j].dentistName}</p>
            {/* <p>DATE : {convertDate(data1[j].date)}</p> */}
          </div>

          <div className="buttonGo" onClick={() => goRight()}>
          <FontAwesomeIcon icon={faArrowRight}/>
          </div>
        </div>
        </div>
      );
    }
  }

  if (props.credentials?.token) {
    return (
      <div className="baseProfile">
        <div className="clientProfile">
          <div className="clientDates1">
            <div className="clientLeftSide">
              <h2>MY PROFILE</h2>
            </div>
            <div className="clientRightSide">
              <p>NAME : {props.credentials?.user.name} </p>
              <p>EMAIL : {props.credentials?.user.email} </p>
              <p>PHONE : {props.credentials?.user.phone}</p>
              <p>CITY : {props.credentials?.user.city}</p>
              <p>ADDRESS : {props.credentials?.user.address}</p>
              <p>CP : {props.credentials?.user.cp}</p>
              <p>CREATECOUNT : {props.credentials?.user.createdAt}</p>
              <div className="buttons">
                <div
                  className="buttonUpdateC"
                  onClick={() => history.push("/updateclient")}
                >
                  UPDATE
                </div>
                <div className="buttonLogoutC" onClick={() => logOut()}>
                  LOGOUT
                </div>
              </div>
            </div>
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
}))(Profile);
