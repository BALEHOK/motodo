import { connect } from 'react-redux';
import DayView from './DayView';
import * as AppActionCreators from '../../Actions/AppActionCreators';
import * as DayViewActionCreators from '../../Actions/DayViewActionCreators';

const mapStateToProps = (state) => {
  return {
    date: state.app.date,
    items: state.dayView.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: date => dispatch(DayViewActionCreators.fetchItems(date)),
    goToPreviousDay: () => dispatch(AppActionCreators.goToPreviousDay()),
    goToNextDay: () => dispatch(AppActionCreators.goToNextDay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayView);
