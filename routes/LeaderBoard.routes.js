const express = require("express");
const { LeaderModel } = require("../model/Leaderboard.model");
const LeaderRouter = express.Router();

LeaderRouter.get("/", async (req, res) => {
  try {
    const leader = await LeaderModel.find().sort({ score: -1 }).limit(3);
    res.status(200).send(leader);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {
  LeaderRouter,
};
