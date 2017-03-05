import React, { Component } from 'react';
import Button from 'components/Button';
import LoginModal from 'modules/Authentication/containers/Login'
import RegistrationModal from 'modules/Authentication/containers/Registration'
import css from "./style.scss";
import { Link, browserHistory } from 'react-router'
import AddTask from 'modules/Tasks/containers/AddTaskContainer'

export default class Header extends Component {
  constructor(props){
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModals = this.closeModals.bind(this);
    this.logout = this.logout.bind(this);

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

  logout(){
    this.props.logout();
    browserHistory.push('/');
  }


  render() {
        let fixed = this.props.fixed ? 'navbar-fixed-top' : null;

        if (!this.props.token){
          return (
            <nav className={"navbar "+css.nav + " "+fixed}>
              <div className="container">
                <Link to={'/'} className={css.logo}><h1>LifeHelper</h1></Link>
                <div className={css.rightIcons}>
                  <Button onClick={this.openModal.bind(this,{loginModal:true})} text="Log in" />
                  <Button onClick={this.openModal.bind(this,{registrationModal:true})} text="Sign up" />
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
            <nav className={"navbar "+css.nav + " "+fixed}>
              <div className="container">
                <Link to={'/'} className={css.logo}><h1>LifeHelper</h1></Link>
                <div className={css.rightIcons}>
                  <AddTask
                    buttonText=" Add task"
                    buttonStyle={css.addTask}
                    sendButtonText="Create task">
                    <i className="fa fa-plus-square" aria-hidden="true"/>
                  </AddTask>
                  <Button style={css.logout} onClick={this.logout} text="Log out" ><i className="fa fa-sign-out"/></Button>
                </div>
              </div>
            </nav>
          )
        }

    }

}

Header.propTypes = {
    fixed: React.PropTypes.bool,
    logout: React.PropTypes.func
}

Header.defaultProps = {
    fixed: false
}
