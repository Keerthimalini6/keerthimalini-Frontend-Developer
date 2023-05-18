const express = require("express");
const capsuleRouter = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// /users/register ==> To register a new user.
capsuleRouter.get("/capsule", async (req, res) => {
    try {
      const queryParam  = req.query;
      const status=queryParam.status || ""
      const type=queryParam.type || ""
      const original_launch=queryParam.original_launch || ""
      console.log(queryParam)
      const response = await fetch(`https://api.spacexdata.com/v3/capsules?status=${status}&type=${type}&original_launch=${original_launch}`);
      const body = await response.text();
      res.send(body);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });



module.exports = capsuleRouter;
