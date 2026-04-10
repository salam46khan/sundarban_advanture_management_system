import { Server } from "http";
import mongoose from "mongoose";
import dotenv from "dotenv"
import app from "./app";
import { envVars } from "./config/env";


let server: Server

const port = envVars.PORT || 5000;

async function main() {
  try {
    console.log(envVars.PORT);
    
    await mongoose.connect(`${envVars.MONGODB_URI}`);
    console.log("🛢 Database connected successfully");

    server = app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.log("❌ Failed to connect database", err);
  }
}

process.on('unhandledRejection', (error) => {
  console.log('🚫 Unhandled Rejection detected. Closing server...');
  if (server) {
    server.close(() => {
      console.error(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Promise.reject(new Error("I forget to catch error"))


process.on('uncaughtException', (error) => {
  console.log('🚫 Uncaught Exception detected. Shutting down...');
  console.error(error);
  process.exit(1); // সার্ভার বন্ধ করে দেওয়া
});

// throw new Error("I forgot handle local error")

main();