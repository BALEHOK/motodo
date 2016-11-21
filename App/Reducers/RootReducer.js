import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import GoalsReducer from './GoalsReducer';
import DayViewReducer from './DayViewReducer';

export default combineReducers({
  app: AppReducer,
  goals: GoalsReducer,
  dayView: DayViewReducer
});
