const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  qualification: {
    type: String,
  },
  website: {
    type: String,
  },
  role: {
    type: String,
    default: "individual",
  },
  cv: { data: Buffer, contentType: String },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = User = mongoose.model("user", UserSchema);
