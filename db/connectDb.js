import mongoose from "mongoose";
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  export default connectDB;
// import mongoose from "mongoose";