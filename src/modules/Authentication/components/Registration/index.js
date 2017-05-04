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
    this.onSendRegistration = this.onSendRegistration.bind(this);
    this.onSocialLogin = this.onSocialLogin.bind(this);
    this.state = {
      error: null
    }

  }


  onSocialLogin(){
    this.props.reset();
  }

  onSendRegistration(e) {
    e.preventDefault();
    this.props.resetRegistration();
    let content = this.props.content.page.errors;

    if (!this.props.user.username || !this.props.user.email || !this.props.user.password) {
      this.setState({error: content.fillOut});
    }

    if (this.props.user.username.length < 4 || this.props.user.username.length > 20) {
      return this.setState({error: content.smallName})
    }
    if (this.props.user.email.length < 6 ) {
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
    let content = this.props.content.page.registration;
    let error = null;
    if (this.props.registration.error == "Wrong email address or password!"){
      error = <ErrorBox error={content.wrongData}/>
    }
    return(
      <div className={css.form}>
        <form  action="POST" onSubmit={this.onSendRegistration}>
          <input style={{display:'none'}} type="text" name="" />    {/*that is needed to turn off autocomplete*/}
          <input style={{display:'none'}} type="password" name="" />      {/*that is needed to turn off autocomplete*/}
          <Input type="text" placeholder={content.username} value={this.props.user.username} onChange={this.changeName} minLength={4} maxLength={20} />
          <Input type="text" placeholder={content.email}  value={this.props.user.email} onChange={this.changeEmail} minLength={6} />
          <Input type="password" placeholder={content.password} value={this.props.user.password} onChange={this.changePassword} minLength={6} maxLength={20} />

          {this.state.error ? <ErrorBox error={this.state.error}/> : null}
          {error}
          <Button type="submit" text={content.name} style={css.button}/>
        </form>
      </div>
    )
  }

  render() {
    let content = this.props.content.page.registration;

    return (
        <div className={css.container + " container"}>
          <div className={css.body}>
            <div className={css.buttons}>
              <FacebookLogin onLogin={this.onSocialLogin}
                             responseHandler={this.props.loginFacebook}
                             buttonText={content.facebook}/>
              <GoogleLogin onLogin={this.onSocialLogin}
                           responseHandler={this.props.loginGoogle}
                           buttonText={content.google}/>
              <div className={css.separator}>
                <div className={css.left}/>
                <div className={css.or}>
                  {content.or}
                </div>
                <div className={css.right}/>
              </div>

            </div>
            {this.renderForm()}
          </div>
        </div>
    )
  }
}

Registration.propTypes = {
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
