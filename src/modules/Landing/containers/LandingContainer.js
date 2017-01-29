import React, { Component } from 'react'
import { connect } from 'react-redux'
import Landing from "../components/Landing"
import * as authActions from 'redux/modules/Authentication/actions'
import * as authSelectors from 'redux/modules/Authentication/selectors'


const mapActionsToProps = (dispatch) => ({
  logout: authActions.logout

});
const mapStateToProps = (state) => ({
  authDetails: authSelectors.authDetails(state)
});


export default connect(mapStateToProps, mapActionsToProps) (Landing);
