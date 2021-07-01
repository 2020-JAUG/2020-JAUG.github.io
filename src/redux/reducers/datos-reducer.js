import { SEARCH_DATO } from '../types';
const initialState =
    'profile'
;
const datosReducer = (state = initialState, action) => {
    switch(action.type){

        case SEARCH_DATO:
            return action.payload;
        default :
            return state
    }
}
export default datosReducer;