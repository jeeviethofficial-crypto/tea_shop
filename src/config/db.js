import mongoose from 'mongoose';
import config from './env.js';

/**
 * Connect to MongoDB with resilient connection handling
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      autoIndex: true
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error(`[Database Error] Mongoose runtime error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database] Mongoose disconnected from MongoDB');
    });

    return conn;
  } catch (error) {
    console.error(`[Database Error] MongoDB connection failure: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB gracefully
 */
export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('[Database] MongoDB connection closed');
  } catch (error) {
    console.error(`[Database Error] Error during disconnection: ${error.message}`);
  }
};

export default connectDB;
