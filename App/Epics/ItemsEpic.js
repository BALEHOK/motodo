import { combineEpics } from 'redux-observable';

import * as actionTypes from '../Actions/Types';
import * as actionCreators from '../Actions/AppActionCreators';
import itemsRepository from '../Repositories/ItemsRepository';
import notificationManager from '../Services/NotificationManager';

const addItem = (action$) =>
  action$.ofType(actionTypes.itemAdded)
    .map(action => action.item)
    .mergeMap(item => {
      return notificationManager.scheduleNotification(item)
        .map(notifId => {
          notifId && (item.notifId = notifId);
          return item;
        })
        .mergeMap(itemsRepository.addItem)
        .mapTo(actionCreators.dummy())
        .catch((e) => {
          console.log(e);
          return notificationManager.deleteNotification(item.notifId)
            .mapTo(actionCreators.dummy());
        });
    });

const deleteItem = (action$) =>
  action$.ofType(actionTypes.itemDelete)
    .mergeMap(action => itemsRepository.deleteItem(action.itemId))
    .mapTo(actionCreators.dummy());

const markDone = (action$) =>
  action$.ofType(actionTypes.itemDone)
    .mergeMap(action => itemsRepository.markDone(action.itemId))
    .mapTo(actionCreators.dummy());


export default combineEpics(addItem, deleteItem, markDone);
