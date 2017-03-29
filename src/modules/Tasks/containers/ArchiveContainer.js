import React, { Component } from 'react'
import { connect } from 'react-redux'
import Archive from "../components/Archive"
import * as actions from 'redux/modules/Tasks/actions'
import * as selectors from 'redux/modules/Tasks/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'
import * as userSelectors from 'redux/modules/User/selectors'

const mapActionsToProps = (dispatch) => ({
  getArchive: actions.getArchive,
  reset: actions.reset,
  deleteTask: actions.deleteTask,
  updateTask: actions.sendTask
});
const mapStateToProps = (state) => ({
  task: selectors.task(state),
  content: contentSelectors.content(state),
  user: userSelectors.user(state)
});


export default connect(mapStateToProps, mapActionsToProps) (Archive);
