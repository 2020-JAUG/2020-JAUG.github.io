import { FAVORITES,  ORDERS } from '../types';
const initialState =
    'profile'
;
const infoUser = (state = initialState, action) => {
    switch(action.type){
        case FAVORITES:
            return action.payload;
        case ORDERS:
            return action.payload;
        default :
            return state
    }
}
export default infoUser;