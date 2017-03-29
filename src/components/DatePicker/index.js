import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import css from './style.scss'

class datePicker extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let { value, onChange , minDate,maxDate} = this.props;

    let minimum = minDate?minDate:moment();
    let maximum = maxDate?maxDate:null;
    return(
      <div className={css.base + " " + this.props.style}>
        <span className={css.calendar + " fa fa-calendar"}/>
        <DatePicker
          selected={moment(value)}
          dateFormat={this.props.dateFormat}
          minDate={minimum}
          maxDate={maximum}
          todayButton={"Today"}
          onChange={onChange}
          className={css.datePicker}
          locale="en-gb"
          fixedHeight
          />
      </div>
    )
  }
}

datePicker.propTypes = {
  onChange: React.PropTypes.func.isRequired
}

export default datePicker
