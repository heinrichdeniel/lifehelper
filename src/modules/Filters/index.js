import React, { Component } from 'react'
import css from './style.scss'

import DateFilters from './containers/DateFiltersContainer'
import TaskFilters from './components/TaskFilters'

class Filters extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return(
      <div className={css.base}>
        <TaskFilters content={this.props.content}/>
        <DateFilters/>
      </div>
    )
  }
}

export default Filters
