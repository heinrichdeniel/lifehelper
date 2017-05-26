import { connect } from 'react-redux'
import Footer from '../components/index.js';

import * as contentActions from 'redux/modules/Content/actions'
import * as contentSelectors from 'redux/modules/Content/selectors'

const mapActionsToProps = (dispatch) => ({
  switchLanguage: contentActions.switchLanguage

});


const mapStateToProps = (state) => ({
  content: contentSelectors.content(state)
});

export default connect(mapStateToProps, mapActionsToProps) (Footer);
