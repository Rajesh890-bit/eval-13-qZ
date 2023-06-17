const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
};
