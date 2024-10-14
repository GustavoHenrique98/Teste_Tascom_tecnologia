import userModel from '../models/userModel.js';
import taskModel from '../models/taskModel.js';
import express from 'express';
const Router = express.Router();

//Create new User;
Router.post('/insert' , async(req,res)=>{
    const post__data = req.body;
    const {username , password} = post__data;

    if(!username || !password){
        res.status(422).send(" Error! incomplete data!");
    }
    const user = new userModel({
        username:username,
        password:password
    });

    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Route to authenticate user.
Router.post('/auth-user', async(req,res)=>{
    const post__data =  req.body;
    const {username , password} = post__data;

    try{
        const users = await userModel.find();
        console.log(users)
        let userFound = false;
        for (let i = 0 ; i<users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                userFound = true;
                res.send(`Welcome ${users[i].username} !`);
                break;
            }
        }

        if (userFound === false) {
            res.status(404).send('Username or password is incorrect!!');
        }
    }catch(error){
        res.status(500).send(`Error: ${error.message}`);
    }
});


//List all users.
Router.get('/list',async(req,res)=>{
    try{
        const listUsers = await userModel.find().populate('task');
        res.send(listUsers);
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
});


//List tasks of a especif user by Id.
Router.get('/list/:id', async(req,res)=>{
    const userId = req.params.id;
    try{
        const listUserById = await userModel.findById(userId).populate({
            path: 'task',
            populate: { path: 'tag' }
        });

        if (!listUserById) {
            res.status(404).send(`Error: User not found!`);
            return;
        }

        res.send(listUserById);
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);  
    }
});

//Update a user.
Router.put('/update/:id',async (req,res)=>{
    const userId = req.params.id;
    const update__data = req.body;
    const {username,password} = update__data;

    try{
        const userUpdate = await userModel.findByIdAndUpdate(userId,{
            username:username,
            password:password
        }, {new:true} );

        if(!userUpdate){
            res.status(404).send(`Error : Invalid user id!`);
            return;
        }
        
        res.send(userUpdate);
        
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
});

//Associate a user with a task;
Router.put('/associate/:id',async(req,res)=>{
    const userId = req.params.id;
    const update__data = req.body;
    const {taskIds} = update__data;

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
        return res.status(400).send('Error: You must provide a list of task IDs to associate!');
    }

    try{
        const validTask = await taskModel.find({ _id: { $in: taskIds } });
         
        if (validTask.length !== taskIds.length) {
            return res.status(400).send('Error: Some task are invalid!');
        }

        const userTaskUpdate = await userModel.findByIdAndUpdate(userId, 
            { $addToSet: { task: taskIds } },
            { new: true }
        ).populate({
            path: 'task',
            populate: { path: 'tag' }
        });

        if (!userTaskUpdate) {
             res.status(404).send('Error: user not found!');
             return;
        }

        res.send(userTaskUpdate);
    }catch(error){
        res.status(500).send(`Error: ${error.message}`);
    }
});

// remove tasks from a user.
Router.put('/remove-user-task/:id', async (req, res) => {
    const userId = req.params.id; 
    const { taskIds } = req.body; 

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
        res.status(400).send('Error: You must provide a list of task IDs to remove!');
        return;
    }

    try{

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $pull: { task: { $in: taskIds } } },
            { new: true }  
        ).populate('task'); 

        
        if (!updatedUser) {
            return res.status(404).send('Error: User not found!');
        }
        res.send(updatedUser);
    }catch(error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});



//Delete a user by id.
Router.delete('/delete/:id',async(req,res)=>{
    const userId = req.params.id;

    try{
        const userDelete = await userModel.findByIdAndDelete(userId);
        if(!userDelete){
            res.status(404).send('Error! Invalid user id !');
            return;
        }
        res.send('User deleted succesfull!');

    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
});



export default Router;