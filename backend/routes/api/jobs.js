const express = require("express");
const router = express.Router();
const validateJobInput = require("../../validation/jobPosting");

const Job = require("../../models/Job");

router.post("/addJob", async (req, res) => {
  const { errors, isValid } = validateJobInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const newJob = new Job({
      title: req.body.title,
      location: req.body.location,
      experience: req.body.experience,
      typeofContract: req.body.typeofContract,
      qualifications: req.body.qualifications,
      jobDesc: req.body.jobDesc,
      skills: req.body.skills,
      mobile: req.body.mobile,
      salary: req.body.salary,
      jobDate: req.body.jobDate,
      companyId: req.body.companyId,
    });

    savedJob = await newJob.save();

    res.status(200).send(savedJob);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    await Job.find()
      .then((jobs) => res.json(jobs))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Job.findById(id)
      .then((job) => res.json(job))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/posted/:userId", async (req, res) => {
  const id = req.params.userId;

  try {
    const data = await Job.find({ companyId: id });

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/editjob/:id", async (req, res) => {
  const { errors, isValid } = validateJobInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const newJob = {
      title: req.body.title,
      location: req.body.location,
      experience: req.body.experience,
      typeofContract: req.body.typeofContract,
      qualifications: req.body.qualifications,
      jobDesc: req.body.jobDesc,
      skills: req.body.skills,
      mobile: req.body.mobile,
      salary: Number(req.body.salary),
      jobDate: req.body.jobDate,
      companyId: req.body.companyId,
    };

    const updatedJob = await Job.updateOne(
      { _id: req.params.id },
      { $set: { ...newJob } }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deljob/:id", async (req, res) => {
  try {
    const delJob = await Job.deleteOne({ _id: req.params.id });
    res.status(200).json(delJob);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
