import mongoose from "mongoose";

const mongoConnection = async () => {
  const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/ft-db";
  console.log(mongoUrl);

  await mongoose.connect(mongoUrl);
};

export default mongoConnection;
