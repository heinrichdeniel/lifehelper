import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from 'redux/modules/Authentication/selectors'
import * as actions from 'redux/modules/Authentication/actions'
import Header from 'components/Header'
import Footer from 'components/Footer'

class MainContainer extends Component {
  render() {
    return (
      <div>
        <Header token={this.props.authDetails.token}
                  logout={this.props.logout}/>
        <div>
          {this.props.children}   {/*the content depends on the route*/}
        </div>
        <Footer/>
      </div>
    )
  }
}


const mapActionsToProps = (dispatch) => ({
  logout: actions.logout
});

const mapStateToProps = (state) => ({
  authDetails: selectors.authDetails(state)
});

export default connect(mapStateToProps,mapActionsToProps)(MainContainer);
