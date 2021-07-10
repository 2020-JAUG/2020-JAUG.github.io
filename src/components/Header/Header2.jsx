import React from "react";
import Button from "../Button/Button";
import { connect } from "react-redux";
import { LOGOUT } from "../../redux/types";
import { useHistory } from "react-router-dom";
import Search from "../../components/Search/Search.jsx";
import MovieQuery from "../Movies/MovieQuery";
import logo from "../../assets/logo.png";

const Header2 = (props) => {
  let history = useHistory();

  const logOut = () => {
    props.dispatch({ type: LOGOUT });
    history.push("/");
  };
  const llevame = () => {
    history.push("/toprated");
  };

  if (props.credentials.user?.name) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark header">
        <div className="container-fluid">
            <img onClick={() => history.push("/")} className="logoHeader" src={logo} alt="logo" height="78em" width="76"/>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Button path="/toprated" className="header"  destination="TOP RATED"/>
              </li>
              <li className="nav-item">
                <Button path="/upcoming" destination="UPCOMING"/>
              </li>
              <li className="nav-item">
                <Button path="/popular" destination="POPULAR"/>
              </li>

                <Search />
            </ul>
                <MovieQuery />
                <Button path="/profile" destination={props.credentials?.user.name}/>
                <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>
          </div>
        </div>
      </nav>
    );
  } else {
    return(
        <nav className="navbar navbar-expand-lg navbar-light  header">
        <div className="container-fluid">
             <img onClick={() => history.push("/")} className="logoHeader" src={logo} alt="logo" height="78em" width="76"/>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Button path="/toprated" destination="TOP RATED" onClick={() => llevame()} />
              </li>
              <li className="nav-item">
                <Button path="/upcoming" destination="UPCOMING"/>
              </li>
              <li className="nav-item">
                <Button path="/popular" destination="POPULAR"/>
              </li>

            </ul>

                <MovieQuery />
                <Button path="/login" destination="LOGIN"/>
                <Button path="/register" destination="REGISTER"/>
          </div>
        </div>
      </nav>
    )
  }
}
export default connect((state) => ({
  credentials: state.credentials,
}))(Header2);