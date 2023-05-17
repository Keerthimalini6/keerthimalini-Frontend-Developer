const express = require("express");
const userRouter = express.Router();
const { register, login } = require("../Controllers/users.controller");

// /users/register ==> To register a new user.
userRouter.post("/users/register", async (req, res) => {
  try {
    let body = req.body;
    let data = await register(body);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// /users/login ==> For logging in generating a token
userRouter.post("/users/login", async (req, res) => {
  try {
    let token = await login(req.body);

    if (token === "") {
      res.status(500).send("Wrong Creds!");
    } else {
      res.send("Logged in : ", token);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = userRouter;
