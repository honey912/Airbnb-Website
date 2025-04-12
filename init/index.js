const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://honey9122836929:sawXOZIWjnWgikkQ@cluster0.xdie2xl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "667c05af54768eb6157f7243" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDB();
