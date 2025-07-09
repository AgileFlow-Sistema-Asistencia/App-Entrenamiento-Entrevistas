import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('👌 MONGODB Connected!');
    } catch (error) {
        console.error('👿 MONGODB Connection failed', error);
        process.exit(1);
    }
}