import mongoose from "mongoose";

const userModel = mongoose.model('User',{
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    task:[{
        type:mongoose.Schema.ObjectId,
        ref:'Task',
        required:true,
        default:[]
    }]
});

export default userModel;