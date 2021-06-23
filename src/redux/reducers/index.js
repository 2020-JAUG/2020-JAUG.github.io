import { combineReducers } from "redux";
import credentials from "./credentials-reducer";
import movies from "./characters-reducer";

const rootReducer = combineReducers({
  // aquí importaremos todos los reducers:
  credentials,
  movies,
});

export default rootReducer;
