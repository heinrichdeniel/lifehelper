import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskPage from "../components/TaskPage"
import * as actions from 'redux/modules/Tasks/actions'
import * as selectors from 'redux/modules/Tasks/selectors'

const mapActionsToProps = (dispatch) => ({
  getTaskById: actions.getTaskById,
  setName: actions.setName,
  setDescription: actions.setDescription,
  setDate: actions.setDate,
  setTime: actions.setTime

});
const mapStateToProps = (state) => ({
  task: selectors.task(state)
});


export default connect(mapStateToProps, mapActionsToProps) (TaskPage);
