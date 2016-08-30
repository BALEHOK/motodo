class DateTimeService {

  get currentDateTime () {
    return new Date();
  }

  toDateString(date) {
    return date.toDateString();
  }

  addDay(date, daysCount = 1) {
    return new Date(date.getTime() + daysCount * 86400000);
  }
}

export default new DateTimeService();
