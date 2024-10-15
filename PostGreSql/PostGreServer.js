//Dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { checkConnection } from './database/database.js';

const app = express();

//Middlewares
app.use(cors());
app.use(morgan('URL: :url | Método: :method'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Check if API IS AVAILABLE.
const API_AVAILABLE = true;
app.use((req,res,next)=>{
    if(API_AVAILABLE){
        next();
    }else{;
        res.status(503).send('<h1> Sorry API in maintenance! </h1>');
    }
});

//Check conection with PostGreSql
await checkConnection();

// Route imports
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
//Routes
app.use('/api/users' ,userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/tags', tagRoutes);

app.use((req,res)=>{
    res.status(404).send('<h1> 404 not found </h1>');
});

app.listen(3001,()=>{
    console.log(`Server is running in http://localhost:3001`);
}); 