import Users from "../entity/users.js";
import UserRepository from "../repository/userRepository.js";

class UserService{
    UserRepository;
    constructor(){
        this.UserRepository = new UserRepository();
    }

    async createUser(username,password){
        if(!username || !password){
            console.log('Arguments username and password are required to use this function!');
        }else{
            try{
                const newUser = new Users (username,password);
                const results = await this.UserRepository.create(newUser);
            }catch(error){
                console.log(`ERROR : ${error}`);
            }
        }
    }

    async listUsers() {
        try {
            const usersList = await this.UserRepository.list();
            return usersList;      
        } catch (error) {
            console.log(`ERROR : ${error}`);
        }
    }

    async readUser(userID) {
        try {
            const user = await this.UserRepository.read(userID);
            if(user === null){
                return "Invalid user ID!"
                
            }
            return user;     
        } catch (error) {
            console.log(`ERROR : ${error}`);
        }
    }

    async updateUser(userID,user){
        if(!userID || !user){
            console.log("Arguments userID and user are required to use this function!");
        }else{
            try{
                const userUpdated = await this.UserRepository.update(userID,user);
                if(userUpdated === null){
                    return 'Invalid user ID';
                }else{
                    return userUpdated;
                }
            }catch(error){
                console.log(`ERROR : ${error}`);
            }
        }

    }

    async deleteUser(userID){
        if(!userID){
            console.log("Argument userID are required to use this function!");
        }else{
            try{
                const userDeleted = await this.UserRepository.delete(userID);
                if(userDeleted === null){
                    return 'Invalid user ID!';
                }else{
                    return userDeleted;
                }
            }catch(error){
                console.log(`ERROR : ${error}`);
            }
        }
    }
}





export default UserService;