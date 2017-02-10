import React, { Component } from 'react'
import css from './style.scss'

import Header from 'components/Header'
import Footer from 'components/Footer'

import AddTask from 'modules/Tasks/containers/AddTaskContainer'
import TaskList from 'modules/Tasks/containers/TaskListContainer'

class Landing extends Component {
  constructor(props){
    super(props);

    this.renderTasks = this.renderTasks.bind(this);
  }

  renderTasks(){
    if (this.props.authDetails.token)   //if the user is logged in
    return(
      <div className="container">
        <AddTask
        buttonText="Add new task"
        sendButtonText="Create task"/>
        <TaskList/>
      </div>
      )
  }

  render() {
    return(
      <div className={css.base}>
        <Header token={this.props.authDetails.token}
                logout={this.props.logout}/>
        {this.renderTasks()}
        <Footer/>
      </div>
    )
  }
}

export default Landing
