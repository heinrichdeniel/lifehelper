import store from 'redux/config/store'
import constants from './constants'
import * as api from 'api/tasks'
import * as userActions from '../User/actions'

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
                    token: getState().User.authDetails.token
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
          token: getState().User.authDetails.token,
          id: id
        })
      }
    })
  })
}

export function deleteTask(id) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.DELETE_TASK_PENDING,
        constants.DELETE_TASK_SUCCESS,
        constants.DELETE_TASK_ERROR
      ],
      payload: {
        promise: api.deleteTask({
          token: getState().User.authDetails.token,
          id: id
        }).then( () => {
          getTaskList();
        })
      }
    })
  }).then (function(){
    userActions.getNotifications()
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
          token: getState().User.authDetails.token
        })
      }
    })
  })
}

export function getArchive() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_LIST_PENDING,
        constants.GET_LIST_SUCCESS,
        constants.GET_LIST_ERROR
      ],
      payload: {
        promise: api.getArchive({
          token: getState().User.authDetails.token
        })
      }
    })
  })
}

export function changeDateFilter(filter) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.CHANGE_DATE_FILTER,
      payload: filter
    })
  })
}

export function applyDateFilter() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.APPLY_DATE_FILTER
    })
  })
}

export function shareTask(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.SHARE_TASK_PENDING,
        constants.SHARE_TASK_SUCCESS,
        constants.SHARE_TASK_ERROR
      ],
      payload: {
        promise: api.shareTask({
          token: getState().User.authDetails.token,
          ...payload
        })
      }
    })
  }).then (function(){
    userActions.getCollaborators({taskId: payload.task.id})
    userActions.getUsersByFilter("" , payload.task.id)
  })
}


export function acceptShare(taskId) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.ACCEPT_SHARE_PENDING,
        constants.ACCEPT_SHARE_SUCCESS,
        constants.ACCEPT_SHARE_ERROR
      ],
      payload: {
        promise: api.acceptShare({
          token: getState().User.authDetails.token,
          taskId: taskId
        })
      }
    })
  }).then (function(){
    userActions.getNotifications()
  })
}


export function declineShare(taskId) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.DECLINE_SHARE_PENDING,
        constants.DECLINE_SHARE_SUCCESS,
        constants.DECLINE_SHARE_ERROR
      ],
      payload: {
        promise: api.declineShare({
          token: getState().User.authDetails.token,
          taskId: taskId
        })
      }
    })
  }).then (function(){
    userActions.getNotifications()
  })
}


export function removeShare(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.REMOVE_SHARE_PENDING,
        constants.REMOVE_SHARE_SUCCESS,
        constants.REMOVE_SHARE_ERROR
      ],
      payload: {
        promise: api.removeShare({
          token: getState().User.authDetails.token,
          data: payload
        })
      }
    })
  }).then (function(){
    userActions.getCollaborators({taskId:payload.taskId})
    userActions.getUsersByFilter("" , payload.taskId)
  })
}

export function reset() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.RESET
    })
  })
}
