import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskPage from "../components/TaskPage"
import * as actions from 'redux/modules/Tasks/actions'
import * as selectors from 'redux/modules/Tasks/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'
import * as userSelectors from 'redux/modules/User/selectors'

const mapActionsToProps = (dispatch) => ({
  getTaskById: actions.getTaskById,
  deleteTask: actions.deleteTask,
  setLocation: actions.setLocation
});
const mapStateToProps = (state) => ({
  task: selectors.task(state),
  content: contentSelectors.content(state),
  user: userSelectors.user(state)
});


export default connect(mapStateToProps, mapActionsToProps) (TaskPage);
