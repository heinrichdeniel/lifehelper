import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskList from "../components/TaskList"
import * as actions from 'redux/modules/Tasks/actions'
import * as selectors from 'redux/modules/Tasks/selectors'

const mapActionsToProps = (dispatch) => ({
  getTaskList: actions.getTaskList,
  reset: actions.reset
});
const mapStateToProps = (state) => ({
  task: selectors.task(state),
  dateFrom: selectors.dateFrom(state),
  dateTo: selectors.dateTo(state)
});


export default connect(mapStateToProps, mapActionsToProps) (TaskList);
