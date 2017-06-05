import React, { Component } from 'react'
import css from './style.scss'

import moment from 'moment'

class DateFilters extends Component {
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.selectInterval=this.selectInterval.bind(this);
    this.renderTimeIntervals = this.renderTimeIntervals.bind(this);

    this.state={
      arrow: "left",
      style: css.hideFilters,
      selectedInterval: 0
    }

  }

  componentWillMount(){
    this.props.changeDateFilter({dateFrom: null, dateTo: null})
  }

  changeVisibility(){
    if (this.state.arrow == "left"){   //show filters
      this.setState({
        style: css.showFilters,
        arrow: "right"
      })
    }
    else{           //hide filters
      this.setState({
        style: css.hideFilters,
        arrow: "left"
      })
    }
  }

  selectInterval(index){
    let filters = {};
    switch (index){
      case 0:
        filters = {
          dateFrom: null,
          dateTo: null
        };
        break;
      case 1:
        filters = {
          dateFrom: moment(),
          dateTo: moment()
        };
        break;
      case 2:
        filters = {
          dateFrom: moment(),
          dateTo: moment().add(1,'week')
        };
        break;
      case 3:
        filters = {
          dateFrom: moment(),
          dateTo: moment().add(1,'month')
        };
        break;
    }

    this.props.changeDateFilter(filters);

    this.setState({
      ...this.state,
      selectedInterval: index
    })
  }

  renderTimeOption(interval,index){
    return (
      <div>
        <p onClick={this.selectInterval.bind(this,index)} className={css.filter + ((this.state.selectedInterval==index) ? " "+css.active : "")} >
          {interval}
        </p>
      </div>
    )
  }

  renderTimeIntervals(){
    return (
      <div className={css.filters}>
        {this.renderTimeOption(this.props.content.page.map.intervals.every, 0)}
        {this.renderTimeOption(this.props.content.page.map.intervals.today, 1)}
        {this.renderTimeOption(this.props.content.page.map.intervals.weekly, 2)}
        {this.renderTimeOption(this.props.content.page.map.intervals.monthly, 3)}
      </div>
    )
  }

  render() {
    return(
      <div className={css.base +" "+ this.state.style}>
        <i className={"fa fa-angle-double-"+this.state.arrow +" " + css.arrow} onClick={this.changeVisibility} />
        <div className={css.shadow} onClick={this.changeVisibility}/>
        {this.renderTimeIntervals()}
      </div>
    )
  }
}

export default DateFilters
