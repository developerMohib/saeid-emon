import mongoose from 'mongoose';
import { config } from '../config';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.dbUri as string);
    console.log(`MongoDB Connected Successfully in : ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;