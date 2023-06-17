const mongoose = require("mongoose");

const leaderSchema = mongoose.Schema(
  {
    email: { type: String, require: true },
    score: { type: Number, require: true },
  },
  {
    versionKey: false,
  }
);

const LeaderModel = mongoose.model("leaderboards", leaderSchema);

module.exports = {
  LeaderModel,
};
