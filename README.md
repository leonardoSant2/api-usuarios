<h1 align="center">:file_cabinet: README.md</h1>

# API de Usuários
API REST utilizada para o gerenciamento de usuários cadastrados em um banco de dados.
## :wrench: Tecnologias utilizadas
* Knex.js
* MySQL
* Node.js
* JWT
* Bcrypt
## :rocket: Rodando o projeto
Para rodar o projeto é necessário clonar o repositório do mesmo e executar os seguintes comandos:
```
git clone https://github.com/leonardoSant2/api-usuarios.git
cd api-usuarios
npm install
node index.js

```
## :dart: Status do projeto
Concluído
## Endpoints
### GET /user
Esse endpoint é responsável por retornar a listagem de todos os usuários cadastrados no banco de dados.
#### Parâmetros
Nenhum
#### Respostas
##### OK! 200
Requisição feita com sucesso. Você irá receber a listagem de todos os usuários.
Exemplo de resposta:
```
[
    {
        "id": 1,
        "name": "Leo",
        "email": "leo@gmail.com",
        "role": 1
    },
    {
        "id": 3,
        "name": "Bk",
        "email": "leo@hotmail.com",
        "role": 0
    },
    {
        "id": 4,
        "name": "Black",
        "email": "black@hotmail.com",
        "role": 0
    },
    {
        "id": 6,
        "name": "Jason",
        "email": "json@hotmail.com",
        "role": 0
    }
]
```
### GET /user/:id
Esse endpoint é responsável por retornar o usuário de acordo com o 'id' fornecido por parâmetro
#### Parâmetros
Id: Id do usuário cadastrado no banco de dados.   
Exemplo:
```
localhost:45678/user/3
```
#### Respostas
##### OK! 200
Requisição feita com sucesso. O servidor retorna com o usuário de acordo com o ID fornecido.  
Exemplo de resposta:
```
{
    "id": 3,
    "name": "Bk",
    "email": "leo@hotmail.com",
    "role": 0
}
```
##### Not Found 404
O ID do usuário fornecido não foi encontrado na base de dados.  
Exemplo de resposta:
```
{
    "Error": "Usuário não encontrado!"
}
```
### POST /user
Esse endpoint é responsável cadastrar novos usuários na base de dados.
#### Parâmetros
Exemplo:
```
{
    "email": "joao@gmail.com",
    "nome": "Joao",
    "password": "123456"
}
```
#### Respostas
##### OK! 200
Requisição feita com sucesso. O usuário foi cadastrado com sucesso.
##### Unauthorized 401
Significa que aconteceu alguma falha no processo de autenticação. Motivos: Senha e e-mail incorretos ou usuário não fez o login.  
Exemplo de resposta:
```
Você não está autenticado!
```
##### Forbidden 403
Significa que o usuário logado não tem permissão para acessar o recurso.  
Exemplo de resposta:
```
Você não tem permisão para isso!
```
### PUT /user 
Esse endpoint é responsável por atualizar os dados do usuário de acordo com o id fornecido.
#### Parâmetros
Exemplo:
```
{
    "id": 1,
    "email": "joao@gmail.com",
    "nome": "Joao",
    "role": 1
}
```
#### Respostas
##### OK! 200
Requisição feita com sucesso. Os dados do usuário foram alterados com sucesso.
##### Unauthorized 401
Significa que aconteceu alguma falha no processo de autenticação. Motivos: Senha e e-mail incorretos ou usuário não fez o login.  
Exemplo de resposta:
```
Você não está autenticado!
```
##### Forbidden 403
Significa que o usuário logado não tem permissão para acessar o recurso.  
Exemplo de resposta:
```
Você não tem permisão para isso!
```
##### Not Acceptable 406
Significa que ocorreu um erro no servidor ao executar a alteração dos dados. O id do usuário fornecido não foi encontrado no banco de dados ou o e-mail já existe.
Exemplos de respostas:
```
O usuário não existe!
O e-mail já está cadsatrado!
```
### DELETE /user
Edpoint responsável por apagar os dados do usuário de acordo com o id fornecido.
#### Parâmetros
Id: Id do usuário cadastrado no banco de dados.   
Exemplo:
```
localhost:45678/user/1
```

#### Respostas
##### OK! 200
Requisição feita com sucesso. Os dados do usuário foram deletados com sucesso.
##### Unauthorized 401
Significa que aconteceu alguma falha no processo de autenticação. Motivos: Senha e e-mail incorretos ou usuário não fez o login.  
Exemplo de resposta:
```
Você não está autenticado!
```
##### Forbidden 403
Significa que o usuário logado não tem permissão para acessar o recurso.  
Exemplo de resposta:
```
Você não tem permisão para isso!
```
##### Not Acceptable 406
Significa que ocorreu um erro no servidor. O id do usuário fornecido não foi encontrado no banco de dados.
Exemplos de respostas:
```
Usuário não existe então não pode ser deletado
```
### POST /recoverpassword
Responsável pela recuperação da senha do usuário. Cria um token através do email fornecido.
#### Parâmetros
Exemplo:
```
{
    "email": "joao@gmail.com"
}
```
#### Respostas
##### OK! 200
Requisição executada com sucesso. O servidor retorna com um token necessário para fazer a troca da senha.
 Exemplo:
```
1711478876198
```
##### Not Acceptable 406
Significa que ocorreu um erro no servidor. O e-mail do usuário fornecido não foi encontrado no banco de dados ou o usuário já solicitou a recuperação da senha.
Exemplos de respostas:
```
O usuário não existe no banco de dados!
```
### POST /changepassword
Endpoint responsável pela alteração da senha do usuário.
#### Parâmetros
Exemplo:
```
{
    "token": "1711478876198",
    "password": "12345"
}
```
#### Respostas
##### OK! 200
A senha foi alterada com sucesso.
##### Not Acceptable 406
Significa que ocorreu um erro no servidor. O token fornecido é inválido.
Exemplos de respostas:
```
Token inválido!
```
### POST /login
Responsável por executar a autenticação do usuário e gerar um token JWT.
#### Parâmetros
Exemplo:
```
{
    "email": "json@hotmail.com",
    "password": "12345"
}
```
#### Respostas
##### OK! 200
Requisição executada com sucesso. O servidor retorna com o token JWT.
Exemplo:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impzb25AaG90bWFpbC5jb20iLCJyb2xlIjowLCJpYXQiOjE3MTE0Nzk2NTl9.JxZbvjamhOo1DY08KIREz558l5eualWmMciShJ21vXY"
}
```
##### Not Acceptable 406
Significa que ocorreu um erro no servidor. A senha está incorreta.
Exemplos de respostas:
```
Senha incorreta
```
