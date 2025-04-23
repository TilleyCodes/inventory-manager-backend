const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// mongod://localhost:27017/inventory-manager-backend
const dbName = process.env.npm_package_name;
const mongoURI = process.env.MONGO_URI || `mongodb://localhost:27017/${dbName}`;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(`Connected to MongoDB: ${mongoURI}`);
    } catch (err){
        console.error("MongoDB Connection Error: ", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
