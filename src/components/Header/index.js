import React, { Component } from 'react';
import Button from 'components/Button';
import LoginModal from 'modules/Authentication/containers/Login'
import RegistrationModal from 'modules/Authentication/containers/Registration'
import css from "./style.scss";
import { Link } from 'react-router'
import AddTask from 'modules/Tasks/containers/AddTaskContainer'
import Settings from 'modules/Settings/containers/Settings'
import Search from 'modules/Filters/containers/SearchContainer'

export default class Header extends Component {
  constructor(props){
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModals = this.closeModals.bind(this);

    this.state = {
      loginModal: false,
      registrationModal: false,
      confirmModal: false
    }
  }

  openModal(modal) {
    this.setState( Object.assign({},this.state,modal));
  }

  closeModals() {
    this.setState({
      loginModal: false,
      registrationModal: false,
      confirmModal: false
    });
  }

  render() {
    let fixed = this.props.fixed ? 'navbar-fixed-top' : null;
    let content = this.props.content.page;

    if (!this.props.token){
      return (
        <nav className={"navbar navbar-default "+css.nav + " "+fixed}>
          <div className="container">
            <Link to={window.location.pathname.substring(0,3)} className={css.logo}><h1>LifeHelper</h1></Link>
            <div className={"collapse navbar-collapse " +css.rightIcons} id="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <Button onClick={this.openModal.bind(this,{loginModal:true})} text={content.login.name} />

                <Button onClick={this.openModal.bind(this,{registrationModal:true})} text={content.registration.name} />
              </ul>
            </div>

            <LoginModal isModalOpen={this.state.loginModal}
                        closeModal={this.closeModals}/>
            <RegistrationModal isModalOpen={this.state.registrationModal}
                               closeModal={this.closeModals}
                               openConfirmModal={this.openModal.bind(this,{confirmModal:true})}/>
          </div>
        </nav>
      )
    }
    else{
      return (
        <nav className={"navbar navbar-default "+css.nav + " "+fixed}>
          <div className="container">
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
                <Settings/>
              </ul>
            </div>
          </div>
        </nav>
      )
    }

  }

}

Header.propTypes = {
  fixed: React.PropTypes.bool
}

Header.defaultProps = {
  fixed: false
}
