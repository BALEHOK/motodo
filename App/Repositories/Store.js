import { AsyncStorage } from 'react-native';

async function initStore(storeName, store) {
  AsyncStorage.getItem(storeName)
    .then(storedModel => {
    let persistStorePromise, model;
    if (!storedModel) {
      model = {
        rows: [],
        version: 0
      };
      persistStorePromise = persistStore({name: storeName, model});
    } else {
      model = JSON.parse(storedModel);

      // ToDo супер костыль. а бля пиздец починить быстро
      model.rows.forEach(r => r.date = new Date(r.date));
    }

    store.name = storeName;
    store.model = model;

    return persistStorePromise || Promise.resolve(true);
  });
}

function persistStore(store) {
  return AsyncStorage.setItem(store.name, JSON.stringify(store.model));
}

export default class Store {
  //properties
  name;
  model;

  constructor(storeName) {
    this.initialized = initStore(storeName, this);
  }

  persistStore() {
    return persistStore(this);
  }

  find(filter) {
    return this.model.rows.filter(filter);
  }

  findById(id) {
    let items = this.model.rows.filter(i => i.id === id);
    if (items.length) {
      if (items.length === 1) {
        return items[0];
      }

      throw new Exception(`found ${items.length} items with the same id ${id}, id must be unique`);
    }

    return null;
  }

  add(obj) {
    this.model.rows.push(obj);
    return this.persistStore();
  }

  update() {

  }

  // replaces objects sutisfying the filter in store by obj
  replace(filter, obj) {
    let flag = false;
    let rows = this.model.rows;
    for (var i = 0; i < rows.length;) {
      if (filter(rows[i])){
        rows[i] = obj;
        flag = true;
      }
    }

    return flag ? this.persistStore() : Promise.resolve(rows);
  }

  // removes objects sutisfying the filter
  remove(filter) {
    let flag = false;
    let rows = this.model.rows;
    for (var i = 0; i < rows.length;) {
      let item = rows[i];
      if (filter(item)){
        rows.splice(i, 1);
        flag = true;
      } else {
        ++i;
      }
    }

    return flag ? this.persistStore() : Promise.resolve(rows);
  }
}
