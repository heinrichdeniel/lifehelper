import { connect } from 'react-redux'
import Shortcuts from "../components/Shortcuts"
import * as projectActions from 'redux/modules/Projects/actions'
import * as commentActions from 'redux/modules/Comments/actions'

const mapActionsToProps = (dispatch) => ({
  sendProject: projectActions.createProject,
  showHideMessagePanel: commentActions.showHideMessagePanel
});
const mapStateToProps = (state) => ({
});


export default connect(mapStateToProps, mapActionsToProps) (Shortcuts);
