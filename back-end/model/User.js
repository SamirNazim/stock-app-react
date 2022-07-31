const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  data: [
    {
      ticker: String,
      qty: Number,
      avgprice: Number,
      currentprice: Number,
      previousclose: Number,
      sector: String,
      industry: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
