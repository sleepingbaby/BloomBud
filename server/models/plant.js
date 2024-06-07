const mongoose = require("mongoose");

const plantSchema = mongoose.Schema({
  name: {
    type: String,
  },
  scientific_name: {
    type: String,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("Plant", plantSchema);
