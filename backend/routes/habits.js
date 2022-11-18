const express = require('express')
const { validate, Habit } = require('../models/habit')
const router = express.Router();


// GET all
router.get('/', async(req, res) => {
  const habits = await Habit
  .find()
  .select({ action: 1 }) //ascending order (-1 is descending)

  res.send(habits)
})

// GET one
router.get('/:id', async (req,res) => {
    const habit = await Habit.findById(req.params.id)

  if (!habit) return res.status(404).send("404 - Habit not found")

  res.send(habit)
})

// POST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  let habit = new Habit({
    action: req.body.action,
    time: req.body.time,
    location: req.body.location
  })

  habit = await habit.save()

  res.send(habit)
})

// PUT
router.put("/:id", async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let habit = await Habit.findById(req.params.id)
  if (!habit) return res.status(404).send("Habit does not exist")

    habit.action = req.body.action;
    habit.time = req.body.time;
    habit.location = req.body.location;

  habit = await habit.save()
  res.send(habit);
})

// DELETE
router.delete('/:id', async(req,res) => {
  let habit = await Habit.findByIdAndRemove(req.params.id)
  if (!habit) return res.status(404).send("Habit does not exist and can therefore not be deleted")

  res.send(habit)
})

module.exports = router;