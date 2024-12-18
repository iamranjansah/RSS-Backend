import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from "node-cron";
import {Stats} from "./models/Stats.js"

connectDB();

// cloudinary config

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Razorpay config
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Cron job to update subscription status

nodeCron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({});
    
  } catch (error) {
    console.log(error);
  }
}); 


app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});
