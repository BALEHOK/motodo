import { combineEpics } from 'redux-observable';
import dayViewEpic from './DayViewEpic';

export default combineEpics(
  dayViewEpic
);
