class DateTimeService {

  get currentDateTime () {
    return new Date();
  }

  toDateString(date) {
    return date.toDateString();
  }

  fromDateString(dateString) {
    return new Date(dateString);
  }

  addDay(date, daysCount = 1) {
    return new Date(date.getTime() + daysCount * 86400000);
  }

  setTime(date, time) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );
  }
}

export default new DateTimeService();
