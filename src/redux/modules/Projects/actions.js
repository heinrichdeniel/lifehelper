import store from 'redux/config/store'
import constants from './constants'
import * as api from 'api/projects'
import * as TaskActions from '../Tasks/actions'
import * as userActions from '../User/actions'

export function createProject(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.CREATE_PROJECT_PENDING,
        constants.CREATE_PROJECT_SUCCESS,
        constants.CREATE_PROJECT_ERROR
      ],
      payload: {
        promise: api.createProject({
          ...payload,
          token: getState().User.authDetails.token
        })
      }
    })
  });
}

export function deleteProject(id) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.DELETE_PROJECT_PENDING,
        constants.DELETE_PROJECT_SUCCESS,
        constants.DELETE_PROJECT_ERROR
      ],
      payload: {
        promise: api.deleteProject({
          id,
          token: getState().User.authDetails.token
        })
      }
    }).then(function(){
      TaskActions.getTaskList();
    })
  }).then (function(){
    userActions.getNotifications()
  })
}

export function getProjectList() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_LIST_PENDING,
        constants.GET_LIST_SUCCESS,
        constants.GET_LIST_ERROR
      ],
      payload: {
        promise: api.getProjectList({
          token: getState().User.authDetails.token
        })
      }
    })
  })
}

export function selectProject(project) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SELECT_PROJECT,
      payload: project
    })
  })
}

export function shareProject(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.SHARE_PROJECT_PENDING,
        constants.SHARE_PROJECT_SUCCESS,
        constants.SHARE_PROJECT_ERROR
      ],
      payload: {
        promise: api.shareProject({
          token: getState().User.authDetails.token,
          ...payload
        })
      }
    })
  }).then (function(){
    userActions.getCollaborators({projectId: payload.project.id})
    userActions.getUsersByFilter("" , payload.project.id)
  })
}


export function acceptShare(projectId) {
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
          projectId: projectId
        })
      }
    })
  }).then (function(){
    userActions.getNotifications()
  })
}


export function declineShare(projectId) {
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
          projectId: projectId
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
    userActions.getCollaborators({projectId:payload.projectId})
    userActions.getUsersByFilter("" , payload.projectId)
  })
}

export function reset() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.RESET
    })
  })
}
