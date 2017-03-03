import React, { Component } from 'react'
import css from './style.scss'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Filters from 'modules/Filters'

import TaskList from 'modules/Tasks/containers/TaskListContainer'

class Landing extends Component {
  constructor(props){
    super(props);

    this.renderContent = this.renderContent.bind(this);
  }

  renderContent(){
    if (this.props.authDetails.token)   //if the user is logged in
    return(
      <div className={css.content + " container"}>
        <Filters/>
        <div className={css.taskList + " col-sm-7 col-lg-7"}>
          <TaskList/>
        </div>
      </div>
      )
  }

  render() {
    return(
      <div className={css.base}>
        <Header token={this.props.authDetails.token}
                logout={this.props.logout}/>
        {this.renderContent()}
        <Footer/>
      </div>
    )
  }
}

export default Landing
