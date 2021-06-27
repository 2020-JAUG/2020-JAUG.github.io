import {applyMiddleware, createStore} from 'redux';
import { save, load } from "redux-localstorage-simple";
import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(
	save({ states: ['credentials', 'cart', 'infoUser'] })
)(createStore);

//Aqui guardamos en el local-storage de RDX
const store = createStoreWithMiddleware(
    reducer,
    load({ states: ['credentials', 'cart', 'infoUser'] }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
    })
);

export default store;