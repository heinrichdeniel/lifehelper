import store from 'redux/config/store'
import constants from './constants'
import * as api from 'api/user'

export function logout() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.LOGOUT
    })
  })
}

export function login(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.LOGIN_PENDING,
        constants.LOGIN_SUCCESS,
        constants.LOGIN_ERROR
      ],
      payload: {
        promise: api.login(payload)
      }
    })
  })
}

export function loginFacebook(payload) {
  if (payload.authResponse){
    store.dispatch((dispatch, getState) => {
      return dispatch({
        type: constants.SET_USER,
        payload: {
          email: payload.user.email,
          photo_url: payload.user.picture.data.url,
          name: payload.user.name
        }
      })
    })
    store.dispatch((dispatch, getState) => {
      return dispatch({
        types: [
          constants.LOGIN_PENDING,
          constants.LOGIN_SUCCESS,
          constants.LOGIN_ERROR
        ],
        payload: {
          promise: api.loginFacebook(payload)
        }
      })
    })
  }
}

export function loginGoogle(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SET_USER,
      payload: {
        email: payload.w3.U3,
        photo_url: payload.w3.Paa,
        name: payload.w3.ig
      }
    })
  });
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.LOGIN_PENDING,
        constants.LOGIN_SUCCESS,
        constants.LOGIN_ERROR
      ],
      payload: {
        promise: api.loginGoogle(payload)
      }
    })
  });
}

export function registration(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.REGISTRATION_PENDING,
        constants.REGISTRATION_SUCCESS,
        constants.REGISTRATION_ERROR
      ],
      payload: {
        promise: api.registration(payload)
      }
    })
  })
}

export function getProfile() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_PROFILE_PENDING,
        constants.GET_PROFILE_SUCCESS,
        constants.GET_PROFILE_ERROR
      ],
      payload: {
        promise: api.getProfile({
          token: getState().User.authDetails.token
        })
      }
    })
  })
}

export function setName(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SET_USERNAME,
      payload: payload
    })
  })
}

export function setPassword(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SET_PASSWORD,
      payload: payload
    })
  })
}

export function setEmail(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SET_EMAIL,
      payload: payload
    })
  })
}

export function reset() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.RESET
    })
  })
}

export function resetLogin() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.RESET_LOGIN
    })
  })
}

export function resetRegistration() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.RESET_REGISTRATION
    })
  })
}
export function removeError() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.REMOVE_ERROR
    })
  })
}

export function updateGeneralSettings(settings) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.UPDATE_GENERAL_SETTINGS_PENDING,
        constants.UPDATE_GENERAL_SETTINGS_SUCCESS,
        constants.UPDATE_GENERAL_SETTINGS_ERROR
      ],
      payload: {
        promise: api.updateGeneralSettings({
          token: getState().User.authDetails.token,
          settings: settings
        })
      }
    })
  })
}

export function updateAccountSettings(settings) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.UPDATE_ACCOUNT_SETTINGS_PENDING,
        constants.UPDATE_ACCOUNT_SETTINGS_SUCCESS,
        constants.UPDATE_ACCOUNT_SETTINGS_ERROR
      ],
      payload: {
        promise: api.updateAccountSettings({
          token: getState().User.authDetails.token,
          settings: settings
        })
      }
    })
  })
}

export function getUsersByFilter(filter, taskId, projectId) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_USERS_BY_FILTER_PENDING,
        constants.GET_USERS_BY_FILTER_SUCCESS,
        constants.GET_USERS_BY_FILTER_ERROR
      ],
      payload: {
        promise: api.getUsersByFilter({
          token: getState().User.authDetails.token,
          filter: filter,
          taskId: taskId,
          projectId: projectId
        })
      }
    })
  })
}


export function getCollaborators(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_COLLABORATORS_PENDING,
        constants.GET_COLLABORATORS_SUCCESS,
        constants.GET_COLLABORATORS_ERROR
      ],
      payload: {
        promise: api.getCollaborators({
          token: getState().User.authDetails.token,
          ...payload
        })
      }
    })
  })
}

export function getNotifications(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_NOTIFICATIONS_PENDING,
        constants.GET_NOTIFICATIONS_SUCCESS,
        constants.GET_NOTIFICATIONS_ERROR
      ],
      payload: {
        promise: api.getNotifications({
          token: getState().User.authDetails.token,
          parameters: payload
        })
      }
    })
  })
}
