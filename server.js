//Dependencias
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

//Check if API IS AVAILABLE.
const API_AVAILABLE = false;
const app = express();
//Middlewares
app.use(cors());
app.use(morgan('URL: :url | Método: :method'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req,res,next)=>{
    if(API_AVAILABLE){
        next();
    }else{;
        res.status(500).send('<h1>Sorry API in maintenance!</h1>');
    }
});

//Routes Imports
// import
app.get('/',(req,res)=>{
    res.send('Hello this is the main page!');
})

app.listen(3000,(req,res)=>{
    console.log(`Server is running in http://localhost:3000`);
});