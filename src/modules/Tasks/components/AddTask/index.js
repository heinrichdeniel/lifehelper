import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import css from './style.scss'
import moment from 'moment';

import Button from 'components/Button';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import DatePicker from 'components/DatePicker';
import TimePicker from 'components/TimePicker';

class AddTask extends Component {
  constructor(props){
    super(props);

    this.changeModalState = this.changeModalState.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.sendTask = this.sendTask.bind(this);
    this.state = {
      showModal:false,
      error: ""
    }
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

  changeModalState(){
    if (this.state.showModal){    //if the modal will be closed, then the form data will be deleted
      this.props.reset();
    }
    this.setState({
      showModal: !this.state.showModal
    });
  }

  sendTask(){
    if (this.props.task.current.name.length < 3 || this.props.task.current.name.length > 20) {
      return this.setState({error: 'The task name must contain at least 3, maximum 20 character!'})
    }
    this.props.sendTask(this.props.task.current);
    this.changeModalState();
  }

  render() {
    if (!this.state.showModal) {
      return(
        <div className={css.base}>
          <Button type="button" onClick={this.changeModalState} text="Add new task" style={css.addButton}/>
        </div>
      );
    }
    else{
      let task = this.props.task.current;

      return(
        <Modal show={this.state.showModal} onHide={this.changeModalState}>
          <div className={css.container}>
            <div className={css.body}>
              <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />

              <h1>Add Task</h1>
              <Input type="text" placeholder="Task name" value={task.name} onChange={this.changeName} style={css.input} minLength={3} maxLength={20} />
              <TextArea type="text" placeholder="Description" value={task.description} onChange={this.changeDescription}  />

              <DatePicker value={task.date} onChange={this.changeDate}/>
              <TimePicker value={task.time} onChange={this.changeTime}/>
              <Button type="button" onClick={this.sendTask} text="Add task" style={css.addButton}/>
            </div>
          </div>
        </Modal>
      );
    }

  }
}

export default AddTask
