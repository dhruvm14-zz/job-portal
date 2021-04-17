const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  typeofContract: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobDate: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Job = mongoose.model("job", JobSchema);
