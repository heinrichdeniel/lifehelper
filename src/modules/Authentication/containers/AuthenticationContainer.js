import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/User/actions'
import * as selectors from 'redux/modules/User/selectors'
import * as contentSelector from 'redux/modules/Content/selectors'
import Authentication from "../components/index"

const mapActionsToProps = (dispatch) => ({
  setEmail: actions.setEmail,
  setPassword: actions.setPassword,
  sendLogin: actions.login,
  resetLogin: actions.resetLogin,
  loginFacebook: actions.loginFacebook,
  loginGoogle: actions.loginGoogle,
  reset: actions.reset,
  setName: actions.setName,
  setPassword2: actions.setPassword2,
  sendRegistration: actions.registration,
  resetRegistration: actions.resetRegistration
});
const mapStateToProps = (state) => ({
  user: selectors.user(state).current,
  login: selectors.login(state),
  registration: selectors.registration(state),
  content: contentSelector.content(state),
  selectedForm: selectors.selectedForm(state)
});

export default connect(mapStateToProps, mapActionsToProps)(Authentication);
