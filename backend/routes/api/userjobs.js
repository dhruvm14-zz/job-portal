const express = require("express");
const router = express.Router();

const UserJob = require("../../models/UserJob");
const Job = require("../../models/Job");

router.post("/addUserJob", async (req, res) => {
  try {
    const newUserJob = new UserJob({
      userId: req.body.userId,
      jobId: req.body.jobId,
    });

    savedUserJob = await newUserJob.save();
    res.status(200).send(savedUserJob);
  } catch (error) {
    console.log(error);
  }
});
router.get("/isapplied/:userId&&:jobId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const jobId = req.params.jobId;

    const savedJob = await UserJob.find({ userId: userId, jobId: jobId });

    if (savedJob.length != 0) res.send(true);
    else res.send(false);
  } catch (error) {
    console.log(error);
  }
});
router.get("/applications/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    let savedJob = await UserJob.find({ jobId: jobId });
    const length = savedJob.length;

    console.log(savedJob);

    res.json({ savedJob, length });
  } catch (error) {
    console.log(error);
  }
});

router.get("/users/applications/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    let savedJob = await UserJob.find({ userId: userId });
    let savedArray = [];

    for (let i = 0; i < savedJob.length; i++) {
      const id = savedJob[i].jobId;
      try {
        const data = await Job.findById(id);
        savedArray.push(data);
      } catch (error) {
        console.log(error);
      }
    }

    res.json(savedArray);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
