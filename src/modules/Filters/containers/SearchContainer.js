import React, { Component } from 'react'
import { connect } from 'react-redux'
import Search from "../components/Search"
import * as projectSelectors from 'redux/modules/Projects/selectors'
import * as projectActions from 'redux/modules/Projects/actions'
import * as taskSelectors from 'redux/modules/Tasks/selectors'
import * as contentSelector from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
  selectProject: projectActions.selectProject
});
const mapStateToProps = (state) => ({
  project: projectSelectors.project(state),
  task: taskSelectors.task(state),
  content: contentSelector.content(state)
});


export default connect(mapStateToProps, mapActionsToProps) (Search);
