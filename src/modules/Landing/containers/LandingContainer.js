import React, { Component } from 'react'
import { connect } from 'react-redux'
import Landing from "../components/Landing"
import * as userActions from 'redux/modules/User/actions'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
});
const mapStateToProps = (state) => ({
  authDetails: userSelectors.authDetails(state),
  user: userSelectors.user(state),
  content: contentSelectors.content(state)
});


export default connect(mapStateToProps, mapActionsToProps) (Landing);
