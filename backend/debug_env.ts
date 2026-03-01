import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI starts with:", process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 10) : "undefined");
console.log("MONGO_URI length:", process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);
