import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectList from "../components/ProjectList"
import * as projectActions from 'redux/modules/Projects/actions'
import * as projectSelectors from 'redux/modules/Projects/selectors'
import * as taskActions from 'redux/modules/Tasks/actions'
import * as taskSelectors from 'redux/modules/Tasks/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'
import * as userSelectors from 'redux/modules/User/selectors'
import * as userActions from 'redux/modules/User/actions'

const mapActionsToProps = (dispatch) => ({
  getTaskList: taskActions.getTaskList,
  sendProject: projectActions.createProject,
  deleteProject: projectActions.deleteProject,
  deleteTask: taskActions.deleteTask,
  getUsersByFilter: userActions.getUsersByFilter,
  shareTask: taskActions.shareTask,
  updateTask: taskActions.sendTask,
  updateProject: projectActions.createProject


});

const mapStateToProps = (state) => ({
  content: contentSelectors.content(state),
  task: taskSelectors.task(state),
  project: projectSelectors.project(state),
  user: userSelectors.user(state)
});

export default connect(mapStateToProps,mapActionsToProps)(ProjectList);
