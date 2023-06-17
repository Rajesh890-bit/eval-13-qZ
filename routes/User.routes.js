const express = require("express");

const userRouter = express.Router();

const { UserModel } = require("../model/User.model");

var jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      const user = new UserModel({ email, password: hash });
      await user.save();
      res.status(200).send({ msg: "New User has been registered" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      // Load hash from your password DB.
      bcrypt.compare(password, user.password, (err, result) => {
        // result == true
        if (result) {
          var token = jwt.sign(
            { authorID: user._id, author: user.name },
            "masai"
          );
          res.status(200).send({ msg: "Login Successful", token });
        } else {
          res.status(200).send({ msg: "Wrong Credential" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credential" });
    }
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
