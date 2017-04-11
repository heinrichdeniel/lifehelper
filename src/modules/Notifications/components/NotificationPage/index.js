import React, { Component } from 'react';
import css from './style.scss';
import Header from 'components/Header';
import Footer from 'components/Footer';
import TaskNotifications from '../TaskNotifications';
import ProjectNotifications from '../ProjectNotifications';

class Notifications extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    if (!this.props.user.current.id){
      this.props.getProfile();
    }
    this.props.getNotifications();
  }

  render(){
    return (
      <div >
        <Header content={this.props.content}
                user={this.props.user.current}
                token={this.props.authDetails.token}/>
        <div className={css.base} >
          <h1><i className={css.flag + " fa fa-flag"}/>{this.props.content.page.settings.options.notifications} </h1>

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
        <Footer switchLanguage={this.props.switchLanguage}/>
      </div>
    )
  }
}

export default Notifications
