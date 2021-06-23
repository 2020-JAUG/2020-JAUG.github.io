import { LOGIN, LOGOUT, UPDATE_USER, LEFT_USER } from '../types';

const initialState = {
    client : {},
    admin: {},
    token : ''
};

const credentialsReducer = (state = initialState, action) => {

    switch(action.type){
        case LOGIN :
            return action.payload;

        case LOGOUT :
            return initialState;

        case UPDATE_USER:
            return {...state, client: action.payload}

        case LEFT_USER:
            return {...state, dentist: action.payload}

        default:
            return state
    }


}

export default credentialsReducer;