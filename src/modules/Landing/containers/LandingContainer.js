import React, { Component } from 'react'
import { connect } from 'react-redux'
import Landing from "../components/Landing"
import * as userActions from 'redux/modules/User/actions'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentActions from 'redux/modules/Content/actions'
import * as contentSelectors from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
  getProfile: userActions.getProfile,
  logout: userActions.logout,
  switchLanguage: contentActions.switchLanguage,
  updateGeneralSettings: userActions.updateGeneralSettings,
  selectForm: userActions.selectForm
});
const mapStateToProps = (state) => ({
  authDetails: userSelectors.authDetails(state),
  user: userSelectors.user(state),
  content: contentSelectors.content(state),
  selectedForm: userSelectors.selectedForm(state)
});


export default connect(mapStateToProps, mapActionsToProps) (Landing);
