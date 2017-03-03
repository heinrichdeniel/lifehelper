import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Input from 'components/Input'
import Button from 'components/Button'
import ErrorBox from 'components/ErrorBox'
import css from './style.scss'

import FacebookLogin from '../FacebookLogin';
import GoogleLogin from '../GoogleLogin';

export default class Registration extends Component{
  constructor(props) {
    super(props);
    this.renderForm=this.renderForm.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSendRegistration = this.onSendRegistration.bind(this);
    this.onSocialLogin = this.onSocialLogin.bind(this);
    this.state = {
      error: null
    }

  }

  closeModal(){
    this.props.reset();
    this.props.closeModal();
  }

  onSocialLogin(){
    this.props.reset();
    this.props.closeModal();
  }

  onSendRegistration(e) {
    e.preventDefault();
    this.props.resetRegistration();

    let errors = [];

    if (!this.props.user.username) {
      errors.push('name');
    }

    if (!this.props.user.email) {
      errors.push('email');
    }

    if (!this.props.user.password) {
      errors.push('password');
    }

    if (errors.length > 1) {
      this.setState({error: 'Please fill the ' + errors.join(', ') + ' fields!'});
      return null;
    } else if (errors.length > 0) {
      this.setState({error: 'Please fill the ' + errors.join(', ') + ' field!'});
      return null;
    } else {
      if (this.props.user.username.length < 4 || this.props.user.username.length > 20) {
        return this.setState({error: 'The name must contain at least 4, maximum 20 character!'})
      }
      if (this.props.user.email.length < 6 ) {
        return this.setState({error: 'Email must contain at least 6!'})
      }
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.props.user.email.match(emailRegex)){
        return this.setState({error: 'Email must be valid!'})
      }
      if (this.props.user.password.length < 6 || this.props.user.password.length > 20) {
        return this.setState({error: 'Password must contain at least 6, maximum 20 character!'})
      }
      let passRegex = /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
      if (!this.props.user.password.match(passRegex)) {
        return this.setState({error: 'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number!'})
      }
    }

    this.setState({
      error: null
    });
    this.props.sendRegistration(this.props.user);

  }

  changeEmail(e) {
    this.props.setEmail(e.target.value)
  }

  changeName(e) {
    this.props.setName(e.target.value)
  }

  changePassword(e) {
    this.props.setPassword(e.target.value);
  }

  renderForm(){
    return(
      <div className={css.form}>
        <form  action="POST" onSubmit={this.onSendRegistration}>
          <input style={{display:'none'}} type="text" name="" />    {/*that is needed to turn off autocomplete*/}
          <input style={{display:'none'}} type="password" name="" />      {/*that is needed to turn off autocomplete*/}
          <Input type="text" placeholder="Username" value={this.props.user.username} onChange={this.changeName} minLength={4} maxLength={20} />
          <Input type="text" placeholder="Email" value={this.props.user.email} onChange={this.changeEmail} minLength={6} />
          <Input type="password" placeholder="Password" value={this.props.user.password} onChange={this.changePassword} minLength={6} maxLength={20} />

          {this.state.error ? <ErrorBox error={this.state.error}/> : null}
          {this.props.registration.error ? <ErrorBox error={this.props.registration.error}/> : null}
          <Button type="submit" text="Sign up" style={css.button}/>
        </form>
      </div>
    )
  }

  render() {
    return (
      <Modal className="login-modal" show={this.props.isModalOpen} onHide={this.closeModal}>
        <div className={css.container}>
          <div className={css.body}>
            <i className={`fa fa-close ${css.close}`} onClick={this.closeModal} />
            <h1>Sign up</h1>
            <div className={css.buttons}>
              <FacebookLogin onLogin={this.onSocialLogin}
                             responseHandler={this.props.loginFacebook}
                             buttonText="Sign up with Facebook"/>
              <GoogleLogin onLogin={this.onSocialLogin}
                           responseHandler={this.props.loginGoogle}
                           buttonText="Sign up with Google"/>
              <div className={css.separator}>
                <div>
                  or
                </div>
              </div>

            </div>
            {this.renderForm()}
          </div>
        </div>
      </Modal>
    )
  }
}

Registration.propTypes = {
  isModalOpen: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  sendRegistration: React.PropTypes.func,
  setEmail: React.PropTypes.func,
  setPassword: React.PropTypes.func,
  resetRegistration: React.PropTypes.func,
  loginFacebook: React.PropTypes.func,
  loginGoogle: React.PropTypes.func,
  reset: React.PropTypes.func,
  user: React.PropTypes.object,
  registration: React.PropTypes.object
};
