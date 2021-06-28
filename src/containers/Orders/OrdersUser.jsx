import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import spinner from '../../assets/spinner2.gif'
import { ORDERS } from '../../redux/types';

const OrdersUser = (props) => {

    const [orders, setOrders] = useState([]);
    const [datos,setDatos] = useState({
        token: props.credentials?.token,
        user: props.credentials?.user,
    });

    useEffect(() => {
        findOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const findOrders = () => {

        let token = props.credentials?.token;

        let body = {
            id : datos.user.id,
        }


        axios
        .post("http://localhost:3001/orders/orderById", body, {headers:{'authorization':'Bearer ' + token}})
        .then((res) => {

            setOrders(res.data);

            props.dispatch({ type: ORDERS, payload: res?.data });

        })
        .catch((err) => {
            console.log('Err');
            //  console.log(err.response.data.message);
            // throw new Error('All fields are required');
        });
    }

    const baseImgUrl = "https://image.tmdb.org/t/p";
    const size = "w300";

    if (orders[0]?.id) {

        return (
            <div className="findAppointments">

            <div className="appointmentContent">

                {orders.map((order, index) => (

                    <div key={index} className="appointmentCards">

                        <img
                        src={`${baseImgUrl}/${size}${order.moviePoster}`}
                        alt="poster"
                        />
                        <p> Movie : {order.movieTitle} </p>
                        <p> Rental Date : {order.rentalDate} </p>
                        <p> Return Date : {order.returnDate} </p>
                        <div className="buttons1">
                        {/* <div
                            className="buttonUpdateA"
                            onClick={() => saveAppointment(order)}
                        >
                            UPDATE
                        </div> */}
                        {/* <div className="buttonDeleteA" onClick={() => deleteAppointment(order)}>REMOVE</div> */}
                        </div>
                    </div>
                ))}
        </div>
        </div>
    );
        } else {
            return (
              <div className="spinnerContainer">
                <div className="spinner">
                   <img  src={spinner} alt="spinner" width="60" />
                </div>
              </div>
            );
        }
}

export default connect((state)=>({
    credentials: state.credentials,
    infoUser: state.infoUser
}))(OrdersUser);
