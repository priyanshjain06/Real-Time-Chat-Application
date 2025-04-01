import mongoose from "mongoose";
import chalk from "chalk";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(chalk.magenta(`MongoDB connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(chalk.red("MongoDB connection error:", error.message));
    process.exit(1); // Exit the process in case of failure
  }
};
