import React, { Component } from 'react'
import css from './style.scss'

import DatePicker from 'components/DatePicker'
import moment from 'moment'

class DateFilters extends Component {
  constructor(props){
    super(props);

    this.changeDateFrom=this.changeDateFrom.bind(this);
    this.changeDateTo=this.changeDateTo.bind(this);

  }

  changeDateFrom(date){
    let filters={
      dateFrom: date,
      dateTo: this.props.dateTo
    };
    this.props.changeDateFilter(filters);
  }

  changeDateTo(date){
    let filters={
      dateFrom: this.props.dateFrom,
      dateTo: date
    };
    this.props.changeDateFilter(filters);
  }

  render() {
    if (this.props.active){
      return(
        <div className={css.base}>
          <h2 onClick={this.props.applyDateFilter}>{this.props.content.page.filters.timeFilter}<i className={"fa fa-arrow-up"}/></h2>
          <div className={css.datePickers}>
            <DatePicker onChange={this.changeDateFrom}
                        value={this.props.dateFrom}
                        minDate={moment().add(-1,"years")}
                        maxDate={this.props.dateTo}
                        dateFormat={this.props.user.dateFormat}/>
            <span>-</span>
            <DatePicker onChange={this.changeDateTo}
                        value={this.props.dateTo}
                        minDate={this.props.dateFrom}
                        dateFormat={this.props.user.dateFormat}/>
          </div>
        </div>
      )
    }
    else{
      return(
        <div className={css.base}>
          <h2 onClick={this.props.applyDateFilter}>{this.props.content.page.filters.timeFilter}<i className="fa fa-arrow-down"/></h2>
        </div>
      )
    }

  }
}

export default DateFilters
