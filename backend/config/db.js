import mongoose from 'mongoose';
import Organization from '../models/Organization.model.js';
import { log, logError } from '../utils/logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    log('DB', `Connected to MongoDB at ${conn.connection.host}`);

    await Organization.collection.createIndex({ location: '2dsphere' });
    log('GEO', '2dsphere index ensured for organizations.');
  } catch (error) {
    logError('DB', error);
    process.exit(1);
  }
};

export default connectDB;
