import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Authentication from '../modules/Authentication/reducer'
import Tasks from '../modules/Tasks/reducer'
import Projects from '../modules/Projects/reducer'

export default combineReducers({
  Authentication,
  Tasks,
  Projects,
  routing: routerReducer
});
