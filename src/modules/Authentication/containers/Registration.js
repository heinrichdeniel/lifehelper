import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/User/actions'
import * as selectors from 'redux/modules/User/selectors'
import * as contentSelector from 'redux/modules/Content/selectors'
import Registration from "../components/Registration"

const mapActionsToProps = (dispatch) => ({
  setEmail: actions.setEmail,
  setName: actions.setName,
  setPassword: actions.setPassword,
  setPassword2: actions.setPassword2,
  sendRegistration: actions.registration,
  resetRegistration: actions.resetRegistration,
  loginFacebook: actions.loginFacebook,
  loginGoogle: actions.loginGoogle,
  reset: actions.reset
});
const mapStateToProps = (state) => ({
  user: selectors.user(state).current,
  registration: selectors.registration(state),
  content: contentSelector.content(state)
});

export default connect(mapStateToProps, mapActionsToProps)(Registration);
