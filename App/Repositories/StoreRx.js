import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import Store from './Store';

export default class StoreRx extends Store {
  constructor(storeName) {
    super(storeName);
    this.initialized$ = Observable.fromPromise(this.initialized);
  }

  add(obj) {
    return Observable.fromPromise(super.add(obj));
  }

  remove(filter) {
    return Observable.fromPromise(super.remove(filter));
  }
}
