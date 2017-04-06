import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddTask from "../components/AddTask"
import * as taskActions from 'redux/modules/Tasks/actions'
import * as taskSelectors from 'redux/modules/Tasks/selectors'
import * as projectActions from 'redux/modules/Projects/actions'
import * as projectSelectors from 'redux/modules/Projects/selectors'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
  setName: taskActions.setName,
  setDescription: taskActions.setDescription,
  setDate: taskActions.setDate,
  setTime: taskActions.setTime,
  sendTask: taskActions.sendTask,
  setLocation: taskActions.setLocation,
  reset: taskActions.reset,
  getTaskById: taskActions.getTaskById,
  selectProject: projectActions.selectProject,
  getProjectList: projectActions.getProjectList
});
const mapStateToProps = (state) => ({
  task: taskSelectors.task(state),
  project: projectSelectors.project(state),
  content: contentSelectors.content(state),
  user: userSelectors.user(state).current
});


export default connect(mapStateToProps, mapActionsToProps) (AddTask);
