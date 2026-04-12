if(process.env.NODE_ENV != "production") {
    require('dotenv').config({path: "../.env"})
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/stayhub";
const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to database");
    return initDB();
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "69dbd993262920570d9594c0"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}
