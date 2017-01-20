import constants from './constants'

let auth = JSON.parse(localStorage.getItem('auth'));

const initialState = {
  login: {
    pending: false,
    error: false
  },
  authDetails: auth ? auth : {},
  user: {
    username: "",
    password: "",
    email: "",
    photo_url: ""
  }
}


const AuthReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.LOGIN_PENDING:
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: true, error: false})
      }

    case constants.LOGIN_SUCCESS:
      localStorage.setItem('auth', JSON.stringify(action.payload));
      return {
        ...state,
        login: Object.assign({}, state.login, {pending: false, error: false}),
        authDetails: action.payload
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

    case constants.GET_PROFILE_PENDING:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: true})
      }

    case constants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: Object.assign({}, state.user, action.payload )
      }

    case constants.GET_PROFILE_ERROR:
      return {
        ...state,
        user: Object.assign({}, state.user, {pending: false})
      }



    case constants.SET_USER:
      localStorage.setItem('user', JSON.stringify(action.payload));
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

    case constants.LOGOUT:
      localStorage.clear();
      initialState.authDetails = {};
      return initialState;

    case constants.RESET:
      return  initialState;

    default:
      return state
  }
}

export default AuthReducer;
