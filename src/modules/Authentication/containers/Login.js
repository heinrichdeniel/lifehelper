import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/Authentication/actions'
import * as selectors from 'redux/modules/Authentication/selectors'
import Login from "../components/Login"

const mapActionsToProps = (dispatch) => ({
  setName: actions.setName,
  setPassword: actions.setPassword,
  sendLogin: actions.login,
  resetLogin: actions.resetLogin,
  authFacebook: actions.authFacebook,
  authGoogle: actions.authGoogle,
  reset: actions.reset
});
const mapStateToProps = (state) => ({
  user: selectors.user(state),
  login: selectors.login(state)
});

export default connect(mapStateToProps, mapActionsToProps)(Login);
