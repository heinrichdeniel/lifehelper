import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/Authentication/actions'
import * as selectors from 'redux/modules/Authentication/selectors'
import * as contentSelector from 'redux/modules/Content/selectors'
import Login from "../components/Login"

const mapActionsToProps = (dispatch) => ({
  setEmail: actions.setEmail,
  setPassword: actions.setPassword,
  sendLogin: actions.login,
  resetLogin: actions.resetLogin,
  loginFacebook: actions.loginFacebook,
  loginGoogle: actions.loginGoogle,
  reset: actions.reset
});
const mapStateToProps = (state) => ({
  user: selectors.user(state),
  login: selectors.login(state),
  content: contentSelector.content(state)
});

export default connect(mapStateToProps, mapActionsToProps)(Login);
