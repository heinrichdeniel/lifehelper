import constants from './constants';
import moment from 'moment';

const initialState = {
  task: {
    list: [],
    current: {
      name: "",
      description: "",
      date: moment(),
      time: moment().add(1, 'hours').format("H:m"),
      location: "",
      ProjectId: "0",
      status: "pending",
      commented: false
    },
    dateFrom: null,
    dateTo: null,
    filteringByDate: true,
    pending: false,
    error: false
  },
  share: {
    pending: false,
    error: false,
    success: false
  }
};


const TaskReducer = (state = initialState, action = {}) => {
  if (action.payload && (action.payload.message == "Expired token" || action.payload.message == "Token is missing")){
    localStorage.clear();
    window.location.href = window.location.pathname.substring(0,3);
  }
  switch (action.type) {
    case constants.CREATE_TASK_PENDING:
      return {
        ...state,
        task: {
          ...state.task,
          addTask: {
            pending: true,
            error: false
          }
        }
      };

    case constants.CREATE_TASK_SUCCESS:
      let task = action.payload.task;
      let list = [];
      if (task.status != "pending"){
        list = state.task.list.filter((task) => task.id != action.payload.task.id)
      }else{
        list = [
          task,
          ...state.task.list.filter((task) => task.id != action.payload.task.id)
        ]
      }
      return {
        ...state,
        task: {
          ...state.task,
          list: list,
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
      console.log(action)
      return {
        ...state,
        task: {
          ...state.task,
          list: state.task.list.filter((task) => task.id != action.payload.taskId),
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
          filteringByDate: !state.task.filteringByDate
        }
      };

    case constants.CHANGE_DATE_FILTER:
      return {
        ...state,
        task: {
          ...state.task,
          dateFrom: action.payload.dateFrom,
          dateTo: action.payload.dateTo,
          filteringByDate: true
        }
      };

    case constants.SHARE_TASK_PENDING:
      return {
        ...state,
        share: Object.assign({}, state.share, {pending: true})
      };

    case constants.SHARE_TASK_SUCCESS:
      return {
        ...state,
        share: {
          ...state.share,
          pending: false,
          success: true
        },
        task:{
          ...state.task,
          list: [
            action.payload.task,
            ...state.task.list.filter((task) => task.id != action.payload.task.id)
          ]
        }
      };

    case constants.SHARE_TASK_ERROR:
      return {
        ...state,
        share: Object.assign({}, state.share, {pending: false, error: action.payload.message})
      };


    case constants.ACCEPT_SHARE_PENDING:
      return {
        ...state,
        share: Object.assign({}, state.share, {pending: true})
      };

    case constants.ACCEPT_SHARE_SUCCESS:
      return {
        ...state,
        share: {
          ...state.share,
          pending: false,
          success: true
        }
      };

    case constants.ACCEPT_SHARE_ERROR:
      return {
        ...state,
        share: Object.assign({}, state.share, {pending: false, error: action.payload.message})
      };

    case constants.DECLINE_SHARE_PENDING:
      return {
        ...state,
        share: Object.assign({}, state.share, {pending: true})
      };

    case constants.DECLINE_SHARE_SUCCESS:
      return {
        ...state,
        share: {
          ...state.share,
          pending: false,
          success: true
        }
      };

    case constants.DECLINE_SHARE_ERROR:
      return {
        ...state,
        share: Object.assign({}, state.share, {pending: false, error: action.payload.message})
      };

    case constants.REMOVE_SHARE_PENDING:
      return {
        ...state,
        share: Object.assign({}, state.share, {pending: true})
      };

    case constants.REMOVE_SHARE_SUCCESS:
      return {
        ...state,
        share: {
          ...state.share,
          pending: false,
          success: true
        }
      };

    case constants.REMOVE_SHARE_ERROR:
      return {
        ...state,
        share: Object.assign({}, state.share, {pending: false, error: action.payload.message})
      };

    case constants.CHANGE_TASK_ORDER_PENDING:
      return {
        ...state,
        task:{
          ...state.task,
          pending: true,
          error: false
        }
      };

    case constants.CHANGE_TASK_ORDER_SUCCESS:
      return {
        ...state,
        task:{
          ...state.task,
          list: action.payload.tasks,
          pending: false,
          error: false
        }
      };

    case constants.CHANGE_TASK_ORDER_ERROR:
      return {
        ...state,
        task:{
          ...state.task,
          pending: false,
          error: action.payload.message
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
