import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsPage from "../components/SettingsPage"
import * as authActions from 'redux/modules/Authentication/actions'
import * as authSelectors from 'redux/modules/Authentication/selectors'
import * as contentActions from 'redux/modules/Content/actions'
import * as contentSelectors from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
  getProfile: authActions.getProfile,
  switchLanguage: contentActions.switchLanguage
});

const mapStateToProps = (state) => ({
  authDetails: authSelectors.authDetails(state),
  user: authSelectors.user(state),
  content: contentSelectors.content(state)
});


export default connect(mapStateToProps, mapActionsToProps) (SettingsPage);
