import React, { useState, useEffect } from 'react';
import axios from 'axios';
import spinner from '../../../assets/spinner2.gif';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment  from 'moment';
// import { ORDERS } from '../../../redux/types';


const AllUsers = (props) => {

    let history = useHistory();

    const [users, setUsers] = useState([]);

    useEffect( () => {
        findUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const findUsers = async () => {

        try {

            let token = props.credentials?.token;

            let res = await axios.get("https://back-movie.herokuapp.com/users", {headers:{'authorization':'Bearer ' + token}});
            setUsers(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (info) => {
        let token = props.credentials?.token;
        let user = props.credentials?.user;

        let body = {
          id: info.id,
          user: user.id
        };

        let res = await axios.post('https://back-movie.herokuapp.com/users/removeuser', body, {headers: { authorization: "Bearer " + token }});

        setUsers(res.data);
        window.location.reload();
    }

    if( users[0]?.id ) {

        return(
            <div className="allContent">

                <div className="movieContent">
                    {users.map((user, index) => (
                        <div className="content" key={index}  >

                            <div  className="cardOrder">
                                <p>User:  {user.name}  {user.lastName} </p>
                                <p>EMAIL : {user.email} </p>
                                <p>PHONE : {user.phone}</p>
                                <p>CITY : {user.city}</p>
                                <p>ADDRESS : {user.address}</p>
                                <p>CP : {user.cp}</p>
                                <p className="texto">Identifier : {user.id} </p>
                                <p>CREATECOUNT : {moment (user.createdAt).format('LL')} </p>{/*Con 3 LLL te muestra la hora*/}

                                <div className="buttons">
                                    <div className="updateButton2" onClick={() => deleteUser(user)} >REMOVE</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className="spinnerContainer">
              <div className="spinner">
                 <img  src={spinner} alt="spinner" width="60" />
              </div>
        </div>)
    }
}

export default connect((state)=>({
    credentials: state.credentials,
}))(AllUsers);
