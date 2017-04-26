import CommentsPanel from '../components/CommentsPanel';
import {connect} from 'react-redux';

import * as commentActions from 'redux/modules/Comments/actions';
import * as commentSelectors from 'redux/modules/Comments/selectors';
import * as contentSelectors from 'redux/modules/Content/selectors';
import * as userSelectors from 'redux/modules/User/selectors';

const mapActionsToProps = (dispatch) => ({
  showHideMessagePanel: commentActions.showHideMessagePanel,
  getTasksAndProjects: commentActions.getTasksAndProjects,
  sendComment: commentActions.sendComment,
  getComments: commentActions.getComments,
  clearNewComment: commentActions.clearNewComment
});

const mapStateToProps = (state) => ({
  showPanel: commentSelectors.showPanel(state),
  content: contentSelectors.content(state),
  taskList: commentSelectors.taskList(state),
  projectList: commentSelectors.projectList(state),
  comments: commentSelectors.comments(state),
  dateFormat: userSelectors.user(state).current.dateFormat,
  timeFormat: userSelectors.user(state).current.timeFormat,
  user: userSelectors.user(state)
});

export default connect(mapStateToProps, mapActionsToProps)(CommentsPanel);
