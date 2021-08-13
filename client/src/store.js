import { createStore, applyMiddleware, compose } from "redux";
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import immutableCheckMiddleWare from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from './redux/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

export const dependencies = {
    history: createBrowserHistory(),
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost/',
});

export const store = createStore(
    reducers(dependencies.history),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(dependencies.history),
        thunk.withExtraArgument({ history: dependencies.history, axiosInstance }),
        immutableCheckMiddleWare(),
        logger
      ),
    ),
);