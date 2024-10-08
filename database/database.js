import mongoose from "mongoose";

const conection = 'mongodb://127.0.0.1:27017/Taskdatabase';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(conection);
        console.log('Connection to MongoDb successful');
    } catch (error) {
        console.error('Error!:', error);
    }
};




export default connectToDatabase;