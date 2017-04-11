import React, { Component } from 'react';
import css from './style.scss';
import Button from 'components/Button';
import moment from 'moment';
import Spinner from 'components/Spinner';

class ProjectNotifications extends Component{
  constructor(props) {
    super(props);

    this.renderNotification = this.renderNotification.bind(this);
    this.renderSharedProject = this.renderSharedProject.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onConfirm = this.onConfirm.bind(this);

    this.state = {
      project: {}
    }
  }

  onAccept(projectId){     //if the user accepted the share request
    this.props.acceptProjectShare(projectId);
    this.setState({
      ...this.state,
      hideProject: projectId
    })
  }

  onDecline(projectId){     //if the user declined the share request
    this.props.declineProjectShare(projectId)
    this.setState({
      ...this.state,
      hideProject: projectId
    })
  }

  onConfirm(projectId){
    this.props.deleteProject(projectId)
    this.setState({
      ...this.state,
      hideProject: projectId
    })
  }

  renderNotification(project){
    if (project.UserProjects[0].shareStatus == "pending"){              //if the have a share request
      return this.renderSharedProject(project);
    }
    else{                                            //if the share was deleted
      return this.renderDeletedShare(project);
    }
  }

  renderDeletedShare(project){
    let sharedBy = project.UserProjects[0].sharedUser;
    let icon = sharedBy.photo_url ? <img className={css.userIcon} src={sharedBy.photo_url}/> : <i className={css.userIcon + " fa fa-user"}/>;

    let content = this.props.content;
    let style = this.state.hideProject==project.id ? {opacity: 0} : null;
    return (
      <div className={css.project} key={project.id} style={style}>
        {icon}
        <span className={css.nameSpan}>{sharedBy.username}</span>
        <span>{content.deletedProjectAccess}</span>
        <span  className={css.projectSpan}>
          <i className={css.projectIcon + " fa fa-chain"}/>
          {project.name}
        </span>
        <div className={css.buttons}>
          <Button text={content.confirm} style={css.confirm} onClick={this.onConfirm.bind(this,project.id)}/>
        </div>
      </div>
    )
  }

  renderSharedProject(project){
    let sharedBy = project.UserProjects[0].sharedUser;
    let icon = sharedBy.photo_url ? <img className={css.userIcon} src={sharedBy.photo_url}/> : <i className={css.userIcon + " fa fa-user"}/>;

    let content = this.props.content;
    let style = this.state.hideProject==project.id ? {opacity: 0} : null;
    return (
      <div className={css.project} key={project.id} style={style}>
        {icon}
        <span className={css.nameSpan}>{sharedBy.username}</span>
        <span>{content.shareProjectMessage}</span>
        <span className={css.projectSpan}>
          <i className={css.projectIcon + " fa fa-chain"}/>
          {project.name}
        </span>

        <div className={css.buttons}>
          <Button text={content.decline} style={css.decline} onClick={this.onDecline.bind(this,project.id)}/>
          <Button text={content.accept} style={css.accept} onClick={this.onAccept.bind(this,project.id)}/>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div className={css.base  + " container"} >
        <div className={css.sharedProjects}>
          {this.props.projects.map(this.renderNotification)}
        </div>
      </div>

    )
  }
}

export default ProjectNotifications
