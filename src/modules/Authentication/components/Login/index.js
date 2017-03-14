import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Input from 'components/Input'
import Button from 'components/Button'
import ErrorBox from 'components/ErrorBox'
import css from './style.scss'

import FacebookLogin from '../FacebookLogin';
import GoogleLogin from '../GoogleLogin';

export default class Login extends Component{
  constructor(props) {
    super(props);
    this.renderLoginForm=this.renderLoginForm.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSendLogin = this.onSendLogin.bind(this);
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

  onSendLogin(e) {
    e.preventDefault();
    this.props.resetLogin();

    let content = this.props.content.page.errors;

    let errors = [];

    if (!this.props.user.email) {
      errors.push('email');
    }

    if (!this.props.user.password) {
      errors.push('password');
    }

    if (errors.length > 0) {
      this.setState({error: content.fillOut});
      return null;
    } else {
      if (this.props.user.email.length < 6) {
        return this.setState({error: content.smallEmail})
      }
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.props.user.email.match(emailRegex)){
        return this.setState({error: content.invalidEmail})
      }
      if (this.props.user.password.length < 6 || this.props.user.password.length > 20) {
        return this.setState({error: content.smallPassword})
      }
      let passRegex = /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
      if (!this.props.user.password.match(passRegex)) {
        return this.setState({error: content.invalidPassword})
      }
    }

    this.setState({
      error: null
    });
    this.props.sendLogin(this.props.user);

  }

  changeEmail(e) {
    this.props.setEmail(e.target.value)
  }

  changePassword(e) {
    this.props.setPassword(e.target.value);
  }

  renderLoginForm(){
    let content = this.props.content.page.login;
    return(
      <div className={css.loginForm}>
        <form  action="POST" onSubmit={this.onSendLogin}>
          <input style={{display:'none'}} type="text" name="" />    {/*that is needed to turn off autocomplete*/}
          <input style={{display:'none'}} type="password" name="" />      {/*that is needed to turn off autocomplete*/}
          <Input type="text" placeholder={content.email}  value={this.props.user.email} onChange={this.changeEmail} minLength={6} />
          <Input type="password" placeholder={content.password} value={this.props.user.password} onChange={this.changePassword} minLength={6} maxLength={20} />

          {this.state.error ? <ErrorBox error={this.state.error}/> : null}
          {this.props.login.error ? <ErrorBox error={this.props.login.error}/> : null}
          <Button type="submit" text={content.name} style={css.login}/>
        </form>
      </div>
    )
  }

  render() {
    let content = this.props.content.page.login;

    return (
      <Modal className="login-modal" show={this.props.isModalOpen} onHide={this.closeModal}>
        <div className={css.container}>
          <div className={css.body}>
            <i className={`fa fa-close ${css.close}`} onClick={this.closeModal} />
            <h1>{content.name}</h1>
            <div className={css.buttons}>
              <FacebookLogin onLogin={this.onSocialLogin}
                             responseHandler={this.props.loginFacebook}
                             buttonText={content.facebook}/>
              <GoogleLogin onLogin={this.onSocialLogin}
                           responseHandler={this.props.loginGoogle}
                           buttonText={content.google}/>
              <div className={css.separator}>
                <div>
                  {content.or}
                </div>
              </div>

            </div>
            {this.renderLoginForm()}
          </div>
        </div>
      </Modal>
    )
  }
}

Login.propTypes = {
  isModalOpen: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  sendLogin: React.PropTypes.func,
  setEmail: React.PropTypes.func,
  setPassword: React.PropTypes.func,
  resetLogin: React.PropTypes.func,
  loginFacebook: React.PropTypes.func,
  loginGoogle: React.PropTypes.func,
  reset: React.PropTypes.func,
  user: React.PropTypes.object,
  login: React.PropTypes.object
};
