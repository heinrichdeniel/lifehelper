import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from 'redux/modules/User/selectors'
import * as actions from 'redux/modules/User/actions'
import * as contentActions from 'redux/modules/Content/actions'
import * as contentSelectors from 'redux/modules/Content/selectors'
import Header from 'components/Header'
import Footer from 'components/Footer'
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
        <Header content={this.props.content}
                user={this.props.user.current}
                token={this.props.authDetails.token}
                logout={this.props.logout}
                selectForm={this.props.selectForm}
                selectedForm={this.props.selectedForm}/>

        <div>
          {this.props.children}   {/*the content depends on the route*/}
          {this.props.authDetails.token ? <Comments/> : null}
        </div>
        <Footer switchLanguage={this.props.switchLanguage}/>
      </div>
    )
  }
}


const mapActionsToProps = (dispatch) => ({
  getProfile: actions.getProfile,
  logout: actions.logout,
  updateGeneralSettings: actions.updateGeneralSettings,
  selectForm: actions.selectForm,
  switchLanguage: contentActions.switchLanguage
});

const mapStateToProps = (state) => ({
  authDetails: selectors.authDetails(state),
  user: selectors.user(state),
  selectedForm: selectors.selectedForm(state),
  content: contentSelectors.content(state)
});


export default connect(mapStateToProps,mapActionsToProps)(MainContainer);
