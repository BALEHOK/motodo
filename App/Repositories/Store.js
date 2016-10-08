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
}
