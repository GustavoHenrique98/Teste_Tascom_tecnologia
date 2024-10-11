class Users{
    ID;
    username;
    password;
    id_task;
    constructor(username,password,id_task, ID = null){
        this.ID = null;
        this.username = username;
        this.password = password;
        this.id_task = id_task;
    }
}



export default Users;