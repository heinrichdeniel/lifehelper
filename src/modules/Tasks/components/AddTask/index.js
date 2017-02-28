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
    this.nextStep = this.nextStep.bind(this);
    this.timeModalChanged = this.timeModalChanged.bind(this);
    this.state = {
      showModal: false,
      error: "",
      opacity: 1,
      step: 1
    }
  }

  changeName(e){
    this.props.setName(e.target.value);
  }

  changeDescription(e){
    this.props.setDescription(e.target.value);
  }

  changeDate(date){
    this.props.setDate(moment(date));
  }

  changeTime(h,m){
    this.props.setTime(moment(h+":"+m,"H:m").format("H:m"));
  }

  changeModalState(){
    if (window.location.pathname.substring(0,5) == "/task"){
      this.props.getTaskById(window.location.pathname.substring(6));

    }
    else if (this.state.showModal){    //if the modal will be closed, then the form data will be deleted
      this.props.reset();
    }
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
      step: 1
    });
  }

  timeModalChanged(){
    this.setState({
      ...this.state,
      opacity: 1 - this.state.opacity
    });
  }

  sendTask(){
    if (this.props.task.current.name.length < 3 || this.props.task.current.name.length > 20) {
      return this.setState({error: 'The task name must contain at least 3, maximum 20 character!'})
    }
    this.props.sendTask(this.props.task.current);
    this.setState({
      ...this.state,
      showModal: !this.state.showModal
    });
  }

  nextStep(){     //changing modal with the next step
    this.setState({
      ...this.state,
      step: this.state.step + 1
    });
  }

  render() {
    if (!this.state.showModal) {      //rendering the button
      return(
        <div className={css.base}>
          <Button type="button" onClick={this.changeModalState} text={this.props.buttonText}  style={css.addButton+" "+this.props.buttonStyle}/>
        </div>
      );
    }
    else if (this.state.step == 1){               //rendering the modal with title, description and datetime
      let task = this.props.task.current;
      return(
        <Modal style={{opacity : this.state.opacity}} show={this.state.showModal} onHide={this.changeModalState}>
          <div  className={css.container}>
            <div className={css.body}>
              <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />

              <h1>{this.props.sendButtonText}</h1>
              <Input type="text" placeholder="Task name" value={task.name} onChange={this.changeName} style={css.input} minLength={3} maxLength={20} />
              <TextArea type="text" placeholder="Description" value={task.description} onChange={this.changeDescription}  />

              <DatePicker value={task.date} onChange={this.changeDate}/>
              <TimePicker value={task.time} onClick={this.timeModalChanged} onChange={this.changeTime}/>
              <Button type="button" onClick={this.nextStep} text={"Next step"} style={css.addButton}/>
            </div>
          </div>
        </Modal>
      );
    }
    else{
      let task = this.props.task.current;
      return(
        <Modal  show={this.state.showModal} onHide={this.changeModalState}>
          <div  className={css.container}>
            <div className={css.body}>
              <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />

              <h1>{this.props.sendButtonText}</h1>
              <Input type="text" placeholder="Task name" value={task.name} onChange={this.changeName} style={css.input} minLength={3} maxLength={20} />
              <Button type="button" onClick={this.sendTask} text={this.props.sendButtonText} style={css.addButton}/>
            </div>
          </div>
        </Modal>
      );
    }

  }
}

export default AddTask
