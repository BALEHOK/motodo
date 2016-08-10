import { connect } from 'react-redux';
import DayView from './DayView';
import * as ActionCreators from '../Actions/DayViewActionCreators';

const mapStateToProps = (state) => {
  return {
    items: state.dayView.items
  }
}

export default connect(mapStateToProps, ActionCreators)(DayView)
