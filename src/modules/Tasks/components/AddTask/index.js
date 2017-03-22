import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import css from './style.scss'
import moment from 'moment';
import {browserHistory} from 'react-router';

import Button from 'components/Button';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import DatePicker from 'components/DatePicker';
import TimePicker from 'components/TimePicker';
import ErrorBox from 'components/ErrorBox';
import Dropdown from 'components/Dropdown';
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
    this.selectProject = this.selectProject.bind(this);
    this.sendTask = this.sendTask.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.timeModalChanged = this.timeModalChanged.bind(this);

    this.state = {
      showModal: false,
      error: "",
      opacity: 1,
      step: 1,
      task: {
        name: "",
        description: "",
        date: moment(),
        time: moment().add(1,'hours').format("H:m"),
        location: "",
        ProjectId: null
      }
    }
  }
  componentWillMount() {
    if (this.props.update){
      this.setState({
        ...this.state,
        task:this.props.task.current
      });
    }
    this.props.getProjectList();
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
    if (!location){
      this.setState({
        ...this.state,
        task:{
          ...this.state.task,
          location: "",
          lat: "",
          lng: ""
        }
      });
    }
    else{
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
  }

  selectProject(project){
    let projectId = (project) ? project.value : null
    this.setState({
      ...this.state,
      task:{
        ...this.state.task,
        ProjectId: projectId
      }
  });
}

  changeModalState(){
    if (this.props.update){     //if a task was selected to update then not needed to empty the state
      let pathname = window.location.pathname;
      this.props.getTaskById(pathname.substring(pathname.lastIndexOf('/')+1));
      this.setState({
        ...this.state,
        showModal: !this.state.showModal,
        step: 1,
        error: ""
      });
    }
    else{
      this.setState({
        ...this.state,
        showModal: !this.state.showModal,
        step: 1,
        error: "",
        task: {
          name: "",
          description: "",
          date: moment(),
          time: moment().add(1,'hours').format("H:m"),
          location: "",
          ProjectId: null
        }
      });
    }

  }

  timeModalChanged(){
    this.setState({
      ...this.state,
      opacity: 1 - this.state.opacity
    });
  }

  sendTask(e){
    e.preventDefault();
    if (this.state.task.name.length < 3 || this.state.task.name.length > 20) {
      return this.setState({error: this.props.content.page.tasks.shortTaskName})
    }
    this.props.sendTask(this.state.task);
    this.props.selectProject("");
    this.setState({
      ...this.state,
      showModal: !this.state.showModal
    });
    if (!this.state.task.id){ // if a new task added then go to the homepage
      browserHistory.push(window.location.pathname.substring(0,3));
    }
  }

  nextStep(e){     //changing to the next step
    e.preventDefault();
    this.setState({
      ...this.state,
      error: "",
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
    if(!this.props.update){
      return(
        <div className={css.base}>
          <div className={this.props.iconStyle + " " + css.addIcon} data-tip={this.props.buttonText} onClick={this.changeModalState}>
            <i className={"fa fa-plus"} aria-hidden="true"/>
          </div>
        </div>
      );
    }
    else{
      return(
        <div className={css.base}>
          <Button type="button" onClick={this.changeModalState} text={this.props.buttonText}  style={css.addButton+" "+this.props.buttonStyle}>
            {this.props.children}
          </Button>
        </div>
      );

    }
  }

  renderDetails(){         //rendering the modal with title, description and datetime
    let task = this.state.task;
    let content = this.props.content.page.tasks;

    return(
      <Modal style={{opacity : this.state.opacity}} show={this.state.showModal} onHide={this.changeModalState}>
        <div  className={css.container}>
          <div className={css.body}>
            <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />

            <h1>{content.addTask.addTask}</h1>
            <form  action="POST" onSubmit={this.nextStep}>
              <Input type="text" placeholder={content.name} value={task.name} onChange={this.changeName} style={css.input} minLength={3} maxLength={20} />
              <TextArea type="text" placeholder={content.description} value={task.description} onChange={this.changeDescription}  />
              <DatePicker value={task.date} onChange={this.changeDate} dateFormat={this.props.user.dateFormat}/>
              <TimePicker value={task.time} onClick={this.timeModalChanged} onChange={this.changeTime} timeFormat={this.props.user.timeFormat}/>
              <Dropdown onChange={this.selectProject} placeholder={content.selectProject} projects={this.props.project.list} selected={task.ProjectId}/>
              <div className={css.locationDiv}>
                <Input type="text" placeholder={content.searchLocation} value={task.location} onChange={this.changeLocation} onFocus={this.nextStep} style={css.input + " " + css.locationInput} minLength={3} maxLength={20} />
                <i className={css.mapMarker + " fa fa-map-marker"}/>
                <i className={css.clear + " fa fa-times-circle-o"} onClick={this.changeLocation.bind(this,null)}/>
              </div>

              {this.state.error ? <ErrorBox error={this.state.error}/> : null}

              <Button type="button" onClick={this.sendTask} text={this.props.sendButtonText} style={css.addButton}/>

            </form>
          </div>
        </div>
      </Modal>
    );
  }

  renderMap(){
    let task = this.state.task;
    let content = this.props.content.page.tasks;

    return(
      <Modal  show={this.state.showModal} dialogClassName={css.mapModal} onHide={this.changeModalState}>
        <div  className={css.container}>
          <div className={css.body}>
            <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />

            <h1>{content.locationTitle}</h1>
            <form  action="POST" onSubmit={this.nextStep}>
              <Map setLocation={this.changeLocation}
                   location={task.location}
                   lat={task.lat}
                   lng={task.lng}
                   style={css.map}
                   suggestEnabled={false}
                   placeholder={content.searchLocation}/>
              <Button type="button" onClick={this.prevStep} text={content.prevStep} style={css.prevButton}/>
              <Button type="button" onClick={this.prevStep} text={content.selectLocation} style={css.addButton}/>
            </form>
          </div>
        </div>
      </Modal>
    );
  }

  render() {
    if (!this.state.showModal){
      return this.renderButton();
    }
    return(
      <div>
        {this.renderButton()}
        {(this.state.step == 1) ? this.renderDetails() : null}
        {(this.state.step == 2) ? this.renderMap() : null}
      </div>
    )

  }
}

export default AddTask
