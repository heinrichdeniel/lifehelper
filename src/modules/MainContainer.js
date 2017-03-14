import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from 'redux/modules/Authentication/selectors'
import * as actions from 'redux/modules/Authentication/actions'
import * as contentActions from 'redux/modules/Content/actions'
import * as contentSelectors from 'redux/modules/Content/selectors'
import Header from 'components/Header'
import Footer from 'components/Footer'

class MainContainer extends Component {
  componentWillMount(){
    this.props.getProfile();
  }
  render() {
    return (
      <div style={{position: 'relative', minHeight: '100vh'}}>
        <Header content={this.props.content}
                user={this.props.user}
                token={this.props.authDetails.token}
                logout={this.props.logout}/>
        <div>
          {this.props.children}   {/*the content depends on the route*/}
        </div>
        <Footer switchLanguage={this.props.switchLanguage}/>
      </div>
    )
  }
}


const mapActionsToProps = (dispatch) => ({
  getProfile: actions.getProfile,
  logout: actions.logout,
  switchLanguage: contentActions.switchLanguage
});

const mapStateToProps = (state) => ({
  authDetails: selectors.authDetails(state),
  user: selectors.user(state),
  content: contentSelectors.content(state)
});

export default connect(mapStateToProps,mapActionsToProps)(MainContainer);
