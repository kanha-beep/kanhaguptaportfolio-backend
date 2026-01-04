import mongoose from 'mongoose';
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // const hash = await bcrypt.hash("password", 10)
    // const user = await User.create({ name: "kanha", email: "kanhashree2223@gmail.com", password:hash, roles: "admin" })
    console.log('MongoDB connected ✅: ');
  } catch (error) {
    console.error('MongoDB connection failed ❌', error);
    process.exit(1);
  }
};
