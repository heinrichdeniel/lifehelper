import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsPage from "../components/SettingsPage"
import * as authActions from 'redux/modules/Authentication/actions'
import * as authSelectors from 'redux/modules/Authentication/selectors'


const mapActionsToProps = (dispatch) => ({
  getProfile: authActions.getProfile
});

const mapStateToProps = (state) => ({
  authDetails: authSelectors.authDetails(state),
  user: authSelectors.user(state)
});


export default connect(mapStateToProps, mapActionsToProps) (SettingsPage);
