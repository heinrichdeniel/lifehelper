import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from './TaskItem';
import moment from 'moment';
import AddTask from '../../containers/AddTaskContainer'
import domCss from 'dom-css';
import { Scrollbars } from 'react-custom-scrollbars';
import Reorder from 'react-reorder';

class TaskList extends Component {
  constructor(props){
    super(props);

    this.applyDateFilter = this.applyDateFilter.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.handleScrollUpdate = this.handleScrollUpdate.bind(this);
    this.renderEmptyList = this.renderEmptyList.bind(this);
    this.onSort = this.onSort.bind(this);

    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    };
  }

  componentWillMount() {
    this.props.getTaskList();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.task.list!= this.props.task.list){
      this.setState({
        ...this.state,
        list: null
      })
    }
  }



  applyDateFilter(task){
    let date = moment(task.date);
    if (this.props.task.dateTo == null){
      return true;
    }

    return (date.isBetween(this.props.task.dateFrom,this.props.taskdateTo,'days', '[]'));
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

  renderTitle(){
    let content = this.props.content.page;

    return (
      <div className={css.title}>
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

  renderEmptyList(tasks){
    if (tasks.length == 0){
      return (
        <div className={css.emptyList}>
          <h1>{this.props.content.page.tasks.emptyList}</h1>
          <i className="fa fa-tasks"/>
        </div>
      )
    }
  }


  onSort(e,item,from,to,list){
    let tasks = this.props.task.list.filter(this.applyDateFilter)
    if (to != from){
      e.stopPropagation();
      this.setState({
        list: list
      })
      if (to < from){
        if (to > 0 ){
          this.props.changeTaskOrder({taskId: item.task.id, priority: ((tasks[to-1].UserTasks[0].priority + tasks[to].UserTasks[0].priority)/2)})
        }
        else{
          this.props.changeTaskOrder({taskId: item.task.id, priority: ((tasks[to].UserTasks[0].priority)/2)})
        }
      }
      else{
        if (to < tasks.length - 1) {
          this.props.changeTaskOrder({taskId: item.task.id, priority: ((tasks[to].UserTasks[0].priority + tasks[to + 1].UserTasks[0].priority) / 2)})
        }
        else {
          this.props.changeTaskOrder({taskId: item.task.id, priority: ((tasks[to].UserTasks[0].priority + (Number.MAX_VALUE/2)) / 2)})
        }
      }
    }
  }

  render() {
    let tasks = this.props.task.list.filter(this.applyDateFilter);
    let list = [];
    if (this.state.list){
      list = this.state.list;
    }
    else {
      tasks.map((task, index) => {
        if (task && !task.deleted && !task.archived && !task.completed) {         //if the task was not deleted
          list.push({
            task: task,
            key: index,
            content: this.props.content,
            dateFormat: this.props.user.current.dateFormat,
            timeFormat: this.props.user.current.timeFormat,
            deleteTask: this.props.deleteTask,
            updateTask: this.props.updateTask,
            users: this.props.user.list,
            getUsersByFilter: this.props.getUsersByFilter,
            shareTask: this.props.shareTask,
            clearNewComment: this.props.clearNewComment,
            selectTask: this.props.selectTask
          })
        }
      });
    }
    return(
      <div className={css.base}>
        {this.renderTitle()}
        <div className={css.tasks}>
          <Scrollbars ref="scrollbars"
                      onUpdate={this.handleScrollUpdate}
                      style={{ width: '100%', height: '100%' }}>
            {this.renderEmptyList(tasks)}
            <Reorder
              itemKey="key"
              lock="horizontal"
              holdTime="500"
              list={list}
              template= {TaskItem}
              callback={this.onSort}
              listClass={css.myList}
              itemClass={css.listItem}
              selected={this.state.selected}
              selectedKey="key"
              disableReorder={false}/>
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

export default TaskList
