import mongoose from "mongoose";

type connectionObj = {
  isConnected?: number;
};

const connectionObj: connectionObj = {};

const connectDb = async () => {
  if (connectionObj.isConnected) {
    console.log("Database is already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE_URI || "");
    connectionObj.isConnected = db.connections[0].readyState;
    console.log("Database connection successfull");
  } catch (error) {
    console.log("Database connection failed : ", error);
  }
};

export default connectDb;
