import mongoose from "mongoose";
import config from "../config/config.js";

if (!config.mongodbUri) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1);
}

const connectDb = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDb;
