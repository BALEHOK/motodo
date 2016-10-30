import SQLite from 'react-native-sqlite-storage';

import Store from './StoreRx';

let db = {
  items: new Store('items')
};

SQLite.openDatabase({name: 'motodo.db', location: 'default'}, () => console.log('db opened'), () => console.log('db opening failed'));

db.initialized$ = db.items.initialized$;
export default db;
