import React, { Component } from 'react';
import css from './style.scss';
import Mousetrap from 'mousetrap'
import AddTask from 'modules/Tasks/containers/AddTaskContainer'
import AddProject from 'modules/Projects/components/ProjectList/AddProject'
import { browserHistory } from 'react-router'

class Shortcuts extends Component {
  constructor(props) {
    super(props);

    this.addNewTask = this.addNewTask.bind(this);
    this.addNewProject = this.addNewProject.bind(this);
    this.hideModals = this.hideModals.bind(this);
    this.state = {
      addNewTask: false,
      addNewProject: false,
      active: false
    }
  }
  componentDidMount() {
    Mousetrap.bind(['t'], this.addNewTask);
    Mousetrap.bind(['p'], this.addNewProject);
    Mousetrap.bind(['c'], this.props.showHideMessagePanel);
    Mousetrap.bind(['s'], this.goToSettings);
    Mousetrap.bind(['n'], this.goToNotifications);
    Mousetrap.bind(['h'], this.goToHomepage);
  }

  componentWillUnmount() {
    Mousetrap.unbind(['t'], this.addNewTask);
    Mousetrap.unbind(['p'], this.addNewProject);
    Mousetrap.unbind(['c'], this.props.showHideMessagePanel);
    Mousetrap.unbind(['s'], this.goToSettings);
    Mousetrap.unbind(['n'], this.goToNotifications);
    Mousetrap.unbind(['h'], this.goToHomepage);
  }

  addNewTask(){
    if (!this.state.active){
      this.setState({
        addNewProject: false,
        addNewTask: true,
        active: true
      })
    }
  }

  addNewProject(e){
    e.preventDefault();
    if (!this.state.active) {
      this.setState({
        addNewProject: true,
        addNewTask: false,
        active: true
      })
    }
  }

  hideModals(){
    this.setState({
      addNewProject: false,
      addNewTask: false,
      active: false
    })
  }

  goToSettings(){
    browserHistory.push(window.location.pathname.substring(0,3)+'/settings');
  }

  goToNotifications(){
    browserHistory.push(window.location.pathname.substring(0,3)+'/notifications');
  }

  goToHomepage(){
    browserHistory.push(window.location.pathname.substring(0,3));
  }

  render() {
    let addTask =  (
      <AddTask
        buttonText={this.props.content.page.tasks.addTask.addTask}
        buttonStyle={css.addTask}
        sendButtonText={this.props.content.page.tasks.addTask.name}
        showModal={true}
        onHide={this.hideModals}/>
    );

    let addProject =  (
      <AddProject content={this.props.content.page.project}
                  buttonText={this.props.content.page.project.addProject}
                  sendButtonText={this.props.content.page.project.createProject}
                  onHide={this.hideModals}
                  showModal={true}
                  sendProject={this.props.sendProject}
                  hideIcon={true}/>
    );

    return (
      <div>
        {this.state.addNewTask ? addTask : null}
        {this.state.addNewProject ? addProject : null}
      </div>
    )
  }
}

export default Shortcuts;
