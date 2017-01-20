import React from "react";
import {Redirect, Router, Route, IndexRedirect } from "react-router";

import LandingPage from 'modules/Landing/routes'

export default (
    <Router history={history}>
        <Route path="/">
            {LandingPage}
            <Redirect from="/*" to="/"/>
        </Route>
    </Router>

);
