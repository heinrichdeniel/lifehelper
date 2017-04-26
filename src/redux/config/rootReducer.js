import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import User from '../modules/User/reducer'
import Tasks from '../modules/Tasks/reducer'
import Projects from '../modules/Projects/reducer'
import Content from '../modules/Content/reducer'
import Comments from '../modules/Comments/reducer'

export default combineReducers({
  User,
  Tasks,
  Projects,
  Comments,
  Content,
  routing: routerReducer
});
