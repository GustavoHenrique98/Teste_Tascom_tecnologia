class Tasks {
    ID;
    title;
    status;
    priority;
    description;
    user_id;
    constructor(title, status, priority, description, user_id , ID = null) {
        this.ID = ID;
        this.title = title;
        this.status = status;
        this.priority = priority;
        this.description = description;
        this.user_id = user_id;
    }
}



export default Tasks;