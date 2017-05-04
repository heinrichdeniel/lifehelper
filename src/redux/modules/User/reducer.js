import constants from './constants'

let auth = JSON.parse(localStorage.getItem('auth'));

const initialState = {
  login: {
    pending: false,
    error: false
  },
  registration: {
    pending: false,
    error: false
  },
  authDetails: auth ? auth : {},
  user: {
    current:{
      id: "",
      username: "",
      password: "",
      email: "",
      photo_url: ""
    },
    list: []
  },
  collaborators: {
    pending: false,
    error: false,
    list: []
  },
  notifications: {
    pending: false,
    error: false,
    tasks: [],
    projects: []
  },
  selectedForm: "login"
};


const UserReducer = (state = initialState, action = {}) => {
  if (action.payload && (action.payload.message == "Expired token" || action.payload.message == "Token is missing")){
    localStorage.clear();
    window.location.href = window.location.pathname.substring(0,3);
  }
  switch (action.type) {
    case constants.LOGIN_PENDING:
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: true, error: false})
      };

    case constants.LOGIN_SUCCESS:
      localStorage.setItem('auth', JSON.stringify({token:action.payload.token}));
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: false, error: false}),
        authDetails: action.payload,
        user: {
          ...state.user,
          current: {
            ...state.user.current,
            ...action.payload.user,
            password: "",
            pending: false
          }
        }
      };

    case constants.LOGIN_ERROR:
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: false, error: action.payload.message})
      };

    case constants.RESET_LOGIN:
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: false, error: false})
      };

    case constants.REGISTRATION_PENDING:
      return {
        ...state,
        registration: Object.assign({}, state.registration, {pending: true, error: false})
      };

    case constants.REGISTRATION_SUCCESS:
      localStorage.setItem('auth', JSON.stringify({token:action.payload.token}));
      return {
        ...state,
        registration: Object.assign({}, state.registration, {pending: false, error: false}),
        authDetails: action.payload,
        user: {
          ...state.user,
          current: {
            ...state.user.current,
            ...action.payload.user,
            password: "",
            pending: false
          }
        }
      };

    case constants.REGISTRATION_ERROR:
      return {
        ...state,
        registration: Object.assign({}, state.registration, {pending: false, error: action.payload.message})
      };

    case constants.RESET_REGISTRATION:
      return {
        ...state,
        registration: Object.assign({}, state.registration, {pending: false, error: false})
      };

    case constants.UPDATE_GENERAL_SETTINGS_PENDING:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: true, success:false})
      };

    case constants.UPDATE_GENERAL_SETTINGS_ERROR:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: false, error: true, success:false})
      };

    case constants.UPDATE_GENERAL_SETTINGS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          current: action.payload.user,
          success: true,
          pending: false
        }
      };

    case constants.UPDATE_ACCOUNT_SETTINGS_PENDING:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: true, success: false})
      };

    case constants.UPDATE_ACCOUNT_SETTINGS_ERROR:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: false, error: action.payload.message, success: false})
      };

    case constants.UPDATE_ACCOUNT_SETTINGS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          current: action.payload.user,
          success: true,
          pending: false
        }
      };

    case constants.GET_PROFILE_PENDING:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: true})
      };

    case constants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          current: action.payload.user,
          pending:false
        }
      };

    case constants.GET_PROFILE_ERROR:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: false})
      };

    case constants.GET_USERS_BY_FILTER_PENDING:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: true})
      };

    case constants.GET_USERS_BY_FILTER_SUCCESS:
      let list = [];
      if (action.payload.taskId){
        list = action.payload.users.filter( (user) => (user.Tasks.filter( (task) => task.id == action.payload.taskId).length == 0));
      }
      else{
        list = action.payload.users.filter( (user) => (user.Projects.filter( (project) => project.id == action.payload.projectId).length == 0))
      }
      return {
        ...state,
        user: {
          ...state.user,
          pending: false,
          list: list
        }
      };

    case constants.GET_USERS_BY_FILTER_ERROR:
      return {
        ...state,
        collaborators: Object.assign({}, state.collaborators, {pending: false})
      };

    case constants.GET_COLLABORATORS_PENDING:
      return {
        ...state,
        collaborators: Object.assign({}, state.collaborators, {pending: true})
      };

    case constants.GET_COLLABORATORS_SUCCESS:
      return {
        ...state,
        collaborators: {
          ...state.collaborators,
          pending: false,
          list: action.payload.users
        }
      };

    case constants.GET_COLLABORATORS_ERROR:
      return {
        ...state,
        collaborators: Object.assign({}, state.collaborators, {pending: false})
      };

    case constants.GET_NOTIFICATIONS_PENDING:
      return {
        ...state,
        notifications: Object.assign({}, state.notifications, {pending: true})
      };

    case constants.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          pending: false,
          tasks: action.payload.notifications.tasks,
          projects: action.payload.notifications.projects
        },
        user:{
          ...state.user,
          current: {
            ...state.user.current,
            notifications: false
          }
        }
      };

    case constants.GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        notifications: Object.assign({}, state.notifications, {pending: false})
      };

    case constants.SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          current: {
            ...state.user.current,
            email: action.payload.email,
            photo_url: action.payload.photo_url,
            name: action.payload.name
          }
        }
      };

    case constants.SET_USERNAME:
      return {
        ...state,
        user: {
          ...state.user,
          current: Object.assign({}, state.user.current, {username: action.payload})
        }
      };

    case constants.SET_PASSWORD:
      return {
        ...state,
        user: {
          ...state.user,
          current: Object.assign({}, state.user.current, {password: action.payload})
        }
      };

    case constants.SET_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          current: Object.assign({}, state.user.current, {email: action.payload})
        }
      };

    case constants.REMOVE_ERROR:
      return {
        ...state,
        user: Object.assign({}, state.user, {error: false})
      };

    case constants.LOGOUT:
      localStorage.clear();
      initialState.authDetails = {};
      window.location.href = '/'+ window.location.pathname.substring(1,3);
      return initialState;

    case constants.SELECT_FORM:
      return {
        ...state,
        selectedForm: action.payload,
        user: initialState.user
      };

    case constants.RESET:
      return  initialState;

    default:
      return state
  }
};

export default UserReducer;
