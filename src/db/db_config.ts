import mongoose from 'mongoose';

const startDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1893ygu.mongodb.net/`);
    console.log('db started');
  } catch (e) {
    throw new Error(e.message);
  }
};

export default startDB;