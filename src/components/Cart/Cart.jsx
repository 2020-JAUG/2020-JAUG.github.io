
import React from 'react';
import {connect} from 'react-redux';
import { ADD_CART,  EMPTY_CART, EDIT_CART } from '../../redux/types';



const Cart = (props) => {

    const modificarCompra = (operando,item) => {

        if(item === 'movie'){
            switch(operando){
                case '+':

                    const encontrado = props.movie ? props.cart.movie.find(itemBusca => itemBusca.nombre === props.movie.nombre) : false;

                    if(!encontrado){

                        props.dispatch({type:ADD_CART,payload: props.movies});

                    }else {

                        props.movie.cantidad = props.movie.cantidad + 1;
                        props.dispatch({type:EDIT_CART,payload:props});
                    }
                break;

                case '-':

                break;

                case 'vaciar':
                    props.dispatch({type:EMPTY_CART})
                break;

                default:
                    return null;
            }
        } else if (item === 'quake3'){

        }
    }

    return (
        <div className="vistaCart">
            <div className="contenedorItem">
                <div className="botonCarrito" onClick={()=>modificarCompra("+","movie")}>+</div>
                <div className="producto"><img  alt="cyberCafe"/></div>
                <div className="botonCarrito" onClick={()=>modificarCompra("-")}>-</div>
                {/* <div className="botonCarrito" onClick={()=>modificarCompra("vaciar")}>VACIAR</div> */}
            </div>
            {/* <div className="contenedorItem">
                <div className="botonCarrito" onClick={()=>modificarCompra("+","quake3")}>+</div>
                <div className="producto"><img  alt="cyberCafe"/></div>
                <div className="botonCarrito" onClick={()=>modificarCompra("-")}>-</div>
                <div className="botonCarrito" onClick={()=>modificarCompra("vaciar")}>VACIAR</div>
            </div> */}

        </div>
    )
}

export default connect((state)=>({
    cart: state.cart,
    movies: state.movies,
}))(Cart);