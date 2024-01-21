// lib/db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL!; // Replace with your MongoDB connection string

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function connectDB() {
  try {
    console.log(MONGODB_URI)
    await mongoose.connect(MONGODB_URI, {
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDB;
