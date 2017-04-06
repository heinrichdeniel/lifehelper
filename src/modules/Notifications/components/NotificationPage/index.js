import React, { Component } from 'react';
import css from './style.scss';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SharedTasks from '../SharedTasks';

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
      <div>
        <Header content={this.props.content}
                user={this.props.user.current}
                token={this.props.authDetails.token}/>
        <div className={css.base + " container"} >
          <SharedTasks content={this.props.content.page.notifications}
                       tasks={this.props.notifications.tasks}
                       dateFormat={this.props.user.current.dateFormat}
                       pending={this.props.notifications.pending}
                       acceptTaskShare={this.props.acceptTaskShare}
                       declineTaskShare={this.props.declineTaskShare}/>
        </div>
        <Footer switchLanguage={this.props.switchLanguage}/>
      </div>
    )
  }
}

export default Notifications
