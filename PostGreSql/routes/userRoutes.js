import express from 'express';
//User services.
import UserService from '../services/userServices.js';
//New instace of UserService
const userServices = new UserService();

const Router = express.Router();

//Create new User;
Router.post('/insert', async(req,res)=>{
    const post__data = req.body;
    const{ username,password} = post__data;

    if(Object.keys(post__data).length ===0){
        res.status(422).send('Error: The request body is empty!');
        return;
    }

    if(!username || !password){
        res.status(422).send('Error: Incomplete data!');
        return;
    }

    userServices.createUser(username,password);
    res.send('User created sucessfull!!');
});

Router.post('/authUser', async(req,res)=>{
    const post__data = req.body;
    const{ username,password} = post__data;

    if(Object.keys(post__data).length ===0){
        res.status(422).send('Error: The request body is empty!');
        return;
    }

    if(!username || !password){
        res.status(422).send('Error: Incomplete data!');
        return;
    }

    const users = await userServices.listUsers();
    let validUser = false;

    for(let i=0; i<users.length;i++){
        if(username === users[i].username && password === users[i].password){
            res.send(`Welcome ${users[i].username}`);
            validUser = true;
            break;
        }
    }
    if(validUser === false){
        res.status(404).send('Incorrect email or password, Please enter your password correctly.');
    }
});


Router.get('/list',async(req,res)=>{
    try{
        const results = await userServices.listUsers();
        res.send(results);
    }catch(error){
        res.send(`Error : ${error.message}`);
    }
})


Router.get('/list/:userID',async(req,res)=>{
    const userID = req.params.userID;
    try{
        const results = await userServices.readUser(userID);
        if(results === null){
            res.status(404).send('Invalid user ID!');
            return;
        }
        res.send(results);
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
});

Router.get('/info-user/:userID',async(req,res)=>{
    const userID = req.params.userID;
    try{
        const results = await userServices.readTaskTagsFromUser(userID);
        if(results === null){
            res.status(404).send('No tasks or tags found for this user.');
            return;
        }
        res.send(results);
    }catch(error){
        res.status(500).send(`Error : ${error}`)
    }
});


Router.put('/update/:userID', async(req,res)=>{
    const userID = req.params.userID;
    const update__data = req.body;
    const {username,password} = update__data;

    if(Object.keys(update__data).length ===0){
        res.status(422).send('Error: The request body is empty!');
        return;
    }

    try{
        const user = await userServices.readUser(userID);

        if(user === null){
            res.status(404).send('Invalid user ID');
            return;
        }else{
            const userUpdated = {...user};
            if(username){
                userUpdated.username = username;
            }

            if(password){
                userUpdated.password = password;
            }

            await userServices.updateUser(userID,userUpdated);

            res.send('User updated sucessful!');
        }

    }catch(error){
        res.status(500).send(`Error : ${error}`)
    }


    
});

Router.delete('/delete/:userID', async (req,res)=>{
    const userID = req.params.userID;
    try{
        const results = await userServices.deleteUser(userID);
        if(results === null){
            res.status(404).send('User not found! ');
            return;
        }
        res.send('User deleted sucessful!!');
    }catch(error){
        res.send(`Erro : ${error}`);
    }
})




export default Router;