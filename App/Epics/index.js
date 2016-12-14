import { combineEpics } from 'redux-observable';
import itemsEpic from './ItemsEpic';
import dayViewEpic from './DayViewEpic';
import goalsEpic from './GoalsEpic';
import scoresEpic from './ScoresEpic';

export default combineEpics(
  itemsEpic,
  dayViewEpic,
  goalsEpic,
  scoresEpic
);
