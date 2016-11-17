import { connect } from 'react-redux';
import GoalsView from './GoalsView';
import * as ActionCreators from '../../Actions/AppActionCreators';

const mapStateToProps = (state) => {
  return state.goals;
};

export default connect(mapStateToProps, ActionCreators)(GoalsView);
