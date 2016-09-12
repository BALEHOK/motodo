import { connect } from 'react-redux';
import DayView from './DayView';
import * as appActionCreators from '../../Actions/AppActionCreators';

const mapStateToProps = (state) => {
  return {
    date: state.app.date,
    items: state.dayView.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToPreviousDay: () => dispatch(appActionCreators.goToPreviousDay()),
    goToNextDay: () => dispatch(appActionCreators.goToNextDay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayView);
