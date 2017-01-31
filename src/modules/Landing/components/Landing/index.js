import React, { Component } from 'react'
import css from './style.scss'

import Header from 'components/Header'
import Footer from 'components/Footer'

import AddTask from 'modules/Tasks/containers/AddTaskContainer'

class Landing extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return(
      <div className={css.base}>
        <Header token={this.props.authDetails.token}
                logout={this.props.logout}/>
        <AddTask/>
        <Footer/>
      </div>
    )
  }
}

export default Landing
