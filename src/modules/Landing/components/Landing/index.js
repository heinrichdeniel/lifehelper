import React, { Component } from 'react'
import css from './style.scss'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Filters from 'modules/Filters'

import TaskList from 'modules/Tasks/containers/TaskListContainer'
import ProjectList from 'modules/Projects/containers/ProjectContainer'
import Archive from 'modules/Tasks/containers/ArchiveContainer'

class Landing extends Component {
  constructor(props){
    super(props);

    this.renderContent = this.renderContent.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
  }
  componentWillMount(){
    if (this.props.authDetails.token){
      this.props.getProfile();
    }
  }
  componentDidUpdate(){
    if (this.props.user.language && window.location.pathname.substring(1,3)!= this.props.user.language){
      this.props.switchLanguage(this.props.user.language);
    }
  }

  switchLanguage(lang){
    this.props.switchLanguage(lang);
    this.props.updateGeneralSettings({language:lang});
  }

  renderContent(){
    if (this.props.authDetails.token){      //if the user is logged in
      let content = <TaskList/>;
      let pathname = window.location.pathname;
      if (pathname.substring(pathname.length-8) == "projects"){   //render the projects tab
        content = <ProjectList/>
      }
      else if (pathname.substring(pathname.length-7) == "archive"){     //render the archive
        content = <Archive/>
      }

      return(
        <div className={css.content + " container"}>
          <Filters content={this.props.content.page.filters}/>
          <div className={css.taskList + " col-sm-7 col-lg-7"}>
            {content}
          </div>
        </div>
      )
    }
  }

  render() {
    return(
      <div className={css.base}>
        <Header content={this.props.content}
                user={this.props.user}
                token={this.props.authDetails.token}
                logout={this.props.logout}/>

            {this.renderContent()}

        <Footer switchLanguage={this.switchLanguage}/>
      </div>
    )
  }
}

export default Landing
