const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const connectToMongoDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://pnminfotech24:MNOiPoY31y90ZqQA@danaanand.8fn8w.mongodb.net/?retryWrites=true&w=majority&appName=DanaAnand"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

const client = new MongoClient(
  "mongodb+srv://pnminfotech24:MNOiPoY31y90ZqQA@danaanand.8fn8w.mongodb.net/?retryWrites=true&w=majority&appName=DanaAnand"
);

module.exports = { connectToMongoDB, client };

