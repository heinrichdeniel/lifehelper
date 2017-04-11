import { connect } from 'react-redux'
import Notifications from '../components/NotificationPage';

import * as userActions from 'redux/modules/User/actions'
import * as taskActions from 'redux/modules/Tasks/actions'
import * as projectActions from 'redux/modules/Projects/actions'
import * as contentActions from 'redux/modules/Content/actions'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'

const mapActionsToProps = (dispatch) => ({
  getNotifications: userActions.getNotifications,
  switchLanguage: contentActions.switchLanguage,
  getProfile: userActions.getProfile,
  acceptTaskShare: taskActions.acceptShare,
  declineTaskShare: taskActions.declineShare,
  deleteTask: taskActions.deleteTask,
  acceptProjectShare: projectActions.acceptShare,
  declineProjectShare: projectActions.declineShare,
  deleteProject: projectActions.deleteProject
});


const mapStateToProps = (state) => ({
  notifications: userSelectors.notifications(state),
  authDetails: userSelectors.authDetails(state),
  user: userSelectors.user(state),
  content: contentSelectors.content(state)
});

export default connect(mapStateToProps, mapActionsToProps) (Notifications);
