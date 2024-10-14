class Users{
    ID;
    username;
    password;
    constructor(username,password,ID = null){
        this.username = username;
        this.password = password;
        this.ID = ID;
    }
}



export default Users;