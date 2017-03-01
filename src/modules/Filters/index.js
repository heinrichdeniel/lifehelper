import React, { Component } from 'react'
import css from './style.scss'

import DateFilters from './containers/DateFiltersContainer'
import AddTask from 'modules/Tasks/containers/AddTaskContainer'

class Filters extends Component {
  constructor(props){
    super(props);

  }


  render() {
    return(
      <div className={css.base + " col-sm-5 col-lg-5"}>
        <div className={css.body}>
          <DateFilters/>
          <AddTask
            buttonText="Add new task"
            buttonStyle={css.addTask}
            sendButtonText="Create task"/>
        </div>
      </div>
    )
  }
}

export default Filters
