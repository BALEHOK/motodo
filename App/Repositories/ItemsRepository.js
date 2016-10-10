import {Observable} from "rxjs/Observable";
import guid from '../Lib/Guid';
import db from './Db';


class ItemRepository {
  getDayItems(date) {
    const ticks = date.getTime();

    return db.items
      .find(i => !i.done && i.date.getTime() === ticks);
  }

  addItem(item) {
    item.id = guid();
    return db.items.add(item);
  }

  deleteItem(itemId) {
    return db.items.remove(i => i.id === itemId);
  }

  // !!! DANGEROUS !!! updating item by ref
  markDone(itemId) {
    let item = db.items.findById(itemId);
    if (item) {
      item.done = true;
      return db.items.persistStoreRx();
    }

    return Observable.from([null]);
  }
}

export default new ItemRepository();
