import express from "express";
import taskModel from "../models/taskModel.js";

const Router = express.Router();

//Create Task
Router.post('/insert',async (req,res)=>{
    const post__data = req.body
    const {title,status, priority,description,tag} = post__data;

    //Check if the data is complete.
    if(!title || !status || !priority || !description || !tag){
        res.status(422).send('Error : incompleted data!');
        return;
    }
    const task = new taskModel({
        title:title,
        status:status,
        priority:priority,
        description:description,
        tag:tag
    });

    await task.save();
    res.send(task);
})

//Read all Tasks
Router.get('/list',async (req,res)=>{
    try{
        const taskList = await taskModel.find()
        res.send(taskList);
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
})

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
})

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


//Delete a task
Router.delete('/delete/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        const taskDelete = await taskModel.findByIdAndDelete(id)
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