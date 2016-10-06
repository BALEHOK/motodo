import Store from './Store';
import guid from '../Lib/Guid';

var db = {
  items: new Store('items')
};

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
    // var index = items.findIndex(i => i.id === itemId);
    // if (index !== -1) {
    //   items.splice(index, 1);
    // }
  }

  markDone(itemId) {
    // items.find(i => i.id === itemId).done = true;
  }
}

export default new ItemRepository();
