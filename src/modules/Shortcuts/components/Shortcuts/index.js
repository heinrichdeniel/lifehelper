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
    Mousetrap.bind(['alt+t'], this.addNewTask);
    Mousetrap.bind(['alt+p'], this.addNewProject);
    Mousetrap.bind(['alt+c'], this.props.showHideMessagePanel);
    Mousetrap.bind(['t'], this.goToTasks);
    Mousetrap.bind(['p'], this.goToProjects);
    Mousetrap.bind(['a'], this.goToArchive);
    Mousetrap.bind(['s'], this.goToSettings);
    Mousetrap.bind(['n'], this.goToNotifications);
    Mousetrap.bind(['h'], this.goToHomepage);
  }

  componentWillUnmount() {
    Mousetrap.unbind(['alt+t'], this.addNewTask);
    Mousetrap.unbind(['alt+p'], this.addNewProject);
    Mousetrap.unbind(['alt+c'], this.props.showHideMessagePanel);
    Mousetrap.unbind(['t'], this.goToTasks);
    Mousetrap.unbind(['p'], this.goToProjects);
    Mousetrap.unbind(['a'], this.goToArchive);
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

  goToTasks(){
    browserHistory.push(window.location.pathname.substring(0,3)+'/tasks');
  }

  goToProjects(){
    browserHistory.push(window.location.pathname.substring(0,3)+'/projects');
  }

  goToArchive(){
    browserHistory.push(window.location.pathname.substring(0,3)+'/archive');
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
