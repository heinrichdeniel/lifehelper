import {createStore, applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import promiseMiddleware from "./promiseMiddleware";
import thunk from "redux-thunk";
import {browserHistory} from "react-router";
import {routerMiddleware} from "react-router-redux";

const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  rootReducer,
  applyMiddleware(routingMiddleware, thunk, promiseMiddleware)
);

export default store
