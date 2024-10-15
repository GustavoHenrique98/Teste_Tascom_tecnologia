import express from "express";
import TaskServices from "../services/taskServices.js";
const Router = express.Router();

const taskServices = new TaskServices();


Router.post('/insert' , async (req,res)=>{
    const post__data = req.body;
    const{ title,status,priority,description,user_id } = post__data;

    if(Object.keys(post__data).length ===0){
        res.status(422).send('Error: The request body is empty!');
        return;
    }

    if(!title || !status || !priority || !description || !user_id){
        res.status(422).send('Error: Incomplete data!');
        return;
    }

    taskServices.createTask(title,status,priority,description,user_id);
    res.send('Task created sucessfull!!');
});

Router.get('/list',async(req,res)=>{
    try{
        const results = await taskServices.listTasks();
        res.send(results);
    }catch(error){
        res.send(`Error : ${error.message}`);
    }
})


Router.get('/list/:taskID',async(req,res)=>{
    const taskID = req.params.taskID;
    try{
        const results = await taskServices.readTask(taskID);
        if(results === null){
            res.status(404).send('Invalid Task ID!');
            return;
        }
        res.send(results);
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
});


Router.put('/update/:userID', async(req,res)=>{
    const taskID = req.params.userID;
    const update__data = req.body;
    const {title,status,priority,description,user_id} = update__data;

    if(Object.keys(update__data).length ===0){
        res.status(422).send('Error: The request body is empty!');
        return;
    }

    try{
        const task = await taskServices.readTask(taskID);

        if(task === null){
            res.status(404).send('Invalid task ID');
            return;
        }else{
            const taskUpdated = {...task};
            if(title){
                taskUpdated.title = title;
            }

            if(status){
                taskUpdated.status = status;
            }
            
            if(priority){
                taskUpdated.priority = priority;
            }

            if(description){
                taskUpdated.description = description;
            }

            if(user_id){
                taskUpdated.user_id = user_id;
            }
            await taskServices.updateTask(taskID,taskUpdated);

            res.send('Task updated sucessful!');
        }

    }catch(error){
        res.status(500).send(`Error : ${error.message}`)
    }


    
});

Router.delete('/delete/:taskID', async (req,res)=>{
    const taskID = req.params.taskID;
    try{
        const results = await taskServices.deleteTask(taskID);
        if(results === null){
            res.status(404).send('Task not found! ');
            return;
        }
        
        res.send('Task deleted sucessfull!');
    }catch(error){
        res.send(`Erro : ${error.message}`);
    }
});


export default Router;