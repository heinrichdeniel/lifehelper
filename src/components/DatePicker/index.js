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
    let { value, onChange , minDate} = this.props;

    let minimum = minDate?minDate:moment();
    return(
      <div className={css.base}>
        <span className={css.calendar + " fa fa-calendar"}/>
        <DatePicker
          selected={moment(value)}
          dateFormat="MMM Do YYYY"
          minDate={minimum}
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
