import mongoose from 'mongoose';

const gallarySchema = new mongoose.Schema(
    {
    title: {type: String,required: true},
    description: {type: String,required:true},
    category:{type: String,required:true},
    image:{type: String,required:true},
    isPublished:{type: Boolean,required:true},
    },{timestamps: true}
)       

const Gallary = mongoose.model('gallary',gallarySchema)

export default Gallary;