import React from 'react'
import { Route, IndexRoute } from 'react-router'

import LandingContainer from "./containers/LandingContainer"

export default (
    <Route >
      <IndexRoute component={LandingContainer} />
      <Route path="/:lang/tasks" component={LandingContainer}/>
      <Route path="/:lang/projects" component={LandingContainer}/>
      <Route path="/:lang/archive" component={LandingContainer}/>
    </Route>
);
