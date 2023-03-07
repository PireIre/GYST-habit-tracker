const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
  mongoose.connect('mongodb://localhost/gyst')
    .then(() => winston.info("connected to mongoDB"))
}