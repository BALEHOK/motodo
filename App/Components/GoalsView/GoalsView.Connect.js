import { connect } from 'react-redux';
import GoalsView from './GoalsView';
import { goalsChanged } from '../../Actions/AppActionCreators';

const mapStateToProps = (state) => {
  return state.goals;
};

export default connect(mapStateToProps, goalsChanged)(GoalsView);
