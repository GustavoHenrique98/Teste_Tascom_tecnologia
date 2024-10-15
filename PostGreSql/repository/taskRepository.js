//Entitity
import Tasks from "../entity/tasks.js";
//Conection with the database PostGreSql
import conection from "../database/database.js";


class TaskRepository{
    async create(task){
        try{
            const results = await conection.query('INSERT INTO Tasks (title,status,priority,description,user_id) VALUES($1 , $2 ,$3 ,$4 , $5)',
            [task.title ,task.status ,task.priority ,task.description ,task.user_id]);
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }

    async list(){
        try{
            const results = await conection.query('SELECT * FROM Tasks');
            return results.rows;
        }catch(error){
            console.log(error);
        }
    }
    async read(TaskID){
        try{
            const results = await conection.query('SELECT * FROM Tasks WHERE ID = $1',[TaskID]);
            
            const task = results.rows[0];
            if(task === undefined){
                return null;
            }else{
                //Return a new instance of  tasks with the data of PostGreSql;
                return new Tasks(task.title ,task.status ,task.priority ,task.description ,task.user_id, task.id);
            }
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }


    async update(TaskID,task){
        try{
            const results = await conection.query('UPDATE Tasks SET title = $1 , status = $2 , priority = $3 , description = $4 , user_id = $5 WHERE ID = $6',
            [task.title ,task.status ,task.priority ,task.description ,task.user_id , TaskID]);
            
            if(results.rowCount ===0 ){
                return null;
            }else{
                console.log(`Task Updated sucessfull!`);
            }
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }

    async delete(TaskID){
        try{
            const results = await conection.query('DELETE FROM Tasks WHERE ID = $1',[TaskID]);
            if(results.rowCount ===0 ){
                return null;
            }
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }
}



export default TaskRepository;