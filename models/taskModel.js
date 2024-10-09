import mongoose from "mongoose";

const taskModel = mongoose.model('Task',{
    title:{
        type:String,
        required:true
    },
    status: {
        type: String,
        required: true,
        enum: ['Em andamento', 'Finalizado']
    },
    priority:{
        type:Number,
        min:1,
        max:10,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:[{
        type:mongoose.Schema.ObjectId,
        ref:'Tag',
        required:true,
        default:[]
    }]

});

export default taskModel;