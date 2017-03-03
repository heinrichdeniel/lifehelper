import constants from './constants';

const initialState = {
  project: {
    list: [],
    current: {
      name: "",
      color: "#000000"
    },
    pending: false,
    error: false
  }
};


const ProjectReducer = (state = initialState, action = {}) => {
  if (action.payload && action.payload.message == "Expired token"){
    localStorage.clear();
    window.location.href = '/'
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
            ...state.project.list,
            action.payload.project ? action.payload.project : null
          ],
          current: action.payload.project,
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
          selected: (action.payload == state.project.selected) ? null : action.payload
        }
      };


    default:
      return state
  }
};

export default ProjectReducer;
