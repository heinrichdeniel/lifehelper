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
    id: "",
    username: "",
    password: "",
    email: "",
    photo_url: ""
  }
}


const UserReducer = (state = initialState, action = {}) => {
  if (action.payload && (action.payload.message == "Expired token" || action.payload.message == "Token is missing")){
    localStorage.clear();
    window.location.href = '/'
  }
  switch (action.type) {
    case constants.LOGIN_PENDING:
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: true, error: false})
      }

    case constants.LOGIN_SUCCESS:
      localStorage.setItem('auth', JSON.stringify({token:action.payload.token}));
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: false, error: false}),
        authDetails: action.payload,
        user: action.payload.user
      }

    case constants.LOGIN_ERROR:
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: false, error: action.payload.message})
      }

    case constants.RESET_LOGIN:
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: false, error: false})
      }

    case constants.REGISTRATION_PENDING:
      return {
        ...state,
        registration: Object.assign({}, state.registration, {pending: true, error: false})
      }

    case constants.REGISTRATION_SUCCESS:
      localStorage.setItem('auth', JSON.stringify({token:action.payload.token}));
      return {
        ...state,
        registration: Object.assign({}, state.registration, {pending: false, error: false}),
        authDetails: action.payload,
        user: action.payload.user
      }

    case constants.REGISTRATION_ERROR:
      return {
        ...state,
        registration: Object.assign({}, state.registration, {pending: false, error: action.payload.message})
      }

    case constants.RESET_REGISTRATION:
      return {
        ...state,
        registration: Object.assign({}, state.registration, {pending: false, error: false})
      }

    case constants.UPDATE_GENERAL_SETTINGS_PENDING:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: true})
      }

    case constants.UPDATE_GENERAL_SETTINGS_ERROR:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: false, error: true})
      }

    case constants.UPDATE_GENERAL_SETTINGS_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload.user,
          success: true
        }
      }

    case constants.UPDATE_ACCOUNT_SETTINGS_PENDING:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: true, success: false})
      }

    case constants.UPDATE_ACCOUNT_SETTINGS_ERROR:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: false, error: action.payload.message, success: false})
      }

    case constants.UPDATE_ACCOUNT_SETTINGS_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload.user,
          success: true
        }
      }

    case constants.GET_PROFILE_PENDING:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: true})
      }

    case constants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      }

    case constants.GET_PROFILE_ERROR:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: false})
      }



    case constants.SET_USER:
      return {
        ...state,
        user: {
          email: action.payload.email,
          photo_url: action.payload.photo_url,
          name: action.payload.name
        }
      }

    case constants.SET_USERNAME:
      return {
        ...state,
        user: Object.assign({}, state.user, {username: action.payload})
      };

    case constants.SET_PASSWORD:
      return {
        ...state,
        user: Object.assign({}, state.user, {password: action.payload})
      };

    case constants.SET_EMAIL:
      return {
        ...state,
        user: Object.assign({}, state.user, {email: action.payload})
      };

    case constants.REMOVE_ERROR:
      return {
        ...state,
        user: Object.assign({}, state.user, {error: false})
      };

    case constants.LOGOUT:
      localStorage.clear();
      initialState.authDetails = {};
      window.location.href = '/'
      return initialState;

    case constants.RESET:
      return  initialState;

    default:
      return state
  }
}

export default UserReducer;
