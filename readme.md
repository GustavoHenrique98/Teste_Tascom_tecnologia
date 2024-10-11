# Teste técnico - Tascom 📜
Seja bem vindo ao meu exercício, abaixo está a lista de urls para você testar as requisições.

# Requisições para Task
### Get
1- Listar todas as tasks :
http://localhost:3000/api/tasks/list

2- Listar uma task específica : http://localhost:3000/api/tasks/list/:id

### Post
1- Cadastrar uma nova task :
http://localhost:3000/api/tasks/insert

{
  "title":" " ,
  "status":" " ,
  "priority":1 ,
  "description":" "
}

2- Filtra todas as tarefas associadas a um ou mais IDs de tags passados no corpo da requisição. : http://localhost:3000/api/tasks/filter

{
  "tagIds":[" "]
}

## Put
1- Atualizar uma task : http://localhost:3000/api/tasks/update/:idtask

Ex:
{
  "title":" " ,
  "status":" " ,
  "priority":1 ,
  "description":" "
}

2- Associar uma task a uma tag : http://localhost:3000/api/tasks/associate/:idtask

Ex: {
  "tagIds":[" "]
}

3- Remover uma tag de uma task :  http://localhost:3000/api/tasks/remove-tags/:idtask

Ex: {
  "tagIds":[" "]
}
## Delete
1- Deletar uma task : http://localhost:3000/api/tasks/delete/:idtask


# Requisições para Tags
### Get
1- Listar todas as tags:
http://localhost:3000/api/tags/list

2- Listar uma tag específica : http://localhost:3000/api/tags/list/:idtag

### Post
1- Cadastrar uma nova tag :
http://localhost:3000/api/tags/insert

Ex:
{
  "name": " " , 
  "color": " "
}

## Put
1- Atualizar uma tag : http://localhost:3000/api/tags/update/:idtag

{
  "name": " " , 
  "color": " "
}

## Delete
1- Deletar uma tag : http://localhost:3000/api/tags/delete/:idtag

# Requisições para usuarios
### Get
1- Listar todos os usuários:
http://localhost:3000/api/users/list

2- Listar um usuário específico (retorna as tarefas e as tags também por conta do populate) : http://localhost:3000/api/users/list/:userId

### Post
1- Cadastrar um novo usuario :
http://localhost:3000/api/users/insert
Ex:
{
    "username":"  ",
    "password":"  "
}


## Put
1- Atualizar um usuario: http://localhost:3000/api/users/update/:userId

Ex:
{
    "username":"  ",
    "password":"  "
}

2- Vincular um usuário a uma task : http://localhost:3000/api/users/associate/:userId

{ 
 "taskIds":["..." , "..." ]
}

2- Desvincular um usuario a uma ou mais tasks : http://localhost:3000/api/users/remove-user-task/:userId

{ 
 "taskIds":["..." , "..." ]
}

## Delete
1- Deletar um usuario : http://localhost:3000/api/users/delete/:userId

 




