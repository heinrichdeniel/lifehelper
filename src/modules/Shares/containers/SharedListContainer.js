import { connect } from 'react-redux'
import SharedList from "../components/SharedList"
import * as userActions from 'redux/modules/User/actions'
import * as taskActions from 'redux/modules/Tasks/actions'
import * as userSelectors from 'redux/modules/User/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'

const mapActionsToProps = (dispatch) => ({
  getCollaborators: userActions.getCollaborators,
  getUsersByFilter: userActions.getUsersByFilter,
  shareTask: taskActions.shareTask

});
const mapStateToProps = (state) => ({
  content: contentSelectors.content(state).page.tasks.share,
  collaborators: userSelectors.collaborators(state),
  users: userSelectors.user(state).list,
  profile: userSelectors.user(state).current
});


export default connect(mapStateToProps, mapActionsToProps) (SharedList);
