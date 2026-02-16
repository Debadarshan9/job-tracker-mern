import mongoose from "mongoose";
import { StatusEnum } from "../utils/enum.js";
const jobSchema = new mongoose.Schema(
  {
    jobRefNum: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Title cannot be empty"],
    },
    company: {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, "Company name cannot be empty"],
      },
      logoUrl: { type: String },
    },
    status: {
      type: Number,
      enum: Object.values(StatusEnum),
      default: StatusEnum.APPLIED,
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
