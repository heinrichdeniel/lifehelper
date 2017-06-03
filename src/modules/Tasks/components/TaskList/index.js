import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from './TaskItem';
import moment from 'moment';
import AddTask from '../../containers/AddTaskContainer'
import Spinner from 'components/Spinner';
import { Scrollbars } from 'react-custom-scrollbars';
import domCss from 'dom-css';

class TaskList extends Component {
  constructor(props){
    super(props);

    this.applyDateFilter = this.applyDateFilter.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleScrollUpdate = this.handleScrollUpdate.bind(this);

    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    };
  }

  componentWillMount() {
    this.props.getTaskList();
  }

  handleScrollUpdate(values) {
    const { shadowTop, shadowBottom } = this.refs;
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    domCss(shadowTop, { opacity: shadowTopOpacity });
    domCss(shadowBottom, { opacity: shadowBottomOpacity });
  }

  applyDateFilter(task){
    let date = moment(task.date);
    return (date.isBetween(this.props.dateFrom,this.props.dateTo,'days', '[]'));
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
    let content = this.props.content.page;

    return (
      <div className={css.projectTitle}>
        <h1>{content.tasks.yourTasks}</h1>
        <AddTask
          buttonText={content.tasks.addTask.addTask}
          buttonStyle={css.addTask}
          sendButtonText={content.tasks.addTask.name}
          update={false}
          iconStyle={css.addIcon}/>
      </div>
    );
  }

  renderTask(task){
    if (task && !task.deleted && !task.archived && !task.completed){         //if the task was not deleted
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
          clearNewComment={this.props.clearNewComment}
          selectTask={this.props.selectTask}/>
      )
    }
    return  null;
  }

  render() {


    if (this.props.task.pending) {    /* while dont get response from server */
      return(
        <div className={css.base}>
          {this.renderTitle()}
          <Spinner/>
        </div>
      )
    }
    else{

      let tasks = this.props.task.filteringByDate ? this.props.task.list.filter(this.applyDateFilter) : this.props.task.list;
      return(
        <div className={css.base}>
          {this.renderTitle()}
          <div className={css.tasks}>
            <Scrollbars ref="scrollbars"
                        onUpdate={this.handleScrollUpdate}
                        style={{ width: '100%', height: '100%' }}>
              {
                tasks.map( (task) =>
                  this.renderTask(task)
                )
              }
            </Scrollbars>
            <div
              ref="shadowTop"
              className={css.shadowTopStyle}/>
            <div
              ref="shadowBottom"
              className={css.shadowBottomStyle}/>
          </div>
        </div>
      );
    }
  }
}

export default TaskList
