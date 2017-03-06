import React, { Component } from 'react'
import css from './style.scss'

import DateFilters from './containers/DateFiltersContainer'
import ProjectFilters from './containers/ProjectContainer'

class Filters extends Component {
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.state = {
      style: css.hideFilters,
      arrow: "right"
    }
  }

  changeVisibility(){
    if (this.state.arrow == "right"){   //show filters
      this.setState({
        style: css.showFilters,
        arrow: "left"
      })
    }
    else{           //hide filters
      this.setState({
        style: css.hideFilters,
        arrow: "right"
      })
    }
  }

  render() {
    return(
      <div className={css.base +" "+ this.state.style+" col-xs-1 col-sm-5 col-lg-5"}>
        <i className={"fa fa-angle-double-"+this.state.arrow +" " + css.arrow} onClick={this.changeVisibility} />
        <div className={css.shadow} onClick={this.changeVisibility}/>
        <div className={css.filters}>
          <DateFilters/>
          <ProjectFilters/>
        </div>
      </div>
    )
  }
}

export default Filters
