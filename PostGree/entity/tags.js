class Tags{
    ID;
    name;
    color;
    id_task;
    constructor(name,color,id_task,ID = null){
        this.ID = ID;
        this.name = name;
        this.color = color;
        this.id_task = id_task;
    }
}



export default Tags;