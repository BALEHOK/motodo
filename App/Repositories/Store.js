import { AsyncStorage } from 'react-native';

async function initStore(storeName, store) {
  let model = await AsyncStorage.getItem(storeName);
  if (!model) {
    model = {
      rows: [],
      version: 0
    };
    await persistStore({name: storeName, model});
  } else {
    model = JSON.parse(model);

    // ToDo супер костыль. а бля пиздец починить быстро
    model.rows.forEach(r => r.date = new Date(r.date));
  }

  store.name = storeName;
  store.model = model;
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

  find(filter) {
    return [...this.model.rows.filter(filter)];
  }

// ToDo this.model.rows.push is not a function

  add(obj) {
    this.model.rows.push(obj);
    return persistStore(this);
  }

  update() {

  }

  remove(filter) {
    let rows = this.model.rows;
    for (var i = 0; i < rows.length;) {
      let item = rows[i];
      if (filter(item)){
        rows.splice(i, 1);
      } else {
        ++i;
      }
    }

    return persistStore(this);
  }
}
