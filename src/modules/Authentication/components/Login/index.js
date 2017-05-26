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
    this.onSendLogin = this.onSendLogin.bind(this);
    this.onSocialLogin = this.onSocialLogin.bind(this);
    this.state = {
      error: null
    }

  }

  onSocialLogin(){
    this.props.reset();
  }

  onSendLogin(e) {
    e.preventDefault();
    this.props.resetLogin();

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
            {this.renderLoginForm()}
          </div>
        </div>
    )
  }
}

Login.propTypes = {
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
