import React, { Component } from 'react';
import css from './style.scss';
import moment from 'moment';
import reactDom from 'react-dom';

class CommentBox extends Component {
  constructor(props){
    super(props);
    this.changeComment = this.changeComment.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    this.state={
      title: "",
      comment: ""
    }
  }

  componentDidMount() {
    this.scrollToBottom();

    if (this.props.selectedTask && this.props.selectedTask.UserTasks[0].newComment){
      this.props.clearNewComment({task: this.props.selectedTask});
    }
    else if (this.props.selectedProject && this.props.selectedProject.UserProjects[0].newComment){
      this.props.clearNewComment({project: this.props.selectedProject});
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();

    if (this.props.selectedTask && this.props.selectedTask.UserTasks[0].newComment){
      this.props.clearNewComment({task: this.props.selectedTask});
    }
    else if (this.props.selectedProject && this.props.selectedProject.UserProjects[0].newComment){
      this.props.clearNewComment({project: this.props.selectedProject});
    }
  }

  changeComment(e){
    this.setState({
      ...this.state,
      comment: e.target.value
    })
  }

  sendComment(){
    if (this.state.comment.length > 0){
      let payload = {
        comment: this.state.comment,
        task: this.props.selectedTask ? this.props.selectedTask.id : null,
        project: this.props.selectedProject ? this.props.selectedProject.id : null
      };
      this.props.sendComment(payload);
      this.setState({
        ...this.state,
        comment: ""
      });
    }
  }

  renderComment(comment){
    let dateformat = this.props.dateFormat + ", "+ this.props.timeFormat;
    if (moment(comment.createdAt).isSame(new Date, "day")){
      dateformat = this.props.timeFormat;
    }
    return (
      <div className={css.comment} key={comment.id}>
        <div className={css.head}>
          <div className={css.user}><img src={comment.User.photo_url}/>{comment.User.username}</div>
          <div className={css.time}>{moment(comment.createdAt).format(dateformat)}</div>
        </div>
        <div className={css.text}>{comment.text}</div>
      </div>
    )
  }

  scrollToBottom(){
    const comments = reactDom.findDOMNode(this.comments);
    comments.scrollTop = comments.scrollHeight;
  };

  render(){

    let title = null;
    if (this.props.selectedTask){
      title = <span><i className={css.taskIcon + " fa fa-tasks"}/>{this.props.selectedTask.name}</span>
    }
    else{
      title = <span><i className={css.taskIcon + " fa fa-chain"}/>{this.props.selectedProject.name}</span>
    }
    return (
      <div className={css.base}>
        <div className={css.title}>
          {title}
          <i className={css.closeIcon + " fa fa-times"} onClick={this.props.closePanel}/>
        </div>
        <div ref={(comments) => { this.comments = comments; }}className={css.comments}>
          {this.props.selectedTask.Comments.map((comment) => this.renderComment(comment))}
        </div>

        <div className={css.newComment}>
          <form action="POST" onSubmit={this.sendComment}>
          <textarea className={css.textArea}
                    value={this.state.comment}
                    onChange={this.changeComment}
                    placeholder={this.props.content.page.comments.example}/>
            <span className={css.arrow + " fa fa-arrow-right"} onClick={this.sendComment}/>
          </form>
        </div>
      </div>
    )
  }
}

export default CommentBox;
