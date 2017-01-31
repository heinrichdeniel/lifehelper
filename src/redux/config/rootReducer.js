import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Authentication from '../modules/Authentication/reducer'
import Tasks from '../modules/Tasks/reducer'

export default combineReducers({
  Authentication,
  Tasks,
  routing: routerReducer
});
