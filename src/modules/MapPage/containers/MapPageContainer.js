import { connect } from 'react-redux'
import MapPage from '../components/index.js';

import * as taskActions from 'redux/modules/Tasks/actions'
import * as projectActions from 'redux/modules/Projects/actions'
import * as taskSelectors from 'redux/modules/Tasks/selectors'
import * as projectSelectors from 'redux/modules/Projects/selectors'
import * as contentSelectors from 'redux/modules/Content/selectors'
import * as userSelectors from 'redux/modules/User/selectors'

const mapActionsToProps = (dispatch) => ({
  getTaskList: taskActions.getTaskList,
  getProjectList: projectActions.getProjectList,
  changeTaskOrder: taskActions.changeTaskOrder
});

const mapStateToProps = (state) => ({
  task: taskSelectors.task(state),
  project: projectSelectors.project(state),
  content: contentSelectors.content(state),
  dateFormat: userSelectors.user(state).current.dateFormat,
  timeFormat: userSelectors.user(state).current.timeFormat

});

export default connect(mapStateToProps, mapActionsToProps) (MapPage);
