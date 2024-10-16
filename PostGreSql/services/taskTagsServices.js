import TaskTagsRepository from "../repository/TaskTagsRepository.js";
import TaskTags from "../entity/task_tags.js";

class TaskTagsServices{
    TaskTagsRepository;
    constructor(){
        this.TaskTagsRepository = new TaskTagsRepository();
    }

    async createTaskTags(taskID,tagID){
        if(!taskID || !tagID){
            console.log('Task and tag id are required to use this function!');
        }else{

            try{
                const newTaskTagIds = new TaskTags(taskID,tagID);
                await this.TaskTagsRepository.create(newTaskTagIds);
            }catch(error){
                console.log(`Error : ${error.message}`);
            }

        }
    }

   
}



export default TaskTagsServices;