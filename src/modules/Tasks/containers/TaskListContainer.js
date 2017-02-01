import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskList from "../components/TaskList"
import * as actions from 'redux/modules/Tasks/actions'
import * as selectors from 'redux/modules/Tasks/selectors'

const mapActionsToProps = (dispatch) => ({
  getTaskList: actions.getTaskList
});
const mapStateToProps = (state) => ({
  task: selectors.task(state)
});


export default connect(mapStateToProps, mapActionsToProps) (TaskList);
