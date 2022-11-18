const express = require('express')
const app = express()
const habit = require('./routes/habits')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/habits').then(() => console.log("connected to mongoDB"))

app.use(express.json());

app.use("/api/habits", habit)

app.listen(4000)

