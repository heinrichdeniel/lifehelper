import React, { Component } from 'react'
import css from './style.scss'
import { browserHistory } from 'react-router'
import reactDom from 'react-dom';

class Settings extends Component {
  constructor(props){
    super(props);

    this.renderOptions = this.renderOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.logout = this.logout.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.openNotifications = this.openNotifications.bind(this);

    this.state={
      showOptions: false
    }
  }


  componentWillMount(){
    this.pusher = new Pusher('c8ef916cb507629d3a96', {
      encrypted: true,
      cluster: 'eu'
    });
    this.channel = this.pusher.subscribe('notifications');
  }

  componentDidUpdate(){
    let self = this;
    this.channel.bind(this.props.user.id.toString() , function () {
      self.props.getProfile();
    });
  }

  handleDocumentClick(e) {      //if the user clicked somewhere need to close the dropdown
    if (!reactDom.findDOMNode(this).contains(e.target)) {
      this.hideOptions();
    }
  }

  showOptions(){
    this.setState({
      showOptions: !this.state.showOptions
    });
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  hideOptions(){
    this.setState({
      showOptions: false
    });
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  logout(){
    this.hideOptions();
    this.props.logout();
    browserHistory.push(window.location.pathname.substring(0,3));
  }

  openSettings(){
    this.hideOptions();
    browserHistory.push(window.location.pathname.substring(0,3)+'/settings');
  }

  openNotifications(){
    this.hideOptions();
    browserHistory.push(window.location.pathname.substring(0,3)+'/notifications');
  }

  renderOptions(){
    let content = this.props.content.page.settings.options;
    let notification = <p className={css.option} onClick={this.openNotifications}>{content.notifications}<i className="fa fa-flag"/></p>;
    if (this.props.user.notifications){
      notification = <p className={css.option} onClick={this.openNotifications}>{content.notifications}<i className="fa fa-flag" style={{color: '#d30000'}}/></p>;
    }
    if (this.state.showOptions){
      return(
        <div className={css.options}>
          <i className={css.caretUp + " fa fa-caret-up"} aria-hidden="true"/>
          {notification}
          <p className={css.option} onClick={this.openSettings}>{content.settings}<i className="fa fa-wrench"/></p>
          <p className={css.option +" "+ css.logout} onClick={this.logout}>{content.logout}<i className="fa fa-sign-out"/></p>
        </div>
      )
    }
  }

  render() {
    let icon = <i className={css.userIcon + " fa fa-cog"} onClick={this.showOptions}/>;
    if (this.props.user.photo_url){
      icon = <img className={css.userImg} src={this.props.user.photo_url} onClick={this.showOptions}/>;
    }
    return(
      <div className={css.base}>
        {icon}
        {this.props.user.notifications ? <i className={css.notificationIcon + " fa fa-exclamation-circle"}/> : null}
        {this.renderOptions()}
      </div>
    )
  }
}

export default Settings
