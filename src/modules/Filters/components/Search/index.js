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
    browserHistory.push("/task/"+task.id);
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
  }

  renderTask(task) {
    if (task.name.toLowerCase().indexOf(this.state.searchValue) !== -1) {
      return (
        <p key={task.id} className={css.groupItem} onClick={this.selectTask.bind(this,task)}>
          {task.name}
        </p>
      )
    }
  }

  renderFoundItems(){
    if (this.state.searchValue!= ""){
      return (          //rendering the founded list of the project and task
        <div className={this.state.showInput +" "+css.found}>
          <div className={css.foundItems}>
            <div className={css.group}>
              <p className={css.groupName}>Projects</p>
              {this.props.project.list.map((project) => {return this.renderProject(project)})}
            </div>
            <div className={css.group}>
              <p className={css.groupName}>Tasks</p>
              {this.props.task.list.map((task) => {return this.renderTask(task)})}
            </div>
          </div>
        </div>

      );
    }
  }

  render() {
    return(
      <div className={css.base}>
        <Input value={this.state.searchValue} onChange={this.changeValue} placeholder="Quick search" style={css.input +" "+ this.state.showInput}/>
        <div className={css.icon +" "+ this.state.showIcon} onClick={this.showInput} >
          <i className="fa fa-search" aria-hidden="true"/>
        </div>
        {this.renderFoundItems()}
      </div>
    )
  }
}

export default Search
