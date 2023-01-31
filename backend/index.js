const express = require('express')
const app = express()
const habit = require('./routes/habits')
const bundle = require('./routes/bundles')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gyst').then(() => console.log("connected to mongoDB"))

app.use(express.json());

app.use("/api/habit", habit)
app.use("/api/bundle", bundle)


app.listen(4000)

