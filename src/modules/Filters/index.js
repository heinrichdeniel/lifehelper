import React, { Component } from 'react'
import css from './style.scss'

import DateFilters from './containers/DateFiltersContainer'
import ProjectFilters from './containers/ProjectContainer'

class Filters extends Component {
  constructor(props){
    super(props);

  }


  render() {
    return(
      <div className={css.base + " col-sm-5 col-lg-5"}>
        <div className={css.body}>
          <DateFilters/>
          <ProjectFilters/>
        </div>
      </div>
    )
  }
}

export default Filters
