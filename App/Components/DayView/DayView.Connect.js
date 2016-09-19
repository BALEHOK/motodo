import { connect } from 'react-redux';
import DayView from './DayView';
import * as appActionCreators from '../../Actions/AppActionCreators';
import * as itemsActionCreators from '../../Actions/ItemsActionCreators';

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
    deleteItem: (itemId) => dispatch(itemsActionCreators.deleteItem(itemId)),
    markDone: (itemId) => dispatch(itemsActionCreators.markDone(itemId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayView);
