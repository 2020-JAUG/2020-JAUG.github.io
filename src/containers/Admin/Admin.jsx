import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-simple-tooltip";


const Admin = (props) => {

    let history = useHistory();

    const go  = () => {

        history.push("/ordersuser");
      }

    if (props.credentials?.user.isAdmin === true) {

        return(
            <div className="admin">

            <div className="adminInfo">

                <h3 className="titleUpdate">All Users</h3>

                <form className="form data1">
                    <input type="password"  required/>
                    <label className="lbl-nombre">
                      <span className="text-nomb">Old Password</span>
                    </label>
                </form>
                <div className="box2">
                <div className="updateButton" >UPDATE</div>
                </div>

            <div className="updateContainer">
                <h3 className="titleUpdate">All Orders</h3>
            </div>
                <form className="form data">
                    <input className="update1" type="text" name="name"    required/>

                      <span className="text-nomb ">Nombre</span>

                </form>
                <div>
                <form className="form data">
                   <input type="email" name="email"    required/>
                    <label className="lbl-nombre">
                      <span className="text-nomb">E-mail</span>
                    </label>
                </form>

                <form className="form data">
                    <input type="text" name="phone"   required />
                    <label className="lbl-nombre">
                      <span className="text-nomb">Phone</span>
                    </label>
                </form>

                </div>

                <div className="updateButton" >UPDATE</div>
            </div>
           </div>
       )


    //         <div className="baseProfile">
    //         <div className="clientDates1">
    //         <div className="clientRightSide">
    //         <h2>Welcome &nbsp; &nbsp; {props.credentials?.user.name}</h2>
    //           <p>EMAIL : {props.credentials?.user.email} </p>
    //           <p>PHONE : {props.credentials?.user.phone}</p>
    //           <p>CITY : {props.credentials?.user.city}</p>
    //           <p>ADDRESS : {props.credentials?.user.address}</p>
    //           <p>CP : {props.credentials?.user.cp}</p>
    //           <p>CREATECOUNT : {moment (props.credentials?.user.createdAt).format('LL')} </p>{/*Con 3 LLL te muestra la hora*/}
    //           <div className="bottonOrder" onClick={() => go()}>Orders </div>
    //           <div className="buttons">
    //             <div
    //               className="buttonUpdateC"
    //               onClick={() => history.push("/updateuser")}
    //             >
    //               UPDATE
    //             </div>
    //           </div>
    //             {/* <div className="botomMenuLateral" onClick={() => cambiaDatos("profile")}>Profile</div>
    //             <div className="botomMenuLateral" onClick={() => cambiaDatos("favoritos")}>favorites</div>
    //             <div className="botomMenuLateral" onClick={() => cambiaDatos("orders")}>Orders</div> */}
    //                 <div className="users">hola
    //                     <Link path="/allusers" destination={<FontAwesomeIcon icon={faUsers}/>}/>
    //                 </div>
    //         </div>
    //       </div>
    //   </div>



    } else {
        return (
            <div>You do not have permission</div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
    infoUser: state.infoUser
}))(Admin);