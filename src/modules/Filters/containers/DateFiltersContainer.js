import React, { Component } from 'react'
import { connect } from 'react-redux'
import DateFilters from "../components/DateFilters"
import * as taskActions from 'redux/modules/Tasks/actions'
import * as taskSelectors from 'redux/modules/Tasks/selectors'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentSelector from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
  changeDateFilter: taskActions.changeDateFilter,
  applyDateFilter: taskActions.applyDateFilter

});
const mapStateToProps = (state) => ({
  dateFrom: taskSelectors.dateFrom(state),
  dateTo: taskSelectors.dateTo(state),
  content: contentSelector.content(state),
  active: taskSelectors.task(state).filteringByDate,
  user: userSelectors.user(state).current
});


export default connect(mapStateToProps, mapActionsToProps) (DateFilters);
