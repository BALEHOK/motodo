import { combineEpics } from 'redux-observable';

import * as actionTypes from '../Actions/Types';
import * as actionCreators from '../Actions/AppActionCreators';
import itemsRepository from '../Repositories/ItemsRepository';
import dateTimeService from '../Services/DateTimeService';
import viewTypes from '../Utils/ViewTypes';

const fetchItemsEpic = (action$) =>
  action$.ofType(actionTypes.setDate, actionTypes.startup)
    .map(() => actionCreators.fetchItems());

const onFetchItemsEpic = (action$, store) =>
  action$.ofType(actionTypes.fetchItems)
    .mergeMap(() => itemsRepository.getDayItems(store.getState().app.date))
    .map(items => actionCreators.itemsFetched(items));

const onPrevDayEpic = (action$, store) =>
  action$.ofType(actionTypes.goToPreviousDay)
    .map(() => actionCreators.setDate(dateTimeService.addDay(store.getState().app.date, -1)));

const onNextDayEpic = (action$, store) =>
  action$.ofType(actionTypes.goToNextDay)
    .map(() => actionCreators.setDate(dateTimeService.addDay(store.getState().app.date)));

const onItemAddedEpic = (action$, store) =>
  action$.ofType(actionTypes.itemAdded)
    .filter(action => {
      const appState = store.getState().app;
      return appState.view === viewTypes.day
        && appState.date.getTime() === action.item.date.getTime();
    })
    .map(action => actionCreators.itemAdded(action.item));


export default combineEpics(
  fetchItemsEpic,
  onFetchItemsEpic,
  onPrevDayEpic,
  onNextDayEpic,
  onItemAddedEpic
);
