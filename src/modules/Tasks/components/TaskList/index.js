import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from './TaskItem';
import moment from 'moment';
import ReactTooltip from 'react-tooltip'
import Input from 'components/Input';
import Button from 'components/Button';
import ErrorBox from 'components/ErrorBox';
import Modal from 'react-bootstrap/lib/Modal'

class TaskList extends Component {
  constructor(props){
    super(props);

    this.applyDateFilter = this.applyDateFilter.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.editProject = this.editProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.changeModalState = this.changeModalState.bind(this);
    this.changeName = this.changeName.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.renderDeleteModal = this.renderDeleteModal.bind(this);
    this.deleteProject = this.deleteProject.bind(this);

    this.state = {
      updateProject: false,
      deleteProject: false
    }
  }
  componentWillMount(){
    this.props.getTaskList();
    this.props.reset();
  }
  componentWillReceiveProps(){
    this.setState({
      updateProject: false,
      deleteProject: false,
      error: false
    })
  }

  applyDateFilter(task){
    let date = moment(task.date);
    return (date.isBetween(this.props.dateFrom,this.props.dateTo,'days', '[]'));
  }

  editProject(){
    this.setState({
      updateProject: true,
      deleteProject: false,
      project: this.props.project.selected
    })
  }

  closeEdit(){
    this.setState({
      updateProject: false,
      deleteProject: false,
      error: false
    })
  }

  changeModalState(){
    this.setState({
      updateProject: false,
      deleteProject: !this.state.deleteProject
    })
  }

  updateProject(){
    if (this.state.project.name.length < 3 || this.state.project.name.length > 15) {
      return this.setState({error: 'The name must contain at least 3, maximum 15 character!'})
    }
    this.props.createProject(this.state.project);     //sending request to the api
    this.setState({
      ...this.state,
      updateProject: false,
      error: false
    });
  }

  deleteProject(){
    this.props.deleteProject(this.props.project.selected.id);     //sending request to the api
    this.setState({
      ...this.state,
      deleteProject: false
    })
  }

  changeName(e){
    this.setState({
      ...this.state,
      project:{
        ...this.state.project,
        name: e.target.value
      }
    })
  }

  renderTitle(){
    let selectedProject = this.props.project.selected;

    if (!selectedProject){
      return (
        <div className={css.projectTitle}>
          <h1>Your tasks</h1>
        </div>
      )
    }
    else if (!this.state.updateProject){           //if a project was selected then an input will be displayed to be able for modifying
      return (
        <div className={css.projectTitle}>
          <h1>{selectedProject.name}</h1>
          <div className={css.buttons}>
            <i onClick={this.editProject} data-tip="Edit project" className="fa fa-pencil" aria-hidden="true"/>
            <i onClick={this.changeModalState} data-tip="Delete project" className="fa fa-trash" aria-hidden="true"/>
          </div>
          <ReactTooltip />

        </div>
      )
    }
    else{                 //if the user want to update the project
      return (
        <div className={css.projectTitle}>
          <Input type="text" placeholder="Project name" style={css.input} value={this.state.project.name} onChange={this.changeName} minLength={3} maxLength={15} />
          {this.state.error ? <ErrorBox error={this.state.error}/> : null}
          <Button type="button" onClick={this.updateProject} text={"Update project"} style={css.update}/>
          <Button type="button" onClick={this.closeEdit} text={"Cancel"} style={css.cancel}/>
        </div>
      )
    }

  }

  renderTask(task){
    let selectedProject = this.props.project.selected;
    if (task && !task.deleted){         //if the task was not deleted
      if (!selectedProject || (selectedProject.id == task.ProjectId)){ //if a project filter was selected then the task project must be the same
        return <TaskItem key={task.id} task={task}/>
      }
    }
    return  null;
  }

  renderDeleteModal(){
    if (this.state.deleteProject){
      return (
        <Modal show={this.state.deleteProject} dialogClassName={css.deleteModal} onHide={this.changeModalState}>
          <div className={css.container}>
            <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />
            <h1>{this.props.project.selected.name}</h1>
            <p>Are you sure you want to delete this project?</p>
            <p className={css.warning}> <i className="fa fa-exclamation" aria-hidden="true"/>
              If you delete the project then all contained task will be deleted!</p>
            <Button type="button" onClick={this.deleteProject} text={"Delete"} style={css.confirm}/>
            <Button type="button" onClick={this.changeModalState} text={"Cancel"} style={css.cancel}/>
          </div>
        </Modal>
      )
    }
  }

  render() {
    let tasks = this.props.task.list.filter(this.applyDateFilter);
    return(
        <div className={css.base}>
          {this.renderTitle()}
          {this.renderDeleteModal()}
          <div className={css.tasks}>
            {
              tasks.map( (task) =>
               this.renderTask(task)
              )
            }
          </div>
        </div>
    );
  }
}

export default TaskList
