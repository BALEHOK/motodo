import { combineReducers } from 'redux';
import DayViewReducer from './DayViewReducer';

// glue all the reducers together into 1 root reducer
export default combineReducers({
  dayView: DayViewReducer
})
