import React, { Component } from 'react'
import css from './style.scss'

import Header from './Header'

class SettingsPage extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    if (!this.props.user.id){       //if the state not contain the user
      this.props.getProfile();
    }
  }


  render() {
    return(
      <div className={css.base}>
        <Header user={this.props.user}/>
        <h1>Settings</h1>
      </div>
    )
  }
}

export default SettingsPage
