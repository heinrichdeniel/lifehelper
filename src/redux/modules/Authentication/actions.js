import store from 'redux/config/store'
import constants from './constants'
import * as api from 'api/authentication'


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

export function resetLogin() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.RESET_LOGIN
    })
  })
}

export function loginFacebook(payload) {
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
export function getProfile(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_PROFILE_PENDING,
        constants.GET_PROFILE_SUCCESS,
        constants.GET_PROFILE_ERROR
      ],
      payload: {
        promise: api.getProfile(payload)
      }
    })
  })
}
export function updateProfile(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.UPDATE_PROFILE_PENDING,
        constants.UPDATE_PROFILE_SUCCESS,
        constants.UPDATE_PROFILE_ERROR
      ],
      payload: {
        promise: api.updateProfile(payload)
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
