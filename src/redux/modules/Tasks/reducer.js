import constants from './constants';
import moment from 'moment';

const initialState = {
  task: {
    list: [],
    current: {
      name: "",
      description: "",
      date: moment(),
      time: moment().add(1,'hours').format("H:m"),
      location: "",
      ProjectId: "0"
    },
    dateFrom: moment(),
    dateTo: moment().add(1,'years'),
    pending: false,
    error: false
  }
};


const TaskReducer = (state = initialState, action = {}) => {
  if (action.payload && (action.payload.message == "Expired token" || action.payload.message == "Token is missing")){
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
      return {
        ...state,
        task: {
          ...state.task,
          list: [
            action.payload.task,
            ...state.task.list.filter((task) => task.id != action.payload.task.id)
          ],
          current: (state.task.current.id == action.payload.task.id)?action.payload.task:state.task.current,
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
      return {
        ...state,
        task: {
          ...state.task,
          pending: false,
          error: action.payload.message
        }
      };

    case constants.DELETE_TASK_PENDING:
      return {
        ...state,
        task: {
          ...state.task,
          pending: true,
          error: false
        }
      };

    case constants.DELETE_TASK_SUCCESS:

      return {
        ...state,
        task: {
          ...state.task,
          list: state.task.list.filter( (task) => task.id != state.task.current.id),
          pending: false,
          error: false
        }
      };

    case constants.DELETE_TASK_ERROR:
      return {
        ...state,
        task: {
          ...state.task,
          pending: false,
          error: action.payload.message
        }
      };

    case constants.APPLY_DATE_FILTER:
      return {
        ...state,
        task: {
          ...state.task,
          dateFrom: action.payload.dateFrom,
          dateTo: action.payload.dateTo
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
