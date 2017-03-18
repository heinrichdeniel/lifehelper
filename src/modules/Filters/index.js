import React, { Component } from 'react'
import css from './style.scss'
import {browserHistory} from 'react-router'

import DateFilters from './containers/DateFiltersContainer'

class Filters extends Component {
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.goToTasks = this.goToTasks.bind(this);
    this.goToProjects = this.goToProjects.bind(this);

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

  goToTasks(){
    browserHistory.push(window.location.pathname.substring(0,3) + '/tasks');
  }

  goToProjects(){
    browserHistory.push(window.location.pathname.substring(0,3) + '/projects');
  }

  render() {
    return(
      <div className={css.base +" "+ this.state.style+" col-xs-1 col-sm-5 col-lg-5"}>
        <i className={"fa fa-angle-double-"+this.state.arrow +" " + css.arrow} onClick={this.changeVisibility} />
        <div className={css.shadow} onClick={this.changeVisibility}/>
        <div className={css.filters}>
          <DateFilters/>
          <p className={css.goToTasks} onClick={this.goToTasks}>{this.props.content.goToTasks}<i className="fa fa-arrow-right" aria-hidden="true"/></p>
          <p className={css.goToProjects} onClick={this.goToProjects}>{this.props.content.goToProjects}<i className="fa fa-arrow-right" aria-hidden="true"/></p>
        </div>
      </div>
    )
  }
}

export default Filters
