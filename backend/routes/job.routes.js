import express from "express";
import {
  createJob,
  deleteJobByJobRefNum,
  getAllJobs,
  getJobByJobRefNum,
  updateJobByJobRefNum,
} from "../controller/job.controller.js";
import { validateJob } from "../middlewares/validateJobUpdate.js";
import { ValidateEnum } from "../utils/enum.js";

const router = express.Router();

router.post("/", validateJob(ValidateEnum.CREATE), createJob);
router.put("/:jobRefNum", validateJob(ValidateEnum.UPDATE), updateJobByJobRefNum);
router.get("/", getAllJobs);
router.get("/:jobRefNum", getJobByJobRefNum);
router.delete("/:jobRefNum", deleteJobByJobRefNum);

export default router;
