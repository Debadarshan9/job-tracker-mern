import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jobRouter from "./routes/job.routes.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (_, res) => {
  res.send("Server is running");
});

app.use("/api/job", jobRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
