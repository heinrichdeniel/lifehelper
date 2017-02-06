import React from 'react'
import { Route } from 'react-router'

import TaskContainer from "./containers/TaskContainer"

export default (
  <Route path={"task/:id"} component={TaskContainer} />
);
