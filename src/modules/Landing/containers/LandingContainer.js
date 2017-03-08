import React, { Component } from 'react'
import { connect } from 'react-redux'
import Landing from "../components/Landing"
import * as authActions from 'redux/modules/Authentication/actions'
import * as authSelectors from 'redux/modules/Authentication/selectors'


const mapActionsToProps = (dispatch) => ({
  getProfile: authActions.getProfile,
  logout: authActions.logout
});
const mapStateToProps = (state) => ({
  authDetails: authSelectors.authDetails(state),
  user: authSelectors.user(state)
});


export default connect(mapStateToProps, mapActionsToProps) (Landing);
