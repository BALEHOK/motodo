class DateTimeService {

  get currentDateTime () {
    return new Date();
  }

  toDateString(date) {
    return date.toDateString();
  }
}

export default new DateTimeService();
