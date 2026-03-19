require("dotenv").config();
const mongoose = require("mongoose");

const attemptConnection = async () => {
  try {
    const mongourl = process.env.MONGO_URL;
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongourl);
    console.log("Mongo db is connected");
  } catch (error) {
    console.log("mongo getting error while connecting");
  }
};
module.exports = attemptConnection;
