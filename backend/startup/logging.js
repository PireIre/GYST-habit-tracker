const winston = require('winston');
// require("winston-mongodb")
require("express-async-errors")


module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  )
  
  process.on("unhandledRejection", (ex) => {
    throw ex;
  })

/*   winston.add(winston.transports.MongoDB, { 
    db: "mongodb://localhost/gyst",
    level: "info"
  }) */
}