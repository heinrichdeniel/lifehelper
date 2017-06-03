import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import css from './style.scss';
import Modal from 'react-bootstrap/lib/Modal'

import AddTask from 'modules/Tasks/containers/AddTaskContainer'
import Button from 'components/Button'
import Map from 'components/Map'
import Spinner from 'components/Spinner';
import { Scrollbars } from 'react-custom-scrollbars';


class TaskPage extends Component {
  constructor(props){
    super(props);
    this.deleteTask=this.deleteTask.bind(this);
    this.changeModalState=this.changeModalState.bind(this);
    this.renderMap=this.renderMap.bind(this);
    this.renderDeleteModal=this.renderDeleteModal.bind(this);

    this.state={
      showModal:false
    }
  }

  componentWillMount() {

    //get id from the url
    let pathname = window.location.pathname
    this.props.getTaskById(pathname.substring(pathname.lastIndexOf('/')+1))
  }

  changeModalState(){
    this.setState({
      showModal:!this.state.showModal
    })
  }

  deleteTask(){
    this.props.deleteTask(this.props.task.current.id);
    browserHistory.push(window.location.pathname.substring(0,3));
  }

  renderMap(){
    let task = this.props.task.current;

    if (task.location){       {/*google Map*/}
      return (
        <div className={css.map}>
          <Map setLocation={this.props.setLocation}
               location={task.location}
               lat={task.lat}
               lng={task.lng}
               suggestEnabled={true}/>
        </div>
      )
    }
  }

  renderDeleteModal(){
    let content = this.props.content.page.tasks.deleteTask;

    return (
      <Modal show={this.state.showModal}  dialogClassName={css.deleteModal} onHide={this.changeModalState}>
        <div  className={css.container}>
          <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />
          <h1>{this.props.task.current.name}</h1>
          <p>{content.question}</p>
          <Button type="button" onClick={this.deleteTask} text={content.delete} style={css.confirm}/>
          <Button type="button" onClick={this.changeModalState} text={content.cancel} style={css.cancel}/>
        </div>
      </Modal>
    )
  }

  render() {
    let task = this.props.task.current;
    let content = this.props.content.page.tasks;
    let time = this.props.task.current.time?", "+moment(this.props.task.current.time,"hh:m").format(this.props.user.timeFormat): null

    if (this.props.task.pending){
      return(
        <div className={css.base}>
          {this.props.task.pending? <Spinner/>: null}
        </div>
      )
    }
    if (task.name){       //returning the task data
      return(

        <div className={css.base}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className={css.body  + " container"}>
              <div className={css.details}>
                <p className={css.name}><span>{content.name}: </span> {task.name}</p>
                {task.Project? <p className={css.project}><span>{content.project}: </span>{task.Project.name}</p>: null}
                {task.description? <p className={css.description}><span>{content.description}: </span> {task.description}</p>: null}
                <p className={css.date}><span>{content.date}: </span>{moment(task.date).format(this.props.user.dateFormat)}{time}</p>
                {task.location? <p className={css.location}><span>{content.location}: </span>{task.location}</p>: null}
              </div>

              <div className={css.buttons}>
                <AddTask              //rendering a button for editing the task
                  buttonText={content.editTask.name}
                  sendButtonText={content.editTask.update}
                  buttonStyle={css.update}
                  update={true}
                  taskToUpdate={task}/>
                {this.renderDeleteModal()}
                <Button type="button" onClick={this.changeModalState} text={content.deleteTask.name} style={css.delete}/>
              </div>
              {this.renderMap()}
            </div>
          </Scrollbars>
        </div>

      );
    }
    else return null;

  }
}

export default TaskPage
