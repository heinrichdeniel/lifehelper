import React, { Component } from 'react';
import moment from 'moment';
import css from './style.scss';

import Button from 'components/Button';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import DatePicker from 'components/DatePicker';
import TimePicker from 'components/TimePicker';

class TaskPage extends Component {
  constructor(props){
    super(props);

    this.changeName = this.changeName.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
  }

  componentWillMount(){
    //get id from the url
    this.props.getTaskById(window.location.pathname.substring(6))
  }

  changeName(e){
    this.props.setName(e.target.value);
  }

  changeDescription(e){
    this.props.setDescription(e.target.value);
  }

  changeDate(date){
    this.props.setDate(moment(date).format("MM-DD-YYYY"));
  }

  changeTime(time){
    this.props.setTime(moment(time).format("HH:mm"));
  }

  render() {
    let task = this.props.task.current;
    return(
        <div className={css.base + " container"}>
          <Input type="text" value={task.name} onChange={this.changeName} style={css.nameInput} minLength={3} maxLength={20} />
          <TextArea type="text" value={task.description} onChange={this.changeDescription} className={css.description}  />

          <DatePicker value={moment(new Date(task.date)).format("MM-DD-YYYY")} onChange={this.changeDate}/>
          <TimePicker value={task.time} onChange={this.changeTime}/>
        </div>
    );
  }
}

export default TaskPage
