import React, { Component } from 'react'
import css from './style.scss'

import DatePicker from 'components/DatePicker'

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
    this.props.applyDateFilter(filters);
  }

  changeDateTo(date){
    let filters={
      dateFrom: this.props.dateFrom,
      dateTo: date
    };
    this.props.applyDateFilter(filters);
  }

  render() {
    return(
      <div className={css.base}>
        <h2>{this.props.content.page.filters.timeFilter}</h2>
        <DatePicker onChange={this.changeDateFrom}
                    value={this.props.dateFrom}/>
        <span>-</span>
        <DatePicker onChange={this.changeDateTo}
                    value={this.props.dateTo}
                    minDate={this.props.dateFrom}/>
      </div>
    )
  }
}

export default DateFilters
