import React, { Component } from 'react'
import css from './style.scss'
import config from 'config'

export default class GoogleLogin extends Component{
  constructor(props) {
    super(props);
    this.clickHandler=this.clickHandler.bind(this);
  }
 /* componentDidMount() {
    (function(d, s, id){
      var js, gs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = 'https://apis.google.com/js/platform.js'
      gs.parentNode.insertBefore(js, gs);
    }(document, 'script', 'google-platform'));
  }
*/
  clickHandler () {
   /* let responseHandler = this.props.responseHandler;
    let onLogin = this.props.onLogin;

    gapi.load('auth2', function() {
      gapi.auth2.init({
        client_id: '855509894038-od20qknpjku44bii3fb8e5hg3q1t5mdk.apps.googleusercontent.com',
        fetch_basic_profile: true,
        cookiepolicy: 'single_host_origin',
      }).then( function(auth2){
        auth2.signIn().then(function(googleUser) {
          responseHandler(googleUser);
          onLogin();
        });
      });
    });*/
  }
  render() {
    return (
      <div onClick={this.clickHandler} className={`${css.google}`}>
        <i className="fa fa-google-plus" aria-hidden="true"/>
        {this.props.buttonText}
      </div>
    );
  }

}

GoogleLogin.propTypes = {
  buttonText: React.PropTypes.string
};
