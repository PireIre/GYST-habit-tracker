const express = require('express')
const { validate, Habit } = require('../models/habit')
const { Bundle } = require('../models/bundle')
const router = express.Router();
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId")

// GET all
router.get('/', async(req, res) => {
  const habits = await Habit
  .find()
  
  res.send(habits)
})

// GET one
router.get('/:id', validateObjectId, async (req,res) => {
  const habit = await Habit.findById(req.params.id)

  if (!habit) return res.status(404).send("404 - Habit not found")

  res.send(habit)
})

// POST
router.post("/", auth, async (req, res) => {
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
router.put("/:id", auth, async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const habit = await Habit.findByIdAndUpdate(req.params.id, { 
    action: req.body.action,
    time: req.body.time,
    location: req.body.location,
    days: req.body.days
   }, { new: true });

  if (!habit) return res.status(404).send("Habit does not exist")

  const bundles = await Bundle.find({ "habits._id": req.params.id });
  
  // Update the frequency of the habit in all bundles
    for (let i = 0; i < bundles.length; i++) {
      const bundle = bundles[i];
  
      // Check if the habit exists in the bundle
      const nestedHabit = bundle.habits.find(habit => habit._id.toString() === req.params.id.toString());
      if (!nestedHabit) return console.log(`Habit with id "${habitId}" not found in bundle "${bundle.name}"`);

      // Update the nested habit
      nestedHabit.action = req.body.action;
      nestedHabit.time = req.body.time;
      nestedHabit.location = req.body.location;
      nestedHabit.days = req.body.days;


      // Save the changes to the bundle document
      await bundle.save();
    }

    res.send(habit)
  })

// DELETE
router.delete('/:id', auth, async(req,res) => {
  let habit = await Habit.findById(req.params.id)
  if (!habit) return res.status(404).send("Habit does not exist and can therefore not be deleted")

  // 1. delete habit from all the bundles that include this habit
  // 1.1. Get all bundles that include this habit
  // 1.2.1. Get all bundles
  const bundles = await Bundle.find()

  // 1.2.2. Map through each bundle and return the indexes of all bundles where that habit exist in 

    let bundleIndexesWhereHabitExists = bundles.map((bundle, i) => {
      let habitIndex = bundle.habits.findIndex(habit => habit._id.toHexString() === req.params.id);
      if (habitIndex !== -1) return i;
    }).filter(e=>e!==undefined);

  // 1.2. Remove and save habits from those bundles

  for (let i = 0; i < bundleIndexesWhereHabitExists.length; i++) {
    let bundle = await Bundle.findById(bundles[bundleIndexesWhereHabitExists[i]])
    const indexOfHabit = bundle.habits.indexOf(req.params.id);

    bundle.habits.splice(indexOfHabit, 1)
    bundle = bundle.save()
  }  

  // 2. delete habit 
    await Habit.deleteOne({_id: req.params.id})

  // 3. Return habit 
  res.send(habit)
})

module.exports = router;