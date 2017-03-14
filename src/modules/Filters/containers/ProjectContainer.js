import { connect } from 'react-redux'
import ProjectFilters from "../components/ProjectFilters"
import * as projectAction from 'redux/modules/Projects/actions'
import * as projectSelectors from 'redux/modules/Projects/selectors'
import * as contentSelector from 'redux/modules/Content/selectors'


const mapActionsToProps = (dispatch) => ({
  getProjectList: projectAction.getProjectList,
  selectProject: projectAction.selectProject,
  createProject: projectAction.createProject,
  reset: projectAction.reset
});
const mapStateToProps = (state) => ({
  project: projectSelectors.project(state),
  content: contentSelector.content(state)

});


export default connect(mapStateToProps, mapActionsToProps) (ProjectFilters);
