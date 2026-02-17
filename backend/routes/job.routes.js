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
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post(
  "/",
  upload.single("logo"),
  validateJob(ValidateEnum.CREATE),
  createJob,
);
router.put(
  "/:jobRefNum",
  upload.single("logo"),
  validateJob(ValidateEnum.UPDATE),
  updateJobByJobRefNum,
);
router.get("/", getAllJobs);
router.get("/:jobRefNum", getJobByJobRefNum);
router.delete("/:jobRefNum", deleteJobByJobRefNum);

export default router;
