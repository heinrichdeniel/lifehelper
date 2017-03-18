import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskList from "../components/TaskList"
import * as actions from 'redux/modules/Tasks/actions'
import * as selectors from 'redux/modules/Tasks/selectors'
import * as projectActions from 'redux/modules/Projects/actions'
import * as projectSelectors from 'redux/modules/Projects/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'
import * as userSelectors from 'redux/modules/User/selectors'

const mapActionsToProps = (dispatch) => ({
  getTaskList: actions.getTaskList,
  reset: actions.reset,
  createProject: projectActions.createProject,
  deleteProject: projectActions.deleteProject
});
const mapStateToProps = (state) => ({
  task: selectors.task(state),
  dateFrom: selectors.dateFrom(state),
  dateTo: selectors.dateTo(state),
  project: projectSelectors.project(state),
  content: contentSelectors.content(state),
  user: userSelectors.user(state)
});


export default connect(mapStateToProps, mapActionsToProps) (TaskList);
