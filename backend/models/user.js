const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 }, 
  email:  { type: String, required: true, minlength: 5, maxlength: 255, unique: true } ,
  password: { type: String, required: true, minlength: 5, maxlength: 1024, unique: true }
});

const User = mongoose.model("User", userSchema);


validateUserRequest = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email().min(3).max(255),
    password: Joi.string().required().min(3).max(1024),
  })

 return schema.validate(user);
}

exports.validate = validateUserRequest;
exports.User = User;

