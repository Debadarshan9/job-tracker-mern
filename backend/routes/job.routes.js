import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controller/job.controller.js";
import { validateJob } from "../middlewares/validateJobUpdate.js";
import { ValidateEnum } from "../utils/enum.js";

const router = express.Router();

router.post("/", validateJob(ValidateEnum.CREATE), createJob);
router.put("/:id", validateJob(ValidateEnum.UPDATE), updateJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.delete("/:id", deleteJob);

export default router;
