import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from 'modules/Tasks/components/TaskList/TaskItem';
import ProjectList from 'modules/Projects/containers/ProjectContainer';
import Spinner from 'components/Spinner';

class Archive extends Component {
  constructor(props){
    super(props);

    this.selectTab = this.selectTab.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.state = {
      activeTab: 1
    }
  }

  componentWillMount() {
    this.props.getArchive();
  }

  selectTab(tab){
    this.setState({
      ...this.state,
      activeTab: tab
    })
  }

  renderTask(task){
    if (task && (task.status == "completed" || task.status == "archived")){         //if the task was not deleted
      return (
        <TaskItem
          key={task.id}
          task={task}
          content={this.props.content}
          dateFormat={this.props.user.current.dateFormat}
          timeFormat={this.props.user.current.timeFormat}
          deleteTask={this.props.deleteTask}
          updateTask={this.props.updateTask}
          users={this.props.user.list}
          getUsersByFilter={this.props.getUsersByFilter}
          shareTask={this.props.shareTask}
          selectTask={this.props.selectTask}/>
      )
    }
    return  null;
  }

  renderContent(){
    let tasks = this.props.task.list;

    if (this.state.activeTab == 1){        //if the task tab is selected then return the archived tasks
      return (
        <div className={css.tasks}>
          {
            tasks.map( (task) =>
              this.renderTask(task)
            )
          }
        </div>
      )
    }
    else  if (this.state.activeTab == 2){      //if the project tab is selected then return the archived projects
      return (
        <div >
         <ProjectList archived={true} />
        </div>
      )
    }
  }

  render() {
    if (this.props.task.pending) {    /* while dont get response from server */
      return(
        <div className={css.base}>
          <Spinner/>
        </div>
      )
    }
    else{
      return(
        <div className={css.base}>
          <div className={css.tabs}>
            <div onClick={this.selectTab.bind(this,1)} className={css.taskTab +"   " + ((this.state.activeTab==1) ? css.active : null)}>
              {this.props.content.page.archive.taskTab}
              </div>
            <div onClick={this.selectTab.bind(this,2)} className={css.projectTab +"   " + ((this.state.activeTab==2) ? css.active : null)}>
              {this.props.content.page.archive.projectTab}
              </div>
          </div>

          {this.renderContent()}

        </div>
      );
    }
  }
}

export default Archive
