import DayItemModel from '../Models/DayItemModel';

var items;

function createDayItem(name, date) {
  const item = new DayItemModel();
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
}

export default new ItemRepository();
