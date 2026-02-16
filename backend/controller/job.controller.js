import Job from "../models/job.js";
import { generateJobRefNum } from "../utils/utils.js";

export const createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      jobRefNum: generateJobRefNum(),
    };
    const job = await Job.create(jobData);
    return res.status(201).json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllJobs = async (_, res) => {
  try {
    const allJobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json(allJobs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getJobByJobRefNum = async (req, res) => {
  try {
    const { jobRefNum } = req.params;
    const job = await Job.findOne({ jobRefNum });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateJobByJobRefNum = async (req, res) => {
  try {
    const { jobRefNum } = req.params;
    const job = await Job.findOneAndUpdate({ jobRefNum }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)[0].message;
      return res.status(400).json({ message });
    }

    return res.status(500).json({ message: "Update failed" });
  }
};

export const deleteJobByJobRefNum = async (req, res) => {
  try {
    const { jobRefNum } = req.params;
    const job = await Job.findOneAndDelete({ jobRefNum });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Delete failed" });
  }
};
