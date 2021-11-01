const mongoose = require("mongoose");

const TempSchema = new mongoose.Schema(
  {
    temp_avg: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Temp = mongoose.model("Temp", TempSchema);

module.exports = Temp;
