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
    this.changeName = this.changeName.bind(this);
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

    let errors = [];

    if (!this.props.user.username || !this.props.user.username.match(/\S/)) {
      errors.push('username');
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
        return this.setState({error: 'Username must contain at least 4, maximum 20 character!'})
      }
      if (this.props.user.password.length < 6 || this.props.user.password.length > 20) {
        return this.setState({error: 'Password must contain at least 6, maximum 20 character!'})
      }
      let regex = /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
      if (!this.props.user.password.match(regex)) {
        return this.setState({error: 'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number!'})
      }
    }

    this.setState({
      error: null
    });
    this.props.sendLogin(this.props.user);

  }

  changeName(e) {
    this.props.setName(e.target.value)
  }

  changePassword(e) {
    this.props.setPassword(e.target.value);
  }

  renderLoginForm(){
    return(
      <div className={css.loginForm}>
        <form  action="POST" onSubmit={this.onSendLogin}>
          <input style={{display:'none'}} type="text" name="" />    {/*that is needed to turn off autocomplete*/}
          <input style={{display:'none'}} type="password" name="" />      {/*that is needed to turn off autocomplete*/}
          <Input type="text" placeholder="Username" value={this.props.user.username} onChange={this.changeName} minLength={4} maxLength={20} />
          <Input type="password" placeholder="Password" value={this.props.user.password} onChange={this.changePassword} minLength={6} maxLength={20} />

          {this.state.error ? <ErrorBox error={this.state.error}/> : null}
          {this.props.login.error ? <ErrorBox error={this.props.login.error}/> : null}
          <Button type="submit" text="Log in" style={css.login}/>
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
            <h1>Login</h1>
            <div className={css.buttons}>
              <FacebookLogin onLogin={this.onSocialLogin}
                             responseHandler={this.props.authFacebook}
                             buttonText="Log in with Facebook"/>
              <GoogleLogin onLogin={this.onSocialLogin}
                           responseHandler={this.props.authGoogle}
                           buttonText="Log in with Google"/>
              <div className={css.separator}>
                <div>
                  or
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
  setName: React.PropTypes.func,
  setPassword: React.PropTypes.func,
  resetLogin: React.PropTypes.func,
  user: React.PropTypes.object,
  login: React.PropTypes.object
};
