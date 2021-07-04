import { FAVORITES,  ORDERS, UPDATE_ORDERS } from '../types';

const initialState = {
    infoUser: [],
};
const infoUser = (state = initialState, action) => {
    switch(action.type){
        case FAVORITES:
            return action.payload;
        case ORDERS:
            return action.payload;
        case UPDATE_ORDERS:
            return action.payload;
        default :
            return state
    }
}
export default infoUser;