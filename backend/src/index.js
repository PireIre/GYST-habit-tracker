const express = require('express')
const app = express()

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

const server = app.listen(4000)

module.exports = server;