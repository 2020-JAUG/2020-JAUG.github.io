import {ADD_CART, REMOVE_CART, EDIT_CART, EMPTY_CART} from '../types';

const initialState = {
    movie: [],
    quantity: 0
};

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        //Ejemplo de añadido de datos
        case ADD_CART :
            return {
                ...state, movie: [...state.movie, action.payload]
            };

        //Ejemplo de modificacion del carrito (otro producto que ya existia)
        case EDIT_CART :
            let nuevoCarrito = state.movie.map( (item) => {

				if (item.nombre === action.payload.nombre) { // si ya existe
					item.cantidad = action.payload.cantidad; // lo modifico
				};

				return item;
			});

		return {
			...state,
			movie: nuevoCarrito
		};

        //Ejemplo de reestablecimiento o borrado de datos
        case EMPTY_CART :
            return initialState;

        //Ejemplo de modificacion de datos
        case REMOVE_CART :
            return {...state, movie: action.payload};

        default :
            return state
    }
}
export default cartReducer;