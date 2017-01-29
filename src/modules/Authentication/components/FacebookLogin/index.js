import React, { Component } from 'react'
import css from './style.scss'

export default class FacebookLogin extends Component{
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.getDetails = this.getDetails.bind(this);
  }

  componentDidMount(){
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '235743573538702',
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  login(){
    FB.login(this.getDetails,{scope: 'public_profile, email'});
  }

  getDetails(response){
    let responseHandler = this.props.responseHandler;
    let onLogin = this.props.onLogin;

    FB.api("/me/picture?width=500&height=500", (picture) => {
      FB.api('/me', { locale: 'en_US', fields: 'name, email, picture'}, (fields) => {
        let user = {
          email: fields.email,
          name: fields.name,
          id: fields.id,
          picture: picture
        }
        responseHandler({authResponse: response.authResponse, user: user});
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
