import React, { Component } from 'react'
import css from './style.scss'

import Header from './Header'
import Footer from 'modules/Footer/containers/FooterContainer'
import Menu from './Menu'
import GeneralSettings from './GeneralSettings'
import AccountSettings from './AccountSettings'
import Shortcuts from './Shortcuts'
import Spinner from 'components/Spinner'

class SettingsPage extends Component {
  constructor(props){
    super(props);

    this.selectTab = this.selectTab.bind(this);
    this.renderSettingsTab = this.renderSettingsTab.bind(this);

    this.state={
      selectedTab: 1
    };
  }

  componentWillMount(){
    if (!this.props.user.id){       //if the state not contain the user
      this.props.getProfile();
    }
  }

  selectTab(id){
    this.setState({
      selectedTab: id
    });
  }

  renderSettingsTab(){
    if (!this.props.user.id) {     //if the user not loaded yet
      return <Spinner/>
    }
    if (this.state.selectedTab == 1){
      return (
        <GeneralSettings
          content={this.props.content.page.settings.general}
          user={this.props.user}
          saveChanges={this.props.updateGeneralSettings}
          switchLanguage={this.props.switchLanguage}/>
      )
    }
    else if (this.state.selectedTab == 2){
      return (
        <AccountSettings content={this.props.content.page}
                         saveChanges={this.props.updateAccountSettings}
                         removeError={this.props.removeError}
                         user={this.props.user}/>
      )
    }
    else if (this.state.selectedTab == 3){
      return (
        <Shortcuts content={this.props.content.page.settings.shortcuts}/>
      )
    }
  }


  render() {
    return (
      <div >
        <Header user={this.props.user}/>
        <div className={"container " + css.base}>
          <div className={css.body}>
          <Menu content={this.props.content.page.settings.menu}
                onClick={this.selectTab}
                active={this.state.selectedTab}/>
          {this.renderSettingsTab()}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default SettingsPage
