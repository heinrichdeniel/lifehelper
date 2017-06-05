import React, { Component } from 'react';
import Button from 'components/Button';
import css from "./style.scss";
import { Link } from 'react-router'
import AddTask from 'modules/Tasks/containers/AddTaskContainer'
import Settings from 'modules/Settings/containers/Settings'
import Search from 'modules/Filters/containers/SearchContainer'
import { browserHistory } from 'react-router'

export default class Header extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    if (this.props.authDetails.token && !this.props.user.id ){
      this.props.getProfile();
    }
  }

  goToHomePage(){
    browserHistory.push(window.location.pathname.substring(0,3));

  }

  render() {
    let fixed = this.props.fixed ? 'navbar-fixed-top' : null;
    let content = this.props.content.page;

    let button = <Button onClick={this.props.selectForm.bind(this,"login")} text={content.login.name} />;
    if (this.props.selectedForm == "login"){
      button = <Button onClick={this.props.selectForm.bind(this,"registration")} text={content.registration.name} />;
    }
    if (!this.props.authDetails.token){
      return (
        <nav className={"navbar navbar-default "+css.nav + " "+fixed}>
          <Link to={window.location.pathname.substring(0,3)} className={css.logo}><h1>LifeHelper</h1></Link>
          <div className={"collapse navbar-collapse " +css.rightIcons} id="navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              {button}
            </ul>
          </div>
        </nav>
      )
    }
    else{
      return (
        <nav className={"navbar navbar-default "+css.nav + " "+fixed}>
          <Link to={window.location.pathname.substring(0,3)} className={css.logo}><h1>LifeHelper</h1></Link>
          <div className={css.rightIcons+" "+ css.afterLogin} >
            <ul className="nav navbar-nav navbar-right">
              <Search/>
              <AddTask
                buttonText={content.tasks.addTask.addTask}
                buttonStyle={css.addTask}
                sendButtonText={content.tasks.addTask.name}>
                <i className="fa fa-plus-square" aria-hidden="true"/>
              </AddTask>
              <div className={css.home} onClick={this.goToHomePage}>
                <i className="fa fa-home"/>
              </div>
              <Settings/>
            </ul>
          </div>
        </nav>
      )
    }

  }
}
