import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ORDERS } from '../../redux/types';
import moment  from 'moment';
import { useHistory } from 'react-router';

const OrdersUser = (props) => {

    let history = useHistory();

    const [orders, setOrders] = useState([]);
    const [datos,] = useState({
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
        });
    }

    const removeOrder = async (order) => {
        let token = props.credentials?.token;
        let user = props.credentials?.user;

        let body = {
          id: order.id,
          user: user.id
        };

        let res = await axios.post('http://localhost:3001/orders/delete', body, {headers: { authorization: "Bearer " + token }});

        setOrders(res.data);
        window.location.reload();
    }

    const updateOrder = (detail) => {

        props.dispatch({type: ORDERS, payload: detail});

        history.push('/updateorders');
    }

    const baseImgUrl = "https://image.tmdb.org/t/p";
    const size = "w300";

    if (orders[0]?.id) {

        return (
            <div className="allOrders">

            <div className="orderContent">

                {orders.map((order, index) => (

                    <div key={index} className="orderCards">

                        <img
                        className="imgOrderUser"
                        src={`${baseImgUrl}/${size}${order.moviePoster}`}
                        alt="poster"
                        />
                        <div className="info">
                            <p className="order"> Rental Date : { moment (order.rentalDate).format('LL')} </p>
                            <p className="order"> Return Date : { moment (order.returnDate).format('LL')} </p>
                        </div>


                        <div className="buttons">
                            <div className="updateButton3" onClick={() => removeOrder(order)} >REMOVE</div>
                            <div
                                className="updateButton3"
                                onClick={() => updateOrder(order)}
                            >
                                UPDATE
                            </div>

                        </div>
                    </div>
                ))}
        </div>
        </div>
    );
        } else {
            return (
              <div className="spinnerContainer">
                <div className="spinner notOrder">
                   <h1>You have no orders</h1>
                </div>
              </div>
            );
        }
}

export default connect((state)=>({
    credentials: state.credentials,
    infoUser: state.infoUser
}))(OrdersUser);
