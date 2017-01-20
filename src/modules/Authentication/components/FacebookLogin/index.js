import React, { Component } from 'react'
import css from './style.scss'
import config from 'config'

export default class FacebookLogin extends Component{
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.getDetails = this.getDetails.bind(this);
  }

  login(){
    FB.login(this.getDetails,{scope: 'public_profile, email'});
  }

  getDetails(response){
    let responseHandler = this.props.responseHandler;
    let onLogin = this.props.onLogin;

    FB.api("/me/picture?width=500&height=500", (picture) => {
      FB.api('/me', { locale: 'en_US', fields: 'name, email, picture'}, (fields) => {
        let userInfo = {
          email: fields.email,
          name: fields.name,
          id: fields.id,
          picture: picture
        }
        responseHandler({authResponse: response.authResponse, userInfo: userInfo});
        onLogin();
      });
    });
  }

  render() {
    return (
      <div className={css.facebook} onClick={this.login}>
        <i className="fa fa-facebook" aria-hidden="true"/>
        {this.props.buttonText}
      </div>
    );
  }
}

FacebookLogin.propTypes = {
  buttonText: React.PropTypes.string
};
