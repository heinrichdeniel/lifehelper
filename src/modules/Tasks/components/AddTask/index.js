import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import css from './style.scss'
import moment from 'moment';

import Button from 'components/Button';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import DatePicker from 'components/DatePicker';
import TimePicker from 'components/TimePicker';
import ErrorBox from 'components/ErrorBox';
import Map from 'components/Map';

class AddTask extends Component {
  constructor(props){
    super(props);

    this.changeModalState = this.changeModalState.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.sendTask = this.sendTask.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderSummary = this.renderSummary.bind(this);
    this.timeModalChanged = this.timeModalChanged.bind(this);

    this.state = {
      showModal: false,
      error: "",
      opacity: 1,
      step: 1
    }
  }
  componentWillMount() {
    this.setState({
      ...this.state,
      task:this.props.task.current
    })
  }

  changeName(e){
    this.setState({
      ...this.state,
      task:{
        ...this.state.task,
        name:e.target.value
      }
    });
  }

  changeDescription(e){
    this.setState({
      ...this.state,
      task:{
        ...this.state.task,
        description:e.target.value
      }
    });
  }

  changeDate(date){
    this.setState({
      ...this.state,
      task:{
        ...this.state.task,
        date:moment(date)
      }
    });
  }

  changeTime(h,m){
    this.setState({
      ...this.state,
      task:{
        ...this.state.task,
        time:moment(h+":"+m,"H:m").format("H:m")
      }
    });
  }

  changeLocation(location){
    this.setState({
      ...this.state,
      task:{
        ...this.state.task,
        location: location.label,
        lat: location.location.lat,
        lng: location.location.lng
      }
    });
  }

  changeModalState(){
    if (window.location.pathname.substring(0,5) == "/task"){
      this.props.getTaskById(window.location.pathname.substring(6));

    }
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
      step: 1,
      task:this.props.task.current,
      error: ""
    });
  }

  timeModalChanged(){
    this.setState({
      ...this.state,
      opacity: 1 - this.state.opacity
    });
  }

  sendTask(){
    if (this.state.task.name.length < 3 || this.state.task.name.length > 20) {
      return this.setState({error: 'The task name must contain at least 3, maximum 20 character!'})
    }
    this.props.sendTask(this.state.task);
    this.setState({
      ...this.state,
      showModal: !this.state.showModal
    });
  }

  nextStep(){     //changing to the next step
    if (this.state.task.name.length < 3 || this.state.task.name.length > 20) {
      return this.setState({error: 'The task name must contain at least 3, maximum 20 character!'})
    }
    this.setState({
      ...this.state,
      step: this.state.step + 1
    });
  }

  prevStep(){     //changing to the prev step
    this.setState({
      ...this.state,
      step: this.state.step - 1
    });
  }

  renderButton(){     //rendering the button
    return(
      <div className={css.base}>
        <Button type="button" onClick={this.changeModalState} text={this.props.buttonText}  style={css.addButton+" "+this.props.buttonStyle}/>
      </div>
    );
  }

  renderDetails(){         //rendering the modal with title, description and datetime
    let task = this.state.task;
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
            {this.state.error ? <ErrorBox error={this.state.error}/> : null}

            <Button type="button" onClick={this.nextStep} text={"Next step"} style={css.addButton}/>
          </div>
        </div>
      </Modal>
    );
  }

  renderMap(){
    let task = this.state.task;
    return(
      <Modal  show={this.state.showModal} dialogClassName={css.mapModal} onHide={this.changeModalState}>
        <div  className={css.container}>
          <div className={css.body}>
            <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />

            <h1>Place of the task</h1>
            <Map setLocation={this.changeLocation}
                 location={task.location}
                 lat={task.lat}
                 lng={task.lng}
                 style={css.map}
                 suggestEnabled={false}/>
            <Button type="button" onClick={this.prevStep} text={"Previous step"} style={css.prevButton}/>
            <Button type="button" onClick={this.nextStep} text={"Next step"} style={css.addButton}/>
          </div>
        </div>
      </Modal>
    );
  }

  renderSummary(){
    let task = this.state.task;
    return(
      <Modal  show={this.state.showModal} onHide={this.changeModalState}>
        <div  className={css.container}>
          <div className={css.body}>
            <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />

            <h1>Summary</h1>

            <div className={css.summary}>
              <p className={css.name}><span>Task name:</span> {task.name}</p>
              <p className={css.description}><span>Description:</span> {task.description?task.description:"-"}</p>
              <p className={css.date}><span>Selected date:</span> {moment(task.date).format("MMM DD")}, {task.time}</p>
              <p className={css.location}><span>Selected location:</span> {task.location?task.location:"-"}</p>
            </div>
            <Button type="button" onClick={this.prevStep} text={"Previous step"} style={css.prevButton}/>
            <Button type="button" onClick={this.sendTask} text={this.props.sendButtonText} style={css.addButton}/>
          </div>
        </div>
      </Modal>
    );
  }


  render() {
    if (!this.state.showModal) {
      {return this.renderButton()}
    }
    else if (this.state.step == 1){               //rendering the modal with title, description and datetime
      {return this.renderDetails()}
    }
    else if (this.state.step == 2){
      {return this.renderMap()}
    }
    else if (this.state.step == 3){
      {return this.renderSummary()}
    }

  }
}

export default AddTask
