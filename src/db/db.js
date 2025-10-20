import mongoose from "mongoose"
const dbConnect = async () => {
  try {
    const mongoConnect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // optional: stop app if DB fails
  }
};

export default dbConnect;

// connection successful 