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

    this.state={
      showOptions: false
    }
  }

  handleDocumentClick() {      //if the user clicked somewhere need to close the dropdown
    if (!reactDom.findDOMNode(this).contains(event.target)) {
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
    this.props.logout();
    browserHistory.push('/');
  }

  renderOptions(){
    if (this.state.showOptions){
      return(
        <div className={css.options}>
          <i className={css.caretUp + " fa fa-caret-up"} aria-hidden="true"/>
          <p className={css.option} onClick={this.openSettings}>Settings<i className="fa fa-wrench"/></p>
          <p className={css.option +" "+ css.logout} onClick={this.logout}>Log out<i className="fa fa-sign-out"/></p>
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
        {this.renderOptions()}
      </div>
    )
  }
}

export default Settings
