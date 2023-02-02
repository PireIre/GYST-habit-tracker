const express = require('express')
const app = express()
const habit = require('./routes/habits')
const bundle = require('./routes/bundles')
const user = require('./routes/users')
const auth = require('./routes/auth')
const mongoose = require('mongoose');
const config = require("config")

if(!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey not defined");
  process.exit(1)
}

mongoose.connect('mongodb://localhost/gyst').then(() => console.log("connected to mongoDB"))

app.use(express.json());

app.use("/api/habit", habit)
app.use("/api/bundle", bundle)
app.use("/api/user", user)
app.use("/api/auth", auth)




app.listen(4000)

