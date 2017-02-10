import constants from './constants';
import moment from 'moment';

const initialState = {
  task: {
    list: [],
    current: {
      name: "",
      description: "",
      date: moment(),
      time: moment().format("H:m"),
      location: ""
    },
    pending: false,
    error: false
  }
};


const TaskReducer = (state = initialState, action = {}) => {
  if (action.payload && action.payload.err == "Error: Token expired"){
    localStorage.clear();
    window.location.href = '/'
  }
  switch (action.type) {
    case constants.CREATE_TASK_PENDING:
      return {
        ...state,
        task: {
          ...state.task,
          pending: true,
          error: false
        }
      };

    case constants.CREATE_TASK_SUCCESS:
      let list = state.task.list;
      if (action.payload.task){
        list = [
          action.payload.task,
          ...state.task.list
        ]
      }
      return {
        ...state,
        task: {
          ...state.task,
          list: list,
          pending: false,
          error: false
        }
      };

    case constants.CREATE_TASK_ERROR:
      return {
        ...state,
        task: {
          ...state.task,
          pending: false,
          error: action.payload.message
        }
      };
    case constants.GET_LIST_PENDING:
      return {
        ...state,
        task: {
          ...state.task,
          pending: true,
          error: false
        }
      };

    case constants.GET_LIST_SUCCESS:
      return {
        ...state,
        task:{
          ...state.task,
          list: action.payload.tasks,
          pending: false,
          error: false
        }

      };

    case constants.GET_LIST_ERROR:
      return {
        ...state,
        task: {
          ...state.task,
          pending: false,
          error: action.payload.message
        }
      };

    case constants.GET_TASK_PENDING:
      return {
        ...state,
        task: {
          ...state.task,
          pending: true,
          error: false
        }
      };

    case constants.GET_TASK_SUCCESS:
      return {
        ...state,
        task:{
          ...state.task,
          current: action.payload.task,
          pending: false,
          error: false
        }
      };

    case constants.GET_TASK_ERROR:
      window.location = "/asd";
      return {
        ...state,
        task: {
          ...state.task,
          pending: false,
          error: action.payload.message
        }
      };

    case constants.SET_NAME:
      return {
        ...state,
        task:{
          ...state.task,
          current: Object.assign({}, state.task.current, {name: action.payload})
        }
      };

    case constants.SET_DESCRIPTION:
      return {
        ...state,
        task:{
          ...state.task,
          current: Object.assign({}, state.task.current, {description: action.payload})
        }
      };

    case constants.SET_DATE:
      return {
        ...state,
        task:{
          ...state.task,
          current: Object.assign({}, state.task.current, {date: action.payload})
        }
      };

    case constants.SET_TIME:
      return {
        ...state,
        task:{
          ...state.task,
          current: Object.assign({}, state.task.current, {time: action.payload})
        }
      };

    case constants.RESET:
      return  {
        ...state,
        task:{
          ...state.task,
          current: initialState.task.current
        }

      };

    default:
      return state
  }
};

export default TaskReducer;
