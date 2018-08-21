module.exports = date =>
  isNaN(Date.parse(date)) ? date : new Date(date).getDate();
