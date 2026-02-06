import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.get("/", (_, res) => {
  res.send("Server is running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});
