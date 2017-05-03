import React, { Component } from 'react';
import css from './style.scss';
import moment from 'moment';
import reactDom from 'react-dom';
import { browserHistory } from 'react-router';

class CommentBox extends Component {
  constructor(props){
    super(props);
    this.sendComment = this.sendComment.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.goToProjectPage = this.goToProjectPage.bind(this);
    this.goToTaskPage = this.goToTaskPage.bind(this);

  }

  componentDidMount() {
    this.scrollToBottom();
      let self = this;
      $('textarea').on('keydown', function(event) {
        if (event.keyCode == 13)
          if (!event.shiftKey) self.sendComment(event);
      });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }


  sendComment(e){
    e.preventDefault();
    if (this.props.comment.length > 0){
      let payload = {
        comment: this.props.comment,
        task: this.props.selectedTask ? this.props.selectedTask.id : null,
        project: this.props.selectedProject ? this.props.selectedProject.id : null
      };
      this.props.sendComment(payload);
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
  }

  goToTaskPage(){
    browserHistory.push(window.location.pathname.substring(0,3)+"/task/"+this.props.selectedTask.id);
  }

  goToProjectPage(){
    browserHistory.push(window.location.pathname.substring(0,3)+"/projects/");
  }

  render(){
    let title = null;
    let comments = null;

    if (this.props.selectedTask && (this.props.selectedTask.Comments || !this.props.selectedTask.commented)){
      title = <span onClick={this.goToTaskPage}><i className={css.taskIcon + " fa fa-tasks"}/>{this.props.selectedTask.name}</span>
      if (this.props.selectedTask.Comments){
        comments = this.props.selectedTask.Comments.map((comment) => this.renderComment(comment));
      }
    }
    else if (this.props.selectedProject && (this.props.selectedProject.Comments || !this.props.selectedProject.commented)){
      title = <span onClick={this.goToProjectPage}><i className={css.taskIcon + " fa fa-chain"}/>{this.props.selectedProject.name}</span>
      if (this.props.selectedProject.Comments){
        comments = this.props.selectedProject.Comments.map((comment) => this.renderComment(comment));
      }
    }


    return (
      <div className={css.base}>
        <div className={css.title}>
          {title}
          <i className={css.closeIcon + " fa fa-times"} onClick={this.props.closePanel}/>
        </div>
        <div ref={(comments) => { this.comments = comments; }} className={css.comments}>
          {comments}
        </div>

        <div className={css.newComment}>
          <form action="POST" onSubmit={this.sendComment}>
          <textarea className={css.textArea}
                    value={this.props.comment}
                    onChange={this.props.changeComment}
                    placeholder={this.props.content.page.comments.example}/>
            <span className={css.arrow + " fa fa-arrow-right"} onClick={this.sendComment}/>
          </form>
        </div>
      </div>
    )
  }
}

export default CommentBox;
