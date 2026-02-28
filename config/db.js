import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log('connected to mongoDB');
        })
       await mongoose.connect(`${process.env.MONGO_URI}/asdb`) 
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;