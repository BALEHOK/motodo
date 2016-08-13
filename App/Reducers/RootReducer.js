import { combineReducers } from 'redux';
import DayViewReducer from './DayViewReducer';
import AppReducer from './AppReducer';

// glue all the reducers together into 1 root reducer
export default combineReducers({
  app: AppReducer,
  dayView: DayViewReducer
});
