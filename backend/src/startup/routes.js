const habit = require('../routes/habits')
const bundle = require('../routes/bundles')
const user = require('../routes/users')
const auth = require('../routes/auth')
const error = require('../middleware/error')
const express = require('express')

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/habit", habit)
  app.use("/api/bundle", bundle)
  app.use("/api/user", user)
  app.use("/api/auth", auth)
  app.use(error)
}
