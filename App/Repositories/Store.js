import { AsyncStorage } from 'react-native';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";

async function initStore(storeName, store) {
  let model = await AsyncStorage.getItem(storeName);
  if (!model) {
    model = {
      rows: [],
      version: 0
    };
    await persistStore({name: storeName, model});
  }

  store.name = storeName;
  store.model = model;
}

function persistStore(store) {
  return AsyncStorage.setItem(store.name, JSON.stringify(store.model));
}

export default class Store {
  constructor(storeName) {
    this.initialized$ = Observable.fromPromise(initStore(storeName, this));
  }

  find(filter) {
    return [...this.rows.filter(filter)];
  }

  add(obj) {
    this.rows.push(obj);
    return persistStore(this);
  }
}
