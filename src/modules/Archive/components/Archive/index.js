import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from 'modules/Tasks/components/TaskList/TaskItem';
import ProjectList from 'modules/Projects/containers/ProjectContainer';
import moment from 'moment';
import Spinner from 'components/Spinner';
import { Scrollbars } from 'react-custom-scrollbars';
import domCss from 'dom-css';

class Archive extends Component {
  constructor(props){
    super(props);

    this.applyDateFilter = this.applyDateFilter.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handleScrollUpdate = this.handleScrollUpdate.bind(this);

    this.state = {
      activeTab: 1,
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    }
  }

  componentWillMount() {
    this.props.getArchive();
  }

  applyDateFilter(task){
    let date = moment(task.date);
    if (this.props.task.dateTo == null){
      return true;
    }
    return (date.isBetween(this.props.task.dateFrom,this.props.task.dateTo,'days', '[]'));
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
    let tasks = this.props.task.list.filter(this.applyDateFilter);

    if (this.state.activeTab == 1){        //if the task tab is selected then return the archived tasks
      return (
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
      )
    }
    else  if (this.state.activeTab == 2){      //if the project tab is selected then return the archived projects
      return (
        <ProjectList archived={true} />
      )
    }
  }

  render() {
    let content = <Spinner/>;
    if (!this.props.task.pending){
      content = this.renderContent();
    }

    return(
      <div className={css.base}>
        <div className={css.title}>
          <h1>{this.props.content.page.archive.title}</h1>
          <div className={css.tabs}>
            <div onClick={this.selectTab.bind(this,1)} className={css.taskTab +"   " + ((this.state.activeTab==1) ? css.active : null)}>
              {this.props.content.page.archive.taskTab}
            </div>
            <div onClick={this.selectTab.bind(this,2)} className={css.projectTab +"   " + ((this.state.activeTab==2) ? css.active : null)}>
              {this.props.content.page.archive.projectTab}
            </div>
          </div>
        </div>
        {content}
      </div>
    );
  }
}

export default Archive
