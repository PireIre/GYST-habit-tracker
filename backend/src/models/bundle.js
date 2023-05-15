const { habitSchema } = require("./habit")
const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);


const bundleSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  habits: [habitSchema],
});

const Bundle = mongoose.model("Bundle", bundleSchema);


validateBundleRequest = (bundle) => {
  const schema = Joi.object({
    name: Joi.string(),
    habitIds: Joi.array().items(Joi.objectId()),
    habitId: Joi.objectId(),
  })

 return schema.validate(bundle);
}

exports.validate = validateBundleRequest;
exports.Bundle = Bundle;