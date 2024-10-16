import TaskTags from "../entity/task_tags.js";
import conection from "../database/database.js";

class TaskTagsRepository{

    async create(TaskTags){
        try{
            const createTaskTag = await conection.query('INSERT INTO Task_Tags (task_id,tag_id) VALUES($1 , $2)',
            [TaskTags.task_id , TaskTags.tag_id]);
        }catch(error){
            console.log(`Error : ${error}`);
        }
    }


    async read(taskID,tagID){
        try{
            const results = await conection.query('SELECT * FROM Tasks_Tags WHERE task_id = $1 AND tag_id = $2',[taskID,tagID]);
            const resultsTask = results.rows[0];
            if(resultsTask === undefined ){
                return null;
            }else{
                return new TaskTags(resultsTask.task_id,resultsTask.tag_id);
            }
        }catch(error){
            console.log(`Error : ${error}`);
        }
    }   


}


export default TaskTagsRepository;