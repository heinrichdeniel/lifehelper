import React, { Component } from 'react'
import { connect } from 'react-redux'
import DateFilters from "../components/DateFilters"
import * as taskActions from 'redux/modules/Tasks/actions'
import * as taskSelectors from 'redux/modules/Tasks/selectors'


const mapActionsToProps = (dispatch) => ({
  applyDateFilter: taskActions.applyDateFilter

});
const mapStateToProps = (state) => ({
  dateFrom: taskSelectors.dateFrom(state),
  dateTo: taskSelectors.dateTo(state)

});


export default connect(mapStateToProps, mapActionsToProps) (DateFilters);
