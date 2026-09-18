import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import Service from "../models/Service.js";
import Admin from "../models/Admin.js";

dotenv.config();

const services = [
  {
    name: "Haircut",
    description: "Professional haircut and styling tailored to your preference.",
    price: 500,
    duration: 30,
  },
  {
    name: "Hair Spa",
    description: "Relaxing hair spa treatment for nourishment and hydration.",
    price: 1200,
    duration: 60,
  },
  {
    name: "Facial",
    description: "Refreshing facial treatment for clean and glowing skin.",
    price: 800,
    duration: 45,
  },
  {
    name: "Manicure",
    description: "Complete manicure treatment for clean and beautiful nails.",
    price: 600,
    duration: 45,
  },
  {
    name: "Pedicure",
    description: "Relaxing pedicure treatment for healthy and refreshed feet.",
    price: 700,
    duration: 45,
  },
  {
    name: "Bridal Makeup",
    description: "Professional bridal makeup service for your special day.",
    price: 5000,
    duration: 120,
  },
];

const seedServices = async () => {
  try {
    await connectDB();

    const existingServices = await Service.countDocuments();

    if (existingServices === 0) {
      await Service.insertMany(services);
      console.log("Services seeded successfully");
    } else {
      console.log("Services already exist");
    }

    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
      );

      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });

      console.log("Admin created successfully");
    } else {
      console.log("Admin already exists");
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedServices();