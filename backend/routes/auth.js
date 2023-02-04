const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

//SIGNUP new user POST "/api/auth/signup" =======LOGIN NOT REQUIRED=========
router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const uniPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: uniPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//LOGIN user creds POST "/api/auth/login"   ==========
router.post("/login", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "Incorrect credentials" });
    }

    const authenticate = await bcrypt.compare(req.body.password, user.password);
    if (!authenticate) {
      return res.status(400).json("error: Incorrect credentials");
    }

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
