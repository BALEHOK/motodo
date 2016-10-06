// import {Observable} from "rxjs/Observable";
import Store from './StoreRx';

let db = {
  items: new Store('items')
};

db.initialized$ = db.items.initialized$;

export default db;
