import React, { Component } from 'react'
import { connect } from 'react-redux'
import Settings from "../components/Settings"
import * as userActions from 'redux/modules/User/actions'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
  logout: userActions.logout

});
const mapStateToProps = (state) => ({
  authDetails: userSelectors.authDetails(state),
  user: userSelectors.user(state),
  content: contentSelectors.content(state)
});


export default connect(mapStateToProps, mapActionsToProps) (Settings);