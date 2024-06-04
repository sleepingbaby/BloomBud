const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  plants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plant" }],
});

module.exports = mongoose.model("User", userSchema);
