import store from 'redux/config/store'
import constants from './constants'
import * as api from 'api/comments'
import * as taskActions from '../Tasks/actions'
import * as projectActions from '../Projects/actions'

export function showHideMessagePanel() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SHOW_HIDE_PANEL
    })
  })
}

export function getTasksAndProjects() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_ALL_PENDING,
        constants.GET_ALL_SUCCESS,
        constants.GET_ALL_ERROR
      ],
      payload: {
        promise: api.getTasksAndProjects({
          token: getState().User.authDetails.token
        })
      }
    })
  })
}


export function sendComment(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.SEND_COMMENT_PENDING,
        constants.SEND_COMMENT_SUCCESS,
        constants.SEND_COMMENT_ERROR
      ],
      payload: {
        promise: api.sendComment({
          token: getState().User.authDetails.token,
          ...payload
        })
      }
    })
  }).then(function(){
    getComments();
  })
}

export function getComments() {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.GET_COMMENTS_PENDING,
        constants.GET_COMMENTS_SUCCESS,
        constants.GET_COMMENTS_ERROR
      ],
      payload: {
        promise: api.getComments({
          token: getState().User.authDetails.token
        })
      }
    })
  })
}

export function clearNewComment(payload) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      types: [
        constants.CLEAR_NEW_COMMENT_PENDING,
        constants.CLEAR_NEW_COMMENT_SUCCESS,
        constants.CLEAR_NEW_COMMENT_ERROR
      ],
      payload: {
        promise: api.clearNewComment({
          token: getState().User.authDetails.token,
          ...payload
        })
      }
    })
  }).then (() =>{
    if (payload.task){
      selectTask(payload.task.id)
    }
    else{
      selectProject(payload.project.id)
    }
    taskActions.getTaskList();
    projectActions.getProjectList();
  })

}

export function selectTask(taskId) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SELECT_TASK,
      payload: {
        taskId: taskId
      }
    })
  })
}


export function selectProject(projectId) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SELECT_PROJECT,
      payload: {
        projectId: projectId
      }
    })
  })
}

