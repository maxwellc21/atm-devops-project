const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB Atlas for Auth seeding");

    await User.deleteMany({});

    await User.create({
      username: "student1",
      pin: "1234",
      accountNumber: "ACC001"
    });

    console.log("✅ Auth users seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to seed auth users:", error.message);
    process.exit(1);
  }
};

seedUsers();