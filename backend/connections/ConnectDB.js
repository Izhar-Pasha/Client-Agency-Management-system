import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Client&Agency",
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Failed to connect:", err));
};

export default dbConnection;
