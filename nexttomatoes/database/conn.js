import mongoose from "mongoose";

const ConnectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb+srv://francois:w4NLgB4r2LMfk4p@showtime.gen4dj7.mongodb.net/Tomatoes?retryWrites=true&w=majority"
    );

    if (connection.readyState == 1) {
      console.log("Database connected");
    }
  } catch (error) {
    return Promise.reject(errors);
  }
};

export default ConnectMongo;
