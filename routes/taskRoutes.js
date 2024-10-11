    import express from "express";
    import taskModel from "../models/taskModel.js";
    import tagModel from '../models/tagModel.js';

    const Router = express.Router();

    //Create Task
    Router.post('/insert',async (req,res)=>{
        const post__data = req.body;
        const {title,status, priority,description} = post__data;

        //Check if the data is complete.
        if(!title || !status || !priority || !description ){
            res.status(422).send('Error : incompleted data!');
            return;
        }
        const task = new taskModel({
            title:title,
            status:status,
            priority:priority,
            description:description,
        });

        try {
            await task.save();
            res.send(task);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });

    //Filter tasks by tag ID's
    Router.post('/filter', async(req,res)=>{
        const post__data = req.body;
        const {tagIds} = post__data;

        if (!tagIds || !Array.isArray(tagIds) || tagIds.length === 0) {
            res.status(400).send('Error: You must provide a list of tag IDs!');
            return;
        }
        
        try{
            const tasks = await taskModel.find({ tag: { $in: tagIds } }).populate('tag');
            if (tasks.length === 0) {
                res.status(404).send('No tasks found for the given tags.');
                return;
            }
            
            res.send(tasks);

        }catch(error){
            res.status(500).send(`Error: ${error.message}`);
        }
    });


    //Read all Tasks
    Router.get('/list',async (req,res)=>{
        try{
            const taskList = await taskModel.find().populate('tag');
            res.send(taskList);
        }catch(error){
            res.status(500).send(`Error : ${error.message}`);
        }
    });

    //Read a task 
    Router.get('/list/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        const listById = await taskModel.findById(id)
            if(!listById){
                res.status(404).send(`Error : Invalid Task id!`);
                return;
            }
            res.send(listById);
    }catch(error){
            res.status(500).send(`Error : ${error.message}`);
    }
    });



    //Update a task
    Router.put('/update/:id',async (req,res)=>{
        const id = req.params.id;
        const update__data = req.body;
        const {title,status, priority,description,tag} = update__data;

        try{
            const taskUpdate = await taskModel.findByIdAndUpdate(id,{
                title:title,
                status:status,
                priority:priority,
                description:description,
                tag:tag

            }, {new:true} );

            if(!taskUpdate){
                res.status(404).send(`Error : Invalid Task id!`);
                return;
            }
            
            res.send(taskUpdate);
            
        }catch(error){
            res.status(500).send(`Error : ${error.message}`);
        }
    });



    //Associate a tag with a task.
    Router.put('/associate/:id', async (req, res) => {
        const taskId = req.params.id;
        const update__data = req.body;
        const {tagIds} = update__data;

        // Check if tagIds is not provided, not an array, or is an empty array.
        if (!tagIds || !Array.isArray(tagIds) || tagIds.length === 0) {
            return res.status(400).send('Error: You must provide a list of tag IDs!');
        }
        
        try {
            
            const validTags = await tagModel.find({ _id: { $in: tagIds } });
            
            
            if (validTags.length !== tagIds.length) {
                return res.status(400).send('Error: Some tags are invalid!');
            }

            const taskUpdate = await taskModel.findByIdAndUpdate(taskId, 
                { $addToSet: { tag: tagIds } },
                { new: true }
            );

            if (!taskUpdate) {
                res.status(404).send('Error: task not found!');
                return;
            }

            res.send(taskUpdate);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });

    //Remove a tag from a task;
    Router.put('/remove-tags/:id', async (req, res) => {
        const taskId = req.params.id; 
        const { tagIds } = req.body; 

        // Check if tagIds is not provided, not an array, or is an empty array.
        if (!tagIds || !Array.isArray(tagIds) || tagIds.length === 0) {
            res.status(400).send('Error: You must provide a list of tag IDs to remove!');
            return;
        }

        try {
            
            const updatedTask = await taskModel.findByIdAndUpdate(
                taskId,
                { $pull: { tag: { $in: tagIds } } },  
                { new: true }  
            ).populate('tag'); 

            if (!updatedTask) {
                return res.status(404).send('Error: Task not found!');
            }

            res.send(updatedTask);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });

    //Delete a task
    Router.delete('/delete/:id', async (req,res)=>{
        const taskId = req.params.id;
        try{
            const taskDelete = await taskModel.findByIdAndDelete(taskId)
            if(!taskDelete){
                res.status(404).send('ERROR! Invalid Task Id !');
                return;
            }
            res.send('Task deleted succesfull!');
        }catch(error){
            res.status(500).send(`Error : ${error.message}`);
        }
    });



    export default Router;