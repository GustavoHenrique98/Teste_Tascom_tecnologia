//Entitity
import Users from "../entity/users.js";
//Conection with the database PostGreSql
import conection from "../database/database.js";


class UserRepository{
    async create(user){
        try{
            const results = await conection.query('INSERT INTO Users (username,password) VALUES($1 , $2)',
            [user.username ,user.password]);
            console.log(results)
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

    async update(userID,user){
        try{
            const results = await conection.query('UPDATE Users SET username = $1 , password = $2 WHERE ID = $3',
            [user.username , user.password , userID]);
            if(results.rowCount ===0 ){
                return null;
            }else{
                console.log(`Usuário atualizado com sucesso!`);
            }
        }catch(error){
            console.log(error);
        }
    }

    async delete(userID){
        try{
            const results = await conection.query('DELETE FROM Users WHERE ID = $1',[userID]);
            if(results.rowCount ===0 ){
                return null;
            }else{
                console.log("Usuário deletado com sucesso!");
            }
        }catch(error){
            console.log(error);
        }
    }
}



export default UserRepository;