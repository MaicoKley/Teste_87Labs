# API Caixa Eletronico

Nesta aplicação foram utilizadas as seguintes tecnologias:
 - Node.js e Express.js
 - Banco de dados PostgreSQL
 - ORM Sequelize


Para executar a aplicação deve ser seguidos os seguintes passos:

 - Instalar [Node.js](https://nodejs.org/en/) e [Yarn](https://yarnpkg.com/lang/en/).
 - Realizar a configuração de conexão do banco Postgre em `Teste_87Labs/src/config/database.js`.
 - Dever executado o comando `yarn` na raiz da aplicaço para serem baixadas as dependências.     
 - Executar o comando para serem geradas as tabelas no banco de dados `yarn sequelize db:migrate`.    
 - E por fim `yarn dev` para executar a aplicação.
 - A aplicação irá rodar em `http://localhost:3333`
    
    
 Exemplos:
   
   
 Criação de usuário:    
 /users
 POST
 `
 {      
	"name": "Maria",  
	"cpf": "03797881015",   
	"adress": "Rua",   
	"birth_date": "1990-07-01",   
	"gender": "F",  
	"password": "123456"  
}
`      

Login de sessão:    
/sessions
POST
`
{
	"cpf": "03797881015",
	"password": "123456"
}
`    

### Para as chamadas das proximas rotas deve ser utilizado o token, retornado no login de sessão, no `header Bearer`   

Alteração de Limite:   
/users
PUT
`
{	
	"newLimit": 5000
}`

Deposito:  
/deposit
POST
`
{	
	"value": 500
}
`      

Busca Saldo:   
/balance GET

Extrato:    
/transfer GET
sem passagem de argumentos ou `{	
	"days": 1
}`   

Transferencias:   
/transfer PUT
`{	
	"value": 300,
	"user_to": 4
}`

Gerar opções de notas:    
/withdrawal GET
`{	
	"value": 50
}`   

Saque/confirmação de notas:   
/withdrawal PUT 
`{
	"id": "13"	
}`
