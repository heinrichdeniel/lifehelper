import React, { Component } from 'react';
import css from './style.scss';
import reactDom from 'react-dom'

class NewComment extends Component {
  constructor(props){
    super(props);
    this.selectTaskOrProject = this.selectTaskOrProject.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.selectTask = this.selectTask.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.sendComment = this.sendComment.bind(this);

    this.state={
      title: "",
      comment: "",
      selectedTask: null,
      selectedProject: null
    }

  }

  componentWillMount(){
    this.props.getTasksAndProjects();
    this.setState({
      ...this.state,
      taskList: this.props.taskList,
      projectList: this.props.projectList
    })
  }

  componentDidMount(){
    let self = this;
    $('textarea').on('keydown', function(event) {
      if (event.keyCode == 13){
        if (!event.shiftKey) self.sendComment(event);
      }
    });
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  changeInput(e){     //filtering the tasks and the projects
    document.addEventListener('click', this.handleDocumentClick, false);

    let tasks = this.props.taskList.filter((task) => (task.name.toLowerCase().startsWith(e.target.value.toLowerCase())));
    let projects = this.props.projectList.filter((project) => (project.name.toLowerCase().startsWith(e.target.value.toLowerCase())));

    this.setState({
      ...this.state,
      title: e.target.value,
      taskList: tasks,
      projectList: projects
    })
  }

  changeComment(e){
    this.setState({
      ...this.state,
      comment: e.target.value
    })
  }

  selectTask(task){
    this.setState({
      ...this.state,
      title: "",
      selectedTask: task
    });
  }

  selectProject(project){
    this.setState({
      ...this.state,
      title: "",
      selectedProject: project
    });
  }


  clearInput(){
    this.setState({
      ...this.state,
      title: "",
      selectedTask: null,
      selectedProject: null
    });
  }

  handleDocumentClick(e) {      //if the user clicked somewhere in the page
    if (reactDom.findDOMNode(this.refs.dropdown) && !reactDom.findDOMNode(this.refs.dropdown).contains(e.target)) {
      this.setState({
        ...this.state,
        title: ""
      });
      document.removeEventListener('click', this.handleDocumentClick, false);
    }
  }

  selectTaskOrProject(){
    if (this.state.title.length == 0){      //if the input is empty
      let placeholder = this.state.selectedTask ? this.state.selectedTask.name : this.props.content.page.comments["task/project"];
      placeholder = this.state.selectedProject ? this.state.selectedProject.name : placeholder;
      return (
        <div ref="dropdown" className={css.dropdown}>
          <input className={css.searchInput}
                 value={this.state.title}
                 onChange={this.changeInput}
                 placeholder={placeholder}
          />
          <span className="fa fa-times" onClick={this.props.clearSelect}/>
        </div>
      )
    }

    let num = 0;
    let tasks = this.state.taskList.map((task) => {
      num++;
      return (
        <p key={task.id} className={css.task} onClick={this.selectTask.bind(this, task)}>
          <i className="fa fa-tasks"/>
          {task.name}
        </p>
      );
    });
    let projects =  this.state.projectList.map((project) => {
      num++;
      return (
        <p key={project.id} className={css.project} onClick={this.selectProject.bind(this,project)}>
          <i className="fa fa-chain"/>
          {project.name}
        </p>
      );
    });

    if (num == 0){       //if not exists results
      tasks = <p className={css.noResults}>{this.props.content.page.comments.noResults}</p>;
    }


    return (                          //render a div with the possibilities
      <div ref="dropdown" className={css.dropdown} >
        <input className={css.searchInput}
               value={this.state.title}
               onChange={this.changeInput}
               placeholder={this.props.content.page.comments["task/project"]}/>
        <div className={css.content}>
          {tasks}
          {projects}
        </div>
      </div>
    )
  }

  sendComment(e){
    e.preventDefault();
    if (this.state.comment.length > 0 && (this.state.selectedTask || this.state.selectedProject)){
      let payload = {
        comment: this.state.comment,
        task: this.state.selectedTask ? this.state.selectedTask.id : null,
        project: this.state.selectedProject ? this.state.selectedProject.id : null
      };
      this.props.sendComment(payload);
      this.setState({
        ...this.state,
        comment: ""
      });
    }
  }

  render(){
    return (
      <div className={css.base}>
        <div className={css.title}>
          {this.props.content.page.comments.newComment}
          <i className={"fa fa-times"} onClick={this.props.closePanel}/>
        </div>
        {this.selectTaskOrProject()}
        <div className={css.newComment}>
          <form id="form" action="POST" onSubmit={this.sendComment}>
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

export default NewComment;
