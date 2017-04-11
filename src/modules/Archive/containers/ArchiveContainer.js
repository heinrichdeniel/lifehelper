import { connect } from 'react-redux'
import Archive from "../components/Archive"
import * as actions from 'redux/modules/Tasks/actions'
import * as selectors from 'redux/modules/Tasks/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'
import * as userSelectors from 'redux/modules/User/selectors'
import * as projectSelectors from 'redux/modules/Projects/selectors'
import * as userActions from 'redux/modules/User/actions'

const mapActionsToProps = (dispatch) => ({
  getArchive: actions.getArchive,
  reset: actions.reset,
  deleteTask: actions.deleteTask,
  updateTask: actions.sendTask,
  getUsersByFilter: userActions.getUsersByFilter,
  shareTask: actions.shareTask
});
const mapStateToProps = (state) => ({
  task: selectors.task(state),
  content: contentSelectors.content(state),
  user: userSelectors.user(state),
  project: projectSelectors.project(state)
});


export default connect(mapStateToProps, mapActionsToProps) (Archive);
