const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserJobSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "job",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserJob = mongoose.model("userjob", UserJobSchema);
