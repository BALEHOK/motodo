import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import GoalsReducer from './GoalsReducer';
import DayViewReducer from './DayViewReducer';

// glue all the reducers together into 1 root reducer
export default combineReducers({
  app: AppReducer,
  goals: GoalsReducer,
  dayView: DayViewReducer
});
