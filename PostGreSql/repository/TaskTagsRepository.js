import TaskTags from "../entity/task_tags.js";
import conection from "../database/database.js";

class TaskTagsRepository{

    async create(TaskTags){
        try{
            const createTaskTag = await conection.query('INSER INTO Task_Tags (task_id,tag_id) VALUES($1 , $2)',
            [TaskTags.task_id , TaskTags.tag_id]);
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }

    async readAllFromUser(userID){
        try{
            const results = await conection.query(`
               SELECT 
                    Users.id AS id_user, 
                    Users.username,
                    Tasks.title, 
                    Tasks.status, 
                    Tasks.priority,
                    Tasks.description, 
                    Tags.name AS tag_name, 
                    Tags.color AS tag_color
                FROM Users
                    INNER JOIN Tasks ON Users.id = Tasks.user_id
                    INNER JOIN Task_Tags ON Tasks.ID = Task_Tags.task_id
                    INNER JOIN Tags ON Task_Tags.tag_id = Tags.ID; 
                WHERE Users.ID = $1`,[userID]);

                const readAllFromUser = results.rows;
                return readAllFromUser;
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }    

    


}


export default TaskTagsRepository;