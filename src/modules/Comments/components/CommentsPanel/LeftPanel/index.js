import React, { Component } from 'react';
import css from './style.scss';
import Button from 'components/Button';
import { Scrollbars } from 'react-custom-scrollbars';

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
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          {tasks.map((task,index) => {
            if (task.Comments.length > 0){
              return (
                <div className={css.item} key={index} onClick={this.props.selectTask.bind(this, task)}>
                  <i className={css.taskIcon + " fa fa-tasks"}/>
                  {task.name}
                  {(task.UserTasks[0].newComment && task != this.props.selectedTask) ? <i className={css.info + " fa fa-exclamation-circle"}/> : null}
                </div>
              );
            }
          })}
        </Scrollbars>
      </div>
    )
  }

  renderCommentedProjects(){
    let projects = this.props.comments.projects;
    return(
      <div className={css.commentedItems}>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          {projects.map((project, index) => {
            if (project.Comments.length > 0) {
              return (
                <div className={css.item} key={index} onClick={this.props.selectProject.bind(this, project)}>
                  <i className={css.chain + " fa fa-chain"}/>
                  {project.name}
                  {(project.UserProjects[0].newComment && project != this.props.selectedProject) ?
                    <i className={css.info + " fa fa-exclamation-circle"}/> : null}

                </div>
              );
            }
          })}
        </Scrollbars>
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
        {(this.state.activeTab == 1) ? this.renderCommentedTasks() : this.renderCommentedProjects()}
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
