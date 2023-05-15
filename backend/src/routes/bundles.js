const express = require('express')
const { validate, Bundle } = require('../models/bundle')
const { Habit } = require('../models/habit')
const router = express.Router();
const auth = require("../middleware/auth")


// GET all bundles
router.get('/', auth, async(req, res) => {
  const bundle = await Bundle
  .find()
  
  res.send(bundle)
})

// GET one
router.get('/:id', auth, async (req,res) => {
  const bundle = await Bundle.findById(req.params.id)

  if (!bundle) return res.status(404).send("404 - Bundle not found")

  res.send(bundle)
})

// POST bundle
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  let bundle = new Bundle({
    name: req.body.name,
    habits: []
  })

  bundle = await bundle.save()

  res.send(bundle)
})

// DELETE bundle
router.delete('/:id', auth, async(req,res) => {
  let bundle = await Bundle.findByIdAndRemove(req.params.id)
  if (!bundle) return res.status(404).send("Bundle does not exist and can therefore not be deleted")

  res.send(bundle)
})

// PUT bundle name
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  let bundle = await Bundle.findById(req.params.id)
  if (!bundle) return res.status(404).send("Bundle does not exist")

  bundle.name = req.body.name;
  bundle = await bundle.save()

  res.send(bundle)
})

// POST habit to bundle 
router.post("/:id/habit", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  let habit = await Habit.findById(req.body.habitId)
  if (!habit) return res.status(404).send("Habit does not exist")

  let bundle = await Bundle.findById(req.params.id)
  let allBundleHabitsIds = bundle.habits.map(habit => habit._id.toHexString())

  if (allBundleHabitsIds.includes(req.body.habitId)) return res.status(404).send("Habit is already been added to this bundle")
  if (!bundle) return res.status(404).send("Bundle does not exist")

  bundle.habits.push(habit)

  bundle = await bundle.save()

  res.send(bundle)
})

// DELETE habit from bundle 
router.delete('/:id/habit/:habitId', auth, async(req,res) => {
  let bundle = await Bundle.findById(req.params.id)
  if (!bundle) return res.status(404).send("Bundle does not exist")

  // Check if habit exists at all
  let habit = await Habit.findById(req.params.habitId)
  if (!habit) return res.status(404).send("Habit does not exist")

  // Check if habit exists in that bundle 
  let allBundleHabitsIds = bundle.habits.map(habit => habit._id.toHexString())
  if (!allBundleHabitsIds.includes(req.params.habitId)) return res.status(404).send("Habit does not exists in this bundle")

  // Remove the habit from bundle
  bundle.habits.splice(bundle.habits.findIndex(i => i._id.toHexString() === req.params.habitId),1);

  // Save updated bundle to database
  bundle = await bundle.save()
  res.send(habit)
})

module.exports = router;