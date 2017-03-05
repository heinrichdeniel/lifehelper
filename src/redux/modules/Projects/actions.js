import store from 'redux/config/store'
import constants from './constants'
import * as api from 'api/projects'
import * as TaskActions from '../Tasks/actions'

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
          token: getState().Authentication.authDetails.token
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
          token: getState().Authentication.authDetails.token
        })
      }
    }).then(function(){
      TaskActions.getTaskList();
    })
  });
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
          token: getState().Authentication.authDetails.token
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
