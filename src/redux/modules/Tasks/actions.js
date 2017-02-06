import store from 'redux/config/store'
import constants from './constants'
import * as api from 'api/tasks'

export function sendTask(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.CREATE_TASK_PENDING,
        constants.CREATE_TASK_SUCCESS,
        constants.CREATE_TASK_ERROR
      ],
      payload: {
        promise: api.createTask({
                    ...payload,
                    token: getState().Authentication.authDetails.token
        })
      }
    })
  });
}

export function getTaskById(id) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_TASK_PENDING,
        constants.GET_TASK_SUCCESS,
        constants.GET_TASK_ERROR
      ],
      payload: {
        promise: api.getTaskById({
          token: getState().Authentication.authDetails.token,
          id: id
        })
      }
    })
  })
}

export function getTaskList() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_LIST_PENDING,
        constants.GET_LIST_SUCCESS,
        constants.GET_LIST_ERROR
      ],
      payload: {
        promise: api.getTaskList({
          token: getState().Authentication.authDetails.token
        })
      }
    })
  })
}

export function setName(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SET_NAME,
      payload: payload
    })
  })
}

export function setDescription(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SET_DESCRIPTION,
      payload: payload
    })
  })
}

export function setDate(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SET_DATE,
      payload: payload
    })
  })
}

export function setTime(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SET_TIME,
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
