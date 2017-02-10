import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import css from './style.scss';
import Modal from 'react-bootstrap/lib/Modal'

import AddTask from 'modules/Tasks/containers/AddTaskContainer'
import Button from 'components/Button'

class TaskPage extends Component {
  constructor(props){
    super(props);
    this.deleteTask=this.deleteTask.bind(this);
    this.changeModalState=this.changeModalState.bind(this);
    this.state={
      showModal:false
    }
  }

  componentWillMount() {
    //get id from the url
    this.props.getTaskById(window.location.pathname.substring(6))
  }

  changeModalState(){
    this.setState({
      showModal:!this.state.showModal
    })
  }

  deleteTask(){
    this.props.deleteTask(this.props.task.current.id);
    browserHistory.push("/");
  }

  renderDeleteModal(){
    return (
      <Modal show={this.state.showModal}  dialogClassName={css.deleteModal} onHide={this.changeModalState}>
        <div  className={css.container}>
          <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />
          <h1>{this.props.task.current.name}</h1>
          <p>Are you sure you want to delete this task?</p>
          <Button type="button" onClick={this.deleteTask} text={"Delete"} style={css.confirm}/>
          <Button type="button" onClick={this.changeModalState} text={"Cancel"} style={css.cancel}/>
        </div>
      </Modal>
    )
  }

  render() {
    let task = this.props.task.current;

    if (task.name){       //returning the task data
      return(
        <div className={css.base + " container"}>
          <h1>{task.name}</h1>
          <div className={css.details}>
            <p className={css.description}>{task.description}</p>
            <p className={css.date}>{moment(task.date).format("MMM DD")}, {task.time}</p>
          </div>
          <AddTask
            buttonText="Edit task"
            sendButtonText="Update task"
            buttonStyle={css.update}/>
          {this.renderDeleteModal()}
          <Button type="button" onClick={this.changeModalState} text="Delete task" style={css.delete}/>
        </div>
      );
    }
    else return null;

  }
}

export default TaskPage
