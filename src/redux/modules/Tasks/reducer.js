import constants from './constants';
import moment from 'moment';

const initialState = {
  task: {
    list: [],
    current: {
      name: "",
      description: "",
      date: moment().format("MM-DD-YYYY"),
      time: moment().format("HH:mm"),
      location: ""
    },
    pending: false,
    error: false
  }
};


const TaskReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.CREATE_TASK_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };

    case constants.CREATE_TASK_SUCCESS:
      return {
        ...state,
        pending: false,
        error: false
      };

    case constants.CREATE_TASK_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.message
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
      return  initialState;

    default:
      return state
  }
};

export default TaskReducer;
