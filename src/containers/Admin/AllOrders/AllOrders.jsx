import React, { useState, useEffect } from 'react';
import axios from 'axios';
import spinner from '../../../assets/spinner2.gif';
import { connect } from 'react-redux';
import moment  from 'moment';


const AllOrders = (props) => {

    const [orders, setOrders] = useState([]);

    useEffect( () => {
        findOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect( () => {
        findOrders();
    });

    const findOrders = async () => {

        try {

            let token = props.credentials?.token;

            let res = await axios.get("http://localhost:3001/orders",  {headers:{'authorization':'Bearer ' + token}});
            setOrders(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteOrder = async (order) => {
        console.log(order)
        let token = props.credentials?.token;
        let user = props.credentials?.user;

        let body = {
          id: order.id,
          clinic: order.clinicId
        };

        console.log(body)

        let res = await axios.post('http://localhost:3001/orders/delete', body, {
          headers: { authorization: "Bearer " + token }
        });

        window.location.reload();
    }

    const baseImgUrl = "https://image.tmdb.org/t/p";
    const size = "w300";

    if( orders[0]?.id ) {

        return(
            <div className="allContent">

                <div className="movieContent">
                    {orders.map((order, index) => (
                        <div className="content" key={index}>

                        <div  className="cardOrder">
                            <p>Rented by:  {order.userName}  {order.lastName}</p>
                            <p className="texto">Identifier : {order.userId} </p>
                            <p className="texto">Order Number: {order.id} </p>
                            <p className="order"> Rental Date : { moment (order.rentalDate).format('LL')} </p>
                            <p className="order"> Return Date : { moment (order.returnDate).format('LL')} </p>

                            <div className="updateButton" onClick={() => deleteOrder(order)}>REMOVE</div>
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
}))(AllOrders);;
