//Entitity
import Users from "../entity/users.js";
//Conection with the database PostGreSql
import conection from "../database/database.js";


class UserRepository{
    async create(user){
        try{
            const results = await conection.query('INSERT INTO Users (username,password) VALUES($1 , $2)',
            [user.username ,user.password]);
        }catch(error){
            console.log(`ERROR : ${error.message}`);
        }
    }
    
    async list(){
        try{
            const results = await conection.query('SELECT * FROM Users');
            return results.rows;
        }catch(error){
            console.log(error);
        }
    }
    async read(userID){
        try{
            const results = await conection.query('SELECT * FROM Users WHERE ID = $1',[userID]);
           
            const user = results.rows[0];
            if(user === undefined){
                return null;
            }else{
                //Return a new instance of  users with the data of PostGreSql;
                return new Users(user.username , user.password , user.id);
            }
        }catch(error){
            console.log('respository',error);
        }
    }
    //List all tasks and tags associated with a user.
    async readAllFromUser(userID){
        try{
            const results = await conection.query(`
               SELECT 
                    Users.ID AS id_user, 
                    Users.username,
                    Tasks.title, 
                    Tasks.status, 
                    Tasks.priority,
                    Tasks.description, 
                    Tags.name AS tag_name, 
                    Tags.color AS tag_color
                FROM Users
                    INNER JOIN Tasks ON Users.ID = Tasks.user_id
                    INNER JOIN Task_Tags ON Tasks.ID = Task_Tags.task_id
                    INNER JOIN Tags ON Task_Tags.tag_id = Tags.ID
                WHERE Users.ID = $1`,[userID]);

                const readAllFromUser = results.rows;
                if(readAllFromUser.length ===0){
                    return null;
                }

                return readAllFromUser;
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    } 

    async update(userID,user){
        try{
            const results = await conection.query('UPDATE Users SET username = $1 , password = $2 WHERE ID = $3',
            [user.username , user.password , userID]);
            
            if(results.rowCount === 0 ){
                return null;
            }
        }catch(error){
            console.log(error);
        }
    }

    async delete(userID){
        try{
            const results = await conection.query('DELETE FROM Users WHERE ID = $1',[userID]);
           
            if(results.rowCount === 0 ){
                return null;
            }
        }catch(error){
            console.log(error);
        }
    }
}



export default UserRepository;