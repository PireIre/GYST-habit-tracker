const express = require('express')
const { User } = require('../models/user')
const router = express.Router();
const bcrypt = require("bcrypt")
const Joi = require('joi');
const auth = require("../middleware/auth")


// POST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({email: req.body.email})
  if (!user) return res.status(400).send("Invalid email or password")

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send("Invalid email or password")

  const token = user.generateAuthToken();
  res.send(token)
})

router.get("/protected", auth, (req, res) => {
  // Access the decoded token data from the request object
  res.send(req.user);
});

validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().required().email().min(3).max(255),
    password: Joi.string().required().min(3).max(1024),
  })

 return schema.validate(user);
}

module.exports = router;