import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import User from '../modules/User/reducer'
import Tasks from '../modules/Tasks/reducer'
import Projects from '../modules/Projects/reducer'
import Content from '../modules/Content/reducer'

export default combineReducers({
  User,
  Tasks,
  Projects,
  Content,
  routing: routerReducer
});
