import { connect } from 'react-redux';
import DayView from './DayView';
import * as ActionCreators from '../../Actions/DayViewActionCreators';

const mapStateToProps = (state) => {
  return {
    date: state.app.date,
    items: state.dayView.items
  };
};

export default connect(mapStateToProps, ActionCreators)(DayView);
