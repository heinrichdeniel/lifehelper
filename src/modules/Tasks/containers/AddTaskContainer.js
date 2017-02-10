import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddTask from "../components/AddTask"
import * as actions from 'redux/modules/Tasks/actions'
import * as selectors from 'redux/modules/Tasks/selectors'


const mapActionsToProps = (dispatch) => ({
  setName: actions.setName,
  setDescription: actions.setDescription,
  setDate: actions.setDate,
  setTime: actions.setTime,
  sendTask: actions.sendTask,
  reset: actions.reset,
  getTaskById: actions.getTaskById

});
const mapStateToProps = (state) => ({
  task: selectors.task(state)
});


export default connect(mapStateToProps, mapActionsToProps) (AddTask);
