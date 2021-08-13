import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { registerReducer } from '../pages/Register/redux/registerReducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    registration : registerReducer
});

export default createRootReducer;