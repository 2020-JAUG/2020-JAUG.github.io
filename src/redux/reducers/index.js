import { combineReducers } from "redux";
import credentials from "./credentials-reducer";
import movies from "./characters-reducer";
// import cart from './cart-reducer';
import infoUser from './infoUser-reducer';
// import datosReducer from "./datos-reducer";

const rootReducer = combineReducers({
  // aquí importaremos todos los reducers:
  credentials,
  movies,
  // cart,
  infoUser,
  // datosReducer
});

export default rootReducer;
