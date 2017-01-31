import React, { Component } from 'react'
import TimePicker from 'rc-time-picker';
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
        <TimePicker
          value={moment(value, "HH:mm")}
          onChange={onChange}
          showSecond={false}
          clearText="clear"
          defaultValue={moment(value, "HH:mm")}
          />
      </div>
    )
  }
}

datePicker.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}

export default datePicker
