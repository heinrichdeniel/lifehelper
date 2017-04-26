import React, { Component } from 'react';
import css from './style.scss';
import Button from 'components/Button';

class LeftPanel extends Component {
  constructor(props){
    super(props);
    this.selectTab = this.selectTab.bind(this);
    this.renderCommentedTasks = this.renderCommentedTasks.bind(this);
    this.renderCommentedProjects = this.renderCommentedProjects.bind(this);

    this.state = {
      activeTab: 1
    }
  }

  selectTab(tab){
    this.setState({
      ...this.state,
      activeTab: tab
    })
  }

  renderCommentedTasks(){
    let tasks = this.props.comments.tasks;
    return(
      <div className={css.commentedItems}>
        {tasks.map((task) => {
          return (
            <div className={css.item} key={task.id} onClick={this.props.selectTask.bind(this, task)}>
              <i className={css.taskIcon + " fa fa-tasks"}/>
              {task.name}
              {(task.UserTasks[0].newComment) ? <i className={css.info + " fa fa-exclamation-circle"}/> : null}
            </div>
          );
        })}
      </div>
    )
  }

  renderCommentedProjects(){
    let projects = this.props.comments.projects;
    return(
      <div className={css.commentedItems}>
        {projects.map((project) => {
          return (
            <div className={css.item} key={project.id} onClick={this.props.selectProject.bind(this, project)}>
              <i className={css.chain + " fa fa-chain"}/>
              {project.name}
              {(project.UserProjects[0].newComment) ? <i className={css.info + " fa fa-exclamation-circle"}/> : null}

            </div>
          );
        })}
      </div>
    )
  }

  render(){
    return (
      <div className={css.base}>
        <div className={css.tabs}>
          <div onClick={this.selectTab.bind(this,1)} className={css.taskTab +"   " + ((this.state.activeTab==1) ? css.active : null)}>
            {this.props.content.taskTab}
          </div>
          <div onClick={this.selectTab.bind(this,2)} className={css.projectTab +"   " + ((this.state.activeTab==2) ? css.active : null)}>
            {this.props.content.projectTab}
          </div>
        </div>
        {(this.state.activeTab == 1) ? this.renderCommentedTasks() : this.renderCommentedProjects() }
        <div className={css.newComment}>
          <Button style={css.addButton} onClick={this.props.newComment}>
            <i className={css.addIcon + " fa fa-plus"} aria-hidden="true"/>
            {this.props.content.newComment}
          </Button>

        </div>
      </div>
    )
  }
}

export default LeftPanel;
