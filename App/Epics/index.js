import { combineEpics } from 'redux-observable';
import itemsEpic from './ItemsEpic';
import dayViewEpic from './DayViewEpic';

export default combineEpics(
  itemsEpic,
  dayViewEpic
);
