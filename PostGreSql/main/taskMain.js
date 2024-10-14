import TaskServices from "../services/taskServices.js";
import Tasks from "../entity/tasks.js";

//Users

//CREATE A NEW TASK.
const taskService = new TaskServices();
// taskService.createTask('Estudar back-end','Em andamento',1,'Estudar back-end pra ficar maneiro',1);
 
//LIST ALL TASKS
// const listTasks =  await taskService.listTasks();
// console.log(listTasks);

//LIST A ESPECIFIC TASK.
const listTask =  await taskService.readTask(1);
console.log(listTask)


//UPDATE A TASK.

// const taskUpdate =  new Tasks('Estudar back-end e nodeJs','Finalizado',1,'Estudar back-end pra ficar maneiro',1);
// taskService.updateTask(1,taskUpdate);

//DELETE A TASK.
// taskService.deleteTask(1);
