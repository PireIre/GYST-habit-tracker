const express = require('express')
const app = express()

require('./src/models/startup/logging')()
require('./src/models/startup/routes')(app)
require('./src/models/startup/db')()
require('./src/models/startup/config')()

const server = app.listen(4000)

module.exports = server;