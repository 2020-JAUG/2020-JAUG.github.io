import { ADD_MOVIES } from "../types";

const initialState = {
  movies: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIES:
      return action.payload;

    default:
      return state;
  }
};

export default moviesReducer;
