import { connect } from 'react-redux'
import TaskShare from "../components/TaskShare"
import * as userActions from 'redux/modules/User/actions'
import * as taskActions from 'redux/modules/Tasks/actions'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'

const mapActionsToProps = (dispatch) => ({
  getCollaborators: userActions.getCollaborators,
  getUsersByFilter: userActions.getUsersByFilter,
  shareTask: taskActions.shareTask,
  removeShare: taskActions.removeShare
});
const mapStateToProps = (state) => ({
  content: contentSelectors.content(state).page.tasks.share,
  collaborators: userSelectors.collaborators(state),
  users: userSelectors.user(state).list,
  profile: userSelectors.user(state).current
});


export default connect(mapStateToProps, mapActionsToProps) (TaskShare);
