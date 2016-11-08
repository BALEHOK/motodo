// import Store from './StoreRx';
import SqlStore from './SQL/Store';
let store = new SqlStore();

let db = {
  store,
  initialized$: store.initialized$
};

export default db;
