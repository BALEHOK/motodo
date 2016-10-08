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

  markDone(itemId) {
    // items.find(i => i.id === itemId).done = true;
  }
}

export default new ItemRepository();
