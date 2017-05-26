import React, { Component } from 'react'
import css from './style.scss'

import Header from 'modules/Header/containers/HeaderContainer'
import Footer from 'modules/Footer/containers/FooterContainer'
import Filters from 'modules/Filters'
import Shortcuts from 'modules/Shortcuts/containers/ShortcutsContainer'

import TaskList from 'modules/Tasks/containers/TaskListContainer'
import ProjectList from 'modules/Projects/containers/ProjectContainer'
import Archive from 'modules/Archive/containers/ArchiveContainer'
import Comments from 'modules/Comments/containers/CommentContainer'
import Authentication from 'modules/Authentication/containers/AuthenticationContainer'

class Landing extends Component {
  constructor(props){
    super(props);

    this.renderContent = this.renderContent.bind(this);
  }

  componentWillReceiveProps(newProps){
    let lang = window.location.pathname.substring(1,3);

    if (newProps.user.current.language && lang!= "en" && lang!="hu" && lang!="ro"){
      this.props.switchLanguage(this.props.user.current.language);
    }
  }

  renderContent(){
    if ( this.props.authDetails.token){      //if the user is logged in
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
          <Shortcuts content={this.props.content}/>
          <div className={css.taskList + " col-sm-7 col-lg-7"}>
            {content}
          </div>
        </div>

      )
    }
    else{
      return (
        <Authentication/>
      )
    }
  }

  render() {
    return(
      <div className={css.base}>
        <Header />

        {this.renderContent()}
        {this.props.authDetails.token ? <Comments/> : null}
        <Footer />
      </div>
    )
  }
}

export default Landing
