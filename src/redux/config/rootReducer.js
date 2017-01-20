import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Authentication from '../modules/Authentication/reducer'

export default combineReducers({
  Authentication,
  routing: routerReducer
});
