import express from "express";
import TagService from "../services/tagServices.js";
const Router = express.Router();

const tagServices = new TagService();


Router.post('/insert' , async (req,res)=>{
    const post__data = req.body;
    const{ name,color} = post__data;

    if(Object.keys(post__data).length ===0){
        res.status(422).send('Error: The request body is empty!');
        return;
    }

    if(!name || !color){
        res.status(422).send('Error: Incomplete data!');
        return;
    }

    tagServices.createTag(name,color);
    res.send('Tag created sucessfull!!');
});

Router.get('/list',async(req,res)=>{
    try{
        const results = await tagServices.listTags();
        res.send(results);
    }catch(error){
        res.send(`Error : ${error.message}`);
    }
})


Router.get('/list/:tagID',async(req,res)=>{
    const tagID = req.params.tagID;
    try{
        const results = await tagServices.readTag(tagID);
        if(results === null){
            res.status(404).send('Invalid Tag ID!');
            return;
        }
        res.send(results);
    }catch(error){
        res.status(500).send(`Error : ${error.message}`);
    }
});


Router.put('/update/:tagID', async(req,res)=>{
    const tagID = req.params.tagID;
    const update__data = req.body;
    const {name,color} = update__data;

    if(Object.keys(update__data).length ===0){
        res.status(422).send('Error: The request body is empty!');
        return;
    }

    try{
        const tag = await tagServices.readTag(tagID);

        if(tag === null){
            res.status(404).send('Invalid tag ID!');
            return;
        }else{
            const tagUpdated = {...tag};
            if(name){
                tagUpdated.name = name;
            }

            if(color){
                tagUpdated.color = color;
            }
           
            await tagServices.updateTag(tagID,tagUpdated);

            res.send('Tag updated successfully!');
        }

    }catch(error){
        res.status(500).send(`Error : ${error.message}`)
    }

});

Router.delete('/delete/:tagID', async (req,res)=>{
    const tagID = req.params.tagID;
    try{
        const results = await tagServices.deleteTag(tagID);
        if(results === null){
            res.status(404).send('Tag not found!');
            return;
        }
        res.send('Tag deleted successfully!')
    }catch(error){
        res.send(`Erro : ${error.message}`);
    }
});


export default Router;