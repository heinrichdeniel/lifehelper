import React, { Component } from 'react';
import css from './style.scss';
import LeftPanel from './LeftPanel'
import NewComment from './NewComment'
import CommentBox from './CommentBox'

class CommentPanel extends Component {
  constructor(props){
    super(props);

    this.newComment = this.newComment.bind(this);
    this.newCommentReceived = this.newCommentReceived.bind(this);
    this.renderCommentTab = this.renderCommentTab.bind(this);
    this.selectTask = this.selectTask.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.clearSelect = this.clearSelect.bind(this);
    this.showHideMessagePanel = this.showHideMessagePanel.bind(this);
    this.sendFirstComment = this.sendFirstComment.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.changeComment = this.changeComment.bind(this);

    this.state = {
      newComment: false,
      channelAdded: false
    }
  }

  componentWillMount(){
    this.props.getTasksAndProjects();
    this.props.getComments();

    this.pusher = new Pusher('c8ef916cb507629d3a96', {
      encrypted: true,
      cluster: 'eu'
    });
    this.channel = this.pusher.subscribe('comments');
  }

  componentDidUpdate(){
    if (!this.state.channelAdded && this.props.user.current.id){      //bind a channel to pusher when the user id was received
      this.setState({
        ...this.state,
        channelAdded: true
      });
      let self = this;

      this.channel.bind(this.props.user.current.id.toString() , function () {
        self.newCommentReceived();
      });
    }

    if (this.props.selectedTaskId ) {     //if the user clicked to a comment icon of a task
      this.setState({
        ...this.state,
        selectedTask: this.props.comments.tasks.filter((task) => (task.id == this.props.selectedTaskId))[0],
        selectedProject: null
      });
      this.props.selectTask(null);
    }
    else if (this.props.selectedProjectId) {  //if the user clicked to a comment icon of a project
      this.setState({
        ...this.state,
        selectedProject: this.props.comments.projects.filter((project) => (project.id == this.props.selectedProjectId))[0],
        selectedTask: null
      });
      this.props.selectProject(null);
    }
    else if (this.state.selectedTask){
      let selectedTask = this.props.comments.tasks.filter((task) => (task.id == this.state.selectedTask.id))[0];
      if (selectedTask != this.state.selectedTask){
        this.setState({
          ...this.state,
          commentsRefreshed: false,
          selectedTask: selectedTask
        });
      }
    }
    else if (this.state.selectedProject){
      let selectedProject = this.props.comments.projects.filter((project) => (project.id == this.state.selectedProject.id))[0]
      if (selectedProject != this.state.selectedProject) {
        this.setState({
          ...this.state,
          commentsRefreshed: false,
          selectedProject: selectedProject
        });
      }
    }
  }

  componentWillUnmount() {
    this.channel.unbind();
    this.pusher.unsubscribe(this.channel);
  }

  newCommentReceived(){
    this.props.getComments();
    if (this.state.selectedTask){
      this.props.clearNewComment({task: this.state.selectedTask});
    }
    else if (this.state.selectedProject){
      this.props.clearNewComment({project: this.state.selectedProject});
    }
  }

  newComment(){
    this.setState({
      ...this.state,
      newComment: !this.state.newComment,
      selectedTask: null,
      selectedProject: null,
      comment: ""
    })
  }

  selectTask(task){
    if (task.UserTasks[0].newComment){
      this.props.clearNewComment({task: task});
    }
    this.setState({
      ...this.state,
      newComment: false,
      selectedTask: task,
      selectedProject: null,
      comment: ""
    });
  }

  selectProject(project){
    if (project.UserProjects[0].newComment){
      this.props.clearNewComment({project: project});
    }
    this.setState({
      ...this.state,
      newComment: false,
      selectedTask: null,
      selectedProject: project,
      comment: ""
    });
  }

  changeComment(e){
    this.setState({
      ...this.state,
      comment: e.target.value
    })
  }

  clearSelect(){
    this.setState({
      ...this.state,
      selectedTask: null,
      selectedProject: null,
      comment: ""
    });
  }


  showHideMessagePanel(){
    this.props.showHideMessagePanel();
  }

  sendFirstComment(payload){
    this.props.sendComment(payload);
    this.setState({
      ...this.state,
      newComment: false,
      selectedTask: this.props.comments.tasks.filter((task) => (task.id == payload.task))[0],
      selectedProject: this.props.comments.projects.filter((project) => (project.id == payload.project))[0]
    })
  }

  sendComment(payload){
    this.props.sendComment(payload);
    this.setState({
      ...this.state,
      comment: ""
    })
  }

  renderCommentTab(){
    if (this.state.newComment){
      return (
        <NewComment taskList={this.props.taskList}
                    projectList={this.props.projectList}
                    content={this.props.content}
                    sendComment={this.sendFirstComment}
                    getTasksAndProjects={this.props.getTasksAndProjects}
                    closePanel={this.newComment}/>
      )
    }
    else if (this.state.selectedTask || this.state.selectedProject){
      return (
        <CommentBox content={this.props.content}
                    selectedTask={this.state.selectedTask}
                    selectedProject={this.state.selectedProject}
                    sendComment={this.sendComment}
                    changeComment={this.changeComment}
                    comment={this.state.comment}
                    closePanel={this.clearSelect}
                    dateFormat={this.props.dateFormat}
                    timeFormat={this.props.timeFormat}
                    clearNewComment={this.props.clearNewComment}/>
      )
    }
  }

  render(){
    if (!this.props.showPanel){         //showing only the comment icon
      let commentStyle = (this.props.comments.count > 0) ? {color: "#d90000"} : null;
      return (
        <div className={css.hidePanel}>
          <i className={css.commentIcon + " fa fa-commenting"} style={commentStyle} onClick={this.showHideMessagePanel}/>
          {this.renderCommentTab()}
        </div>
      )
    }
    else{
      return (                  //rendering the Comment panel
        <div className={css.showPanel}>
          <i className={css.commentIcon + " fa fa-commenting"} onClick={this.showHideMessagePanel}/>
          <LeftPanel
            content={this.props.content.page.comments}
            comments={this.props.comments}
            selectTask={this.selectTask}
            selectedTask={this.state.selectedTask}
            selectProject={this.selectProject}
            selectedProject={this.state.selectedProject}
            newComment={this.newComment}/>
          {this.renderCommentTab()}
        </div>
      )
    }
  }
}

export default CommentPanel;
