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

    async readTaskTagsFromUser(userID){
        if(!userID){
            console.log('User ID is required to use this function!');
        }else{
            try{
                const all_infoFromUsers = await this.UserRepository.readAllFromUser(userID);
                return all_infoFromUsers;
            }catch(error){
                console.log(`ERROR : ${error}`);
            }
        }
    }

    async readUser(userID) {
        if(!userID){
            console.log('User ID is required to use this function!');    
        }else{
            try {
                const user = await this.UserRepository.read(userID);                
                return user;     
            } catch (error) {
                console.log(`ERROR : ${error}`);
            }
        }
    }

    async updateUser(userID,user){
        if(!userID || !user){
            console.log("The user ID and user arguments are required to use this function!!");
        }else{
            try{
                const userUpdated = await this.UserRepository.update(userID,user);
                return userUpdated;
            }catch(error){
                console.log(`ERROR : ${error}`);
            }
        }

    }

    async deleteUser(userID){
        if(!userID){
            console.log("User ID is required to use this function!");
        }else{
            try{
                const userDeleted = await this.UserRepository.delete(userID);
                return userDeleted;
            }catch(error){
                console.log(`ERROR : ${error}`);
            }
        }
    }
}





export default UserService;