import Data from "@/data";
import connectDB from "@/lib/db";
import Drink from "@/models/drinkSchema";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  await connectDB();

  // Insert data into the database

  try {
    const drinks = await Drink.find({});
    return NextResponse.json({ data: drinks });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.error();
  } finally {
    // Close the MongoDB connection after processing
    await mongoose.connection.close();
    console.log("Connection to data closed");
  }
}
