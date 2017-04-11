import constants from './constants';

const initialState = {
  project: {
    list: [],
    current: {
      name: "",
      color: "#000000"
    },
    selected: "",
    pending: false,
    error: false
  },
  share: {
    pending: false,
    error: false,
    success: false
  }
};


const ProjectReducer = (state = initialState, action = {}) => {
  if (action.payload && (action.payload.message == "Expired token" || action.payload.message == "Token is missing")){
    localStorage.clear();
    window.location.href = window.location.pathname.substring(0,3);
  }
  switch (action.type) {
    case constants.CREATE_PROJECT_PENDING:
      return {
        ...state,
        project: {
          ...state.project,
          pending: true,
          error: false
        }
      };

    case constants.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        project: {
          ...state.project,
          list: [
            action.payload.project,
            ...state.project.list.filter((project) => project.id != action.payload.project.id)
          ],
          selected: action.payload.project,
          current: {},
          pending: false,
          error: false
        }
      };

    case constants.CREATE_PROJECT_ERROR:
      return {
        ...state,
        project: {
          ...state.project,
          pending: false,
          error: action.payload.message
        }
      };

    case constants.DELETE_PROJECT_PENDING:
      return {
        ...state,
        project: {
          ...state.project,
          pending: true,
          error: false
        }
      };

    case constants.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        project: {
          ...state.project,
          list: state.project.list.filter( (project) => project.id != action.payload.projectId),
          selected: null,
          pending: false,
          error: false
        }
      };

    case constants.DELETE_PROJECT_ERROR:
      return {
        ...state,
        project: {
          ...state.project,
          pending: false,
          error: action.payload.message
        }
      };

    case constants.GET_LIST_PENDING:
      return {
        ...state,
        project: {
          ...state.project,
          pending: true,
          error: false
        }
      };

    case constants.GET_LIST_SUCCESS:
      return {
        ...state,
        project:{
          ...state.project,
          list: action.payload.projects,
          pending: false,
          error: false
        }

      };

    case constants.GET_LIST_ERROR:
      return {
        ...state,
        project: {
          ...state.project,
          pending: false,
          error: action.payload.message
        }
      };

    case constants.SELECT_PROJECT:
      return {
        ...state,
        project: {
          ...state.project,
          selected: action.payload
        }
      };

    case constants.RESET:
      return {
        ...state,
        project: {
          ...state.project,
          error: false
        }
      };

    case constants.SHARE_TASK_PENDING:
      return {
        ...state,
        share: Object.assign({}, state.share, {pending: true})
      };

    case constants.SHARE_PROJECT_SUCCESS:
      return {
        ...state,
        share: {
          ...state.share,
          pending: false,
          success: true
        },
        project:{
          ...state.project,
          list: [
            action.payload.project,
            ...state.project.list.filter((project) => project.id != action.payload.project.id)
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


    default:
      return state
  }
};

export default ProjectReducer;
