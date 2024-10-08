import mongoose from "mongoose";

const tagModel = mongoose.model('Tag',{
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    }
});

export default tagModel;