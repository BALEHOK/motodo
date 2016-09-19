import DayItemModel from '../Models/DayItemModel';

var items;
var idTracker = 0;
function createDayItem(name, date) {
  const item = new DayItemModel();
  item.id = idTracker++;
  item.name = name;
  item.date = date;
  return item;
}

function getItems() {
  var dateString = new Date().toDateString();
  var date = new Date(dateString);

  return [
    createDayItem(`First Title (${dateString})`, date),
    createDayItem(`Second Title (${dateString})`, date),
    createDayItem(`Third Title (${dateString})`, date),
    createDayItem(`Fourth Title (${dateString})`, date),
    createDayItem(`Fifth Title (${dateString})`, date)
  ];
}

class ItemRepository {
  constructor() {
    items = getItems();
  }

  getDayItems(date) {
    const ticks = date.getTime();

    return items.filter(i => i.date.getTime() === ticks);
  }

  addItem(item) {
    items.push(item);
  }

  deleteItem(itemId) {
    var index = items.findIndex(i => i.id === itemId);
    if (index !== -1) {
      items.splice(index, index + 1);
    }
  }

  markDone(itemId) {
    items.find(i => i === itemId).done = true;
  }
}

export default new ItemRepository();
