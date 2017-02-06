import React, { Component } from 'react'
import {IndexRedirect,Redirect, Router, Route} from "react-router";

import MainContainer from 'modules/MainContainer'
import LandingPage from 'modules/Landing/routes'
import TaskPage from 'modules/Tasks/routes'

class Routes extends Component {
  render() {
    return (
    <Router history={this.props.history}>
      <Route path="/">
        {LandingPage}
        <Route component={MainContainer}>
          <IndexRedirect to="/"/>
          {LandingPage}
          {TaskPage}
          <Redirect from="/*" to="/"/>
        </Route>
      </Route>
    </Router>
    )
  }
}

export default Routes;
