import constants from './constants';

const initialState = {
  project: {
    list: [],
    current: {
      name: "",
      color: "#000000"
    },
    selected: JSON.parse(localStorage.getItem('project')),
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
      localStorage.setItem('project', JSON.stringify(action.payload.project));
      return {
        ...state,
        project: {
          ...state.project,
          list: [
            ...state.project.list.filter((project) => project.id != action.payload.project.id),
            action.payload.project
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
      localStorage.setItem('project', null);
      return {
        ...state,
        project: {
          ...state.project,
          list: state.project.list.filter( (project) => project.id != state.project.selected.id),
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
      localStorage.setItem('project', JSON.stringify(action.payload));
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

    default:
      return state
  }
};

export default ProjectReducer;
