import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsPage from "../components/SettingsPage"
import * as userActions from 'redux/modules/User/actions'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentActions from 'redux/modules/Content/actions'
import * as contentSelectors from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
  getProfile: userActions.getProfile,
  updateGeneralSettings: userActions.updateGeneralSettings,
  updateAccountSettings: userActions.updateAccountSettings,
  removeError: userActions.removeError,
  switchLanguage: contentActions.switchLanguage
});

const mapStateToProps = (state) => ({
  authDetails: userSelectors.authDetails(state),
  user: userSelectors.user(state),
  content: contentSelectors.content(state)
});


export default connect(mapStateToProps, mapActionsToProps) (SettingsPage);
