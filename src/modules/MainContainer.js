import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from 'redux/modules/User/selectors'
import * as actions from 'redux/modules/User/actions'
import * as contentActions from 'redux/modules/Content/actions'
import * as contentSelectors from 'redux/modules/Content/selectors'
import Header from 'modules/Header/containers/HeaderContainer'
import Footer from 'modules/Footer/containers/FooterContainer'
import Comments from 'modules/Comments/containers/CommentContainer';


class MainContainer extends Component {
  constructor(props){
    super(props);
  }


  componentWillMount(){
    this.props.getProfile();
  }

  componentDidMount(){
    if (this.props.user.current.language && window.location.pathname.substring(1,3)!= this.props.user.current.language){
      this.props.switchLanguage(this.props.user.current.language);
    }
  }

  render() {
    return (
      <div style={{position: 'relative', minHeight: '100vh'}}>
        <Header />

        <div>
          {this.props.children}   {/*the content depends on the route*/}
          {this.props.authDetails.token ? <Comments/> : null}
        </div>
        <Footer />
      </div>
    )
  }
}


const mapActionsToProps = (dispatch) => ({
  getProfile: actions.getProfile,
  switchLanguage: contentActions.switchLanguage
});

const mapStateToProps = (state) => ({
  authDetails: selectors.authDetails(state),
  user: selectors.user(state),
  content: contentSelectors.content(state)
});


export default connect(mapStateToProps,mapActionsToProps)(MainContainer);
