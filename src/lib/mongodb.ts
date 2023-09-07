import * as mongoose from 'mongoose';

const mongodbUri: string = process.env.NEXT_PUBLIC_MONGODB_URI!;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongodbUri);

    console.log('Connect to Md');
  } catch (error) {
    console.log('Error Connect to Md', error);
  }
}
