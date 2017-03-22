import React, { Component } from 'react'
import css from './style.scss'
import reactDom from 'react-dom'

import Input from 'components/Input';
import {browserHistory} from 'react-router';

class Search extends Component {
  constructor(props){
    super(props);

    this.changeValue = this.changeValue.bind(this);
    this.renderFoundItems = this.renderFoundItems.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.selectTask = this.selectTask.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.showInput = this.showInput.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    this.state={
      searchValue: "",
      showInput: css.hideInput,
      showIcon: css.showIcon
    }
  }

  changeValue(e){
    this.setState({
      ...this.state,
      searchValue: e.target.value.toLowerCase()
    })
  }

  selectTask(task){
    browserHistory.push(window.location.pathname.substring(0,3)+"/task/"+task.id);
  }

  selectProject(project){
    this.props.selectProject(project)
    this.setState({
      ...this.state,
      searchValue: ""
    })
  }

  handleDocumentClick() {      //if the user clicked somewhere need to close the dropdown
    if (!reactDom.findDOMNode(this).contains(event.target)) {
      this.setState({
        ...this.state,
        showInput: css.hideInput,
        showIcon: css.showIcon
      });
      document.removeEventListener('click', this.handleDocumentClick, false);
    }
  }

  showInput(){
    this.setState({
      ...this.state,
      showInput: css.showInput,
      showIcon: css.hideIcon
    });
    document.addEventListener('click', this.handleDocumentClick, false);

  }

  renderProject(project){
    if (project.name.toLowerCase().indexOf(this.state.searchValue) !== -1){
      return (
        <p key={project.id} className={css.groupItem} onClick={this.selectProject.bind(this,project)}>
          {project.name}
        </p>
      )
    }
    return null;
  }

  renderTask(task) {
    if (task.name.toLowerCase().indexOf(this.state.searchValue) !== -1) {
      return (
        <p key={task.id} className={css.groupItem} onClick={this.selectTask.bind(this,task)}>
          {task.name}
        </p>
      )
    }
    return null;
  }

  renderFoundItems(){
    if (this.state.searchValue!= ""){
      let projects = null;
      let tasks = null;
      let projectList = this.props.project.list.map((project) => {return this.renderProject(project)}).filter(project => project)
      let taskList = this.props.task.list.map((task) => {return this.renderTask(task)}).filter(task => task)

      if (projectList.length > 0) {    //if any project finded
        projects = (
          <div className={css.group}>
            <p className={css.groupName}>{this.props.content.page.filters.search.projects}</p>
            {projectList}
          </div>
        )
      }

      if (taskList.length > 0) {    //if any task finded
        tasks = (
          <div className={css.group}>
            <p className={css.groupName}>{this.props.content.page.filters.search.tasks}</p>
            {taskList}
          </div>
        )
      }

      return (          //rendering the founded list of the project and task
        <div className={this.state.showInput +" "+css.found}>
          <div className={css.foundItems}>
            {projects}
            {tasks}
          </div>
        </div>
      );
    }
  }

  render() {
    return(
      <div className={css.base}>
        <Input value={this.state.searchValue} onChange={this.changeValue} placeholder={this.props.content.page.filters.search.quickSearch} style={css.input +" "+ this.state.showInput} focused={true}/>
        <div className={css.icon +" "+ this.state.showIcon} onClick={this.showInput} >
          <i className="fa fa-search" aria-hidden="true"/>
        </div>
        {this.renderFoundItems()}
      </div>
    )
  }
}

export default Search
