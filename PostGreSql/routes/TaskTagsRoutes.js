import express from 'express';
import TaskTagsServices from "../services/taskTagsServices.js";

const Router= express.Router();
const taskTagsServices = new TaskTagsServices();

Router.post('/insert', async(req,res)=>{
    const post__data = req.body;
    const {taskID , tagID } = post__data;


    if(Object.keys(post__data).length ===0){
        res.status(422).send('Error : the requisition body is empty');
        return;
    }

    if(!taskID || !tagID){
        res.status(422).send('Error : incomplete data');
        return;
    }

    await taskTagsServices.createTaskTags(taskID,tagID);

    res.send('Tasks and tags associated succesfully!');
});


export default Router;