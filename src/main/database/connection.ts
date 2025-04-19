import mongoose from 'mongoose';

const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_BASE_URL = process.env.MONGODB_BASE_URL || 'localhost';
const MONGODB_USERNAME = process.env.MONGODB_USERNAME || 'root';
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'rootpassword';

const MONGODB_URL = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_BASE_URL}:${MONGODB_PORT}/electrongpt?authSource=admin`;

const openDatabaseConnection = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB connection established');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

const closeDatabaseConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    } catch (err) {
        console.error('MongoDB disconnection error:', err);
        throw err;
    }
}

const db = mongoose.connection;

export {
    openDatabaseConnection,
    closeDatabaseConnection,
    db
}



