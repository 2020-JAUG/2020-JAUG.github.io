import { combineReducers } from "redux";
import credentials from "./credentials-reducer";
import movies from "./characters-reducer";
import cart from './cart-reducer'
import infoUser from './infoUser-reducer'

const rootReducer = combineReducers({
  // aquí importaremos todos los reducers:
  credentials,
  movies,
  cart,
  infoUser,
});

export default rootReducer;
