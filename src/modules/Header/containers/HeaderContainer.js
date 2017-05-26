import { connect } from 'react-redux'
import Header from '../components/index.js';

import * as userActions from 'redux/modules/User/actions'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'

const mapActionsToProps = (dispatch) => ({
  getProfile: userActions.getProfile,
  selectForm: userActions.selectForm

});


const mapStateToProps = (state) => ({
  authDetails: userSelectors.authDetails(state),
  user: userSelectors.user(state),
  content: contentSelectors.content(state),
  selectedForm: userSelectors.selectedForm(state)

});

export default connect(mapStateToProps, mapActionsToProps) (Header);
