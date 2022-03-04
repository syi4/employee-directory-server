import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (err) {
    console.error("error connecting to db");
  }

  app.listen(process.env.PORT || 1337, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
};

start();
