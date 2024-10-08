import express from "express";
import tagModel from "../models/tagModel.js";

const Router = express.Router();

//Create Tag
Router.post('/insert',async (req,res)=>{
    const post__data = req.body
    const {name,color} = post__data;

    //Check if the data is complete.
    if(!name || !color){
        res.status(422).send('Error : incompleted data!');
        return;
    }

    const createTag = new tagModel({
        name:name,
        color:color
    });

    await createTag.save();
    res.send(createTag);
})

//Read all Tags
Router.get('/search',async (req,res)=>{
    try{
        const tagList = await tagModel.find()
        res.send(tagList);
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
})

//Read a Tag
Router.get('/search/:id',async (req,res)=>{
    const id = req.params.id;
   try{
       const listById = await tagModel.findById(id)
        
       if(!listById){
            res.status(404).send(`Error : Invalid Tag id!`);
            return;
        }
        res.send(listById);
   }catch(error){
        res.status(500).send(`Error : ${error.message}`);
   }
});




//Update a Tag
Router.put('/update/:id',async (req,res)=>{
    const id = req.params.id;
    const update__data = req.body;
    const {name,color} = update__data;

    //Check if the data is complete.
    if(!name || !color){
        res.status(422).send('Error : incompleted data!');
        return;
    }
    try{
        const updateTag = await tagModel.findByIdAndUpdate(id,{
            name:name,
            color:color
        });
        if(!updateTag){
            res.status(404).send(`Error : Invalid Tag id!`);
            return;
        }
        
        res.send(updateTag);
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
});


//Delete a Tag
Router.delete('/delete/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        const tagDelete = await tagModel.findByIdAndDelete(id)
        if(!tagDelete){
            res.status(404).send('ERROR! Invalid Tag Id !');
            return;
        }
        res.send('Tag deleted succesfull!');
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
});

export default Router;