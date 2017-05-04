import React, { Component } from 'react'

import Login from './Login';
import Registration from './Registration';

export default class Authentication extends Component{
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.selectedForm == "login"){
      return (
        <Login sendLogin= {this.props.sendLogin}
               setEmail= {this.props.setEmail}
               setPassword= {this.props.setPassword}
               resetLogin= {this.props.resetLogin}
               loginFacebook= {this.props.loginFacebook}
               loginGoogle= {this.props.loginGoogle}
               reset= {this.props.reset}
               user= {this.props.user}
               login= {this.props.login}
               content={this.props.content}/>
      )
    }
    else{
      return (
        <Registration sendRegistration= {this.props.sendRegistration}
                      setName= {this.props.setName}
                      setEmail= {this.props.setEmail}
                      setPassword= {this.props.setPassword}
                      resetRegistration= {this.props.resetRegistration}
                      loginFacebook= {this.props.loginFacebook}
                      loginGoogle= {this.props.loginGoogle}
                      reset= {this.props.reset}
                      user= {this.props.user}
                      registration= {this.props.registration}
                      content={this.props.content}/>
      )
    }
  }
}
