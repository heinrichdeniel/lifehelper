import React, {Component} from "react";
import {IndexRedirect, Redirect, Router, Route} from "react-router";
import MainContainer from "modules/MainContainer";
import LandingPage from "modules/Landing/routes";
import TaskPage from "modules/Tasks/routes";
import SettingsPage from "modules/Settings/routes";
import NotificationsPage from "modules/Notifications/routes";
import MapPage from "modules/MapPage/routes";

class Routes extends Component {

  render() {
    return (
    <Router history={this.props.history}>
        <Route path="/:lang">
          {LandingPage}
          {SettingsPage}
          {NotificationsPage}
          {MapPage}
          <Route component={MainContainer}>
            <IndexRedirect to="/"/>
            {LandingPage}
            {TaskPage}
          </Route>
        </Route>
        <Redirect from="/*" to="/en"/>
    </Router>
    )
  }
}

export default Routes;
