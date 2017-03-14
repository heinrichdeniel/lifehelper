import React, { Component } from 'react'
import { connect } from 'react-redux'
import Settings from "../components/Settings"
import * as authActions from 'redux/modules/Authentication/actions'
import * as authSelectors from 'redux/modules/Authentication/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
  logout: authActions.logout

});
const mapStateToProps = (state) => ({
  authDetails: authSelectors.authDetails(state),
  user: authSelectors.user(state),
  content: contentSelectors.content(state)
});


export default connect(mapStateToProps, mapActionsToProps) (Settings);
