import Tasks from "../entity/tasks.js";
import TaskRepository from "../repository/taskRepository.js";


class TaskServices{
    TaskRepository;
    constructor(){
        this.TaskRepository = new TaskRepository();
    }

    async createTask(title,status,priority,description,user_id){
        if(!title || !status || !priority || !description || !user_id){
            console.log('Arguments title, status, priority, description and user_id are required to use this function!');
        }else{
            try{
                const newTask = new Tasks(title,status,priority,description,user_id);
                this.TaskRepository.create(newTask);
            }catch(error){
                console.log(`Error:${error}`);
            }

        }

    }

    async listTasks(){
        try{
            const taskList = await this.TaskRepository.list();
            return taskList;
        }catch(error){
            console.log(`Error:${error}`);
        }
    }

    async readTask(TaskID){
        if(!TaskID){
            console.log("Task ID is required to use this function!");
        }else{
            try{
                const task = await this.TaskRepository.read(TaskID);
                if(task === null){
                    return 'Invalid task id!';
                }else{
                    return task;
                }
            }catch(error){
                console.log(`Error:${error}`);
            }
        }

    }
    

    async updateTask(TaskID,task){
        if(!TaskID,!task){
           console.log('Arguments TaskID and task are required to use this function!!');
        }else{
            try{
                const taskUpdated = await this.TaskRepository.update(TaskID,task);
                if(taskUpdated === null){
                    return 'invalid User Id!';
                }else{
                    return taskUpdated;
                }
            }catch(error){  
                console.log(`Error:${error}`);
            }
        }
    }


    async deleteTask(TaskId){
        if(!TaskId){
            console.log("Task ID is required to use this function!");
        }else{
            try{
                const taskDeleted = await this.TaskRepository.delete(TaskId);
                if(taskDeleted === null){
                    return 'Invalid task id';
                }else{
                    taskDeleted;
                }
            }catch(error){
                console.log(`Error:${error}`);
            }
        }
    }
}





export default TaskServices;