const express = require('express')
const { validate, User } = require('../models/user')
const router = express.Router();
const bcrypt = require("bcrypt")
const auth = require("../middleware/auth")


// GET
router.get("/me", auth,  async (req,res) => {
  const user = await User.findById(req.user._id).select("-password")
  res.send(user);
})

// POST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({email: req.body.email})
  if (user) return res.status(400).send("user already registered")

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt)

  await user.save()

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({id: user._id, name:user.name, email:user.email})
})

module.exports = router;