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
    let { value, onChange} = this.props;

    return(
      <div className={css.base}>
        <DatePicker
          selected={moment(value)}
          dateFormat="MMMM Do YYYY"
          minDate={moment()}
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
