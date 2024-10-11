# Teste técnico - Tascom 📜
Seja bem vindo ao meu exercício, abaixo está a lista de urls para você testar as requisições.

OBS1: Cheque sua conexão com o banco de dados MongoDB antes de iniciar este projeto.

OBS2: Instale todas as dependencias da node modules com npm update.

OBS3:Status apenas "Em andamento" ou "Finalizado" (ENUM)


# Requisições para Task
### Get
1- Listar todas as tasks :
http://localhost:3000/api/tasks/list

2- Listar uma task específica : http://localhost:3000/api/tasks/list/:id

### Post
1- Cadastrar uma nova task :
http://localhost:3000/api/tasks/insert


{
  "title":"titulo da task" ,
  "status":"Em andamento" ,
  "priority":1 ,
  "description":"..."
}

2- Filtra todas as tarefas associadas a um ou mais IDs de tags passados no corpo da requisição. : 

http://localhost:3000/api/tasks/filter

{
  "tagIds":["tagid1", "tagid2"]
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

2- Associar uma ou mais tags a uma task : http://localhost:3000/api/tasks/associate/:idtask

Ex: {
  "tagIds":["tagid1", "tagid2"]
}

3- Remover uma ou mais tags de uma task :  http://localhost:3000/api/tasks/remove-tags/:idtask

Ex: {
  "tagIds":["tagid1", "tagid2"]
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
1- Autenticação de usuário : 
http://localhost:3000/api/users/auth-user/

Ex:
{
    "username":"...",
    "password":"..."
}

2- Cadastrar um novo usuario :
http://localhost:3000/api/users/insert
Ex:
{
    "username":"...",
    "password":"..."
}


## Put
1- Atualizar um usuario: http://localhost:3000/api/users/update/:userId

Ex:
{
    "username":"...",
    "password":"..."
}

2- Vincular um usuário a uma task : http://localhost:3000/api/users/associate/:userId

{ 
 "taskIds":["taskId1" , "taskId2" ]
}

2- Desvincular um usuario a uma ou mais tasks : http://localhost:3000/api/users/remove-user-task/:userId

{ 
 "taskIds":["taskId1" , "taskId2" ]
}

## Delete
1- Deletar um usuario : http://localhost:3000/api/users/delete/:userId

 




