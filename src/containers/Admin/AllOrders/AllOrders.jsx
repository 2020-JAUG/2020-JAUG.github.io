import React, { useState, useEffect } from 'react';
import axios from 'axios';
import spinner from '../../../assets/spinner2.gif';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment  from 'moment';
import { ORDERS } from '../../../redux/types';


const AllOrders = (props) => {

    let history = useHistory();

    const [orders, setOrders] = useState([]);

    useEffect( () => {
        findOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const findOrders = async () => {

        try {

            let token = props.credentials?.token;

            let res = await axios.get("https://back-movie.herokuapp.com/orders",  {headers:{'authorization':'Bearer ' + token}});
            setOrders(res.data);
            props.dispatch({ type: ORDERS, payload: res.data });

        } catch (error) {
            console.log(error);
        }
    }

    const deleteOrder = async (order) => {
        let token = props.credentials?.token;
        let user = props.credentials?.user;

        let body = {
          id: order.id,
          user: user.id
        };

        let res = await axios.post('https://back-movie.herokuapp.com/orders/delete', body, {headers: { authorization: "Bearer " + token }});

        setOrders(res.data);

        window.location.reload();
    }

    const updateOrder = (detail) => {

        props.dispatch({type: ORDERS, payload: detail});

        history.push('/updateorders');
    }

    const baseImgUrl = "https://image.tmdb.org/t/p";
    const size = "w300";

    if( orders[0]?.id ) {

        return(
            <div className="allContent">

                <div className="movieContent">
                    {orders.map((order, index) => (
                        <div className="content" key={index}  >

                        <div  className="cardOrder">
                            <p className="order1">Rented by:  {order.userName}  {order.lastName}</p>
                            <p className="order">Identifier : {order.userId} </p>
                            <p className="order">Order Number: {order.id} </p>
                            <p className="order"> Rental Date : { moment (order.rentalDate).format('LL')} </p>
                            <p className="order"> Return Date : { moment (order.returnDate).format('LL')} </p>

                            <div className="buttons">
                            <div className="updateButton" onClick={() => deleteOrder(order)} >REMOVE</div>
                            <div
                                className="updateButton"
                                onClick={() => updateOrder(order)}
                            >
                                UPDATE
                            </div>

                            </div>
                            <img
                            className="imgAdmin"
                            src={`${baseImgUrl}/${size}${order.moviePoster}`}
                            alt="poster"
                            />
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
}))(AllOrders);
