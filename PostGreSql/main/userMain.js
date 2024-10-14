import UserService from "../services/userServices.js";
import Users from "../entity/users.js";

//Users
const userService = new UserService();

//CRIAR UM USUÁRIO.
// userService.createUser('Gustavo','1234');
 
//LIST ALL USERS
// const listUsers =  await userService.listUsers();
// console.log(listUsers);

//LIST A ESPECIFIC USER.
const listUser =  await userService.readUser(1);
console.log(listUser);


//UPDATE A TASK.

// const gustavo =  new Users('Gustavo2','senhaAtualizada');
// userService.updateUser(1,gustavo);

//DELETE A USER.
// userService.deleteUser(1);
