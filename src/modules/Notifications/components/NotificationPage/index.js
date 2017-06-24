import React, { Component } from 'react';
import css from './style.scss';

import Header from 'modules/Header/containers/HeaderContainer'
import Footer from 'modules/Footer/containers/FooterContainer'
import TaskNotifications from '../TaskNotifications';
import ProjectNotifications from '../ProjectNotifications';
import { browserHistory } from 'react-router';

class Notifications extends Component{
  constructor(props) {
    super(props);

    this.renderEmptyPage = this.renderEmptyPage.bind(this);
  }

  componentWillMount(){
    this.props.getNotifications();
  }

  componentWillUpdate(nextProps) {
    let prevCount = this.props.notifications.projects.length + this.props.notifications.tasks.length;
    let count = nextProps.notifications.projects.length + nextProps.notifications.tasks.length;

    if (prevCount > 0 && count == 0) {
      browserHistory.push(window.location.pathname.substring(0, 3));
    }
  }

  renderEmptyPage(){
    if (this.props.notifications.projects.length == 0 && this.props.notifications.tasks.length == 0){
      return (
        <div className={css.emptyList}>
            {this.props.content.page.notifications.emptyList}!
        </div>
      )
    }
  }

  render(){
    return (
      <div >
        <Header />
        <div className={css.base} >
          <h1><i className={css.flag + " fa fa-flag"}/>{this.props.content.page.settings.options.notifications} </h1>
          {this.renderEmptyPage()}
          <ProjectNotifications content={this.props.content.page.notifications}
                                projects={this.props.notifications.projects}
                                pending={this.props.notifications.pending}
                                acceptProjectShare={this.props.acceptProjectShare}
                                declineProjectShare={this.props.declineProjectShare}
                                deleteProject={this.props.deleteProject}/>

          <TaskNotifications content={this.props.content.page.notifications}
                             tasks={this.props.notifications.tasks}
                             dateFormat={this.props.user.current.dateFormat}
                             pending={this.props.notifications.pending}
                             acceptTaskShare={this.props.acceptTaskShare}
                             declineTaskShare={this.props.declineTaskShare}
                             deleteTask={this.props.deleteTask}/>


        </div>
        <Footer />
      </div>
    )
  }
}

export default Notifications
