const Joi = require('joi');
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  action: { type: String, required: true }, 
  time: { type: Number, min:1, max: 720 },
  location: String,
  days: Array,
});

const Habit = mongoose.model("Habit", habitSchema);


validateHabitRequest = (habit) => {
  const schema = Joi.object({
      action: Joi.string().required(),
      time: Joi.number().min(1).max(720),
      location: Joi.string(),
      days: Joi.array()
  })

 return schema.validate(habit);
}

exports.habitSchema = habitSchema;
exports.validate = validateHabitRequest;
exports.Habit = Habit;

