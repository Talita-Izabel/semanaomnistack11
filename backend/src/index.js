/*Para importar usa const */
const express = require('express');

const cors = require('cors');

//Importar as rotas do arquivo routes
const routes = require('./routes');

//Instanciando a aplicação
const app = express();

app.use(cors());

/* Para express entender que está usando json para requisição e converter o json em 
    objeto do javaScript*/
app.use(express.json());
//Para usar as rotas
app.use(routes);

/*Para criar uma rota para a aplicação ir(para não dar o erro Canot GET) '/' representa 
    a rota raiz. Rota / Recurso
    request e response é de uma funçao do express, usa o response para retornar uma resposta
    que no caso foi um texto.*/
/* Métodos HTTP:
    GET: Buscar/listar uma informação do back-end
    POST: Criar uma informação no back-end
    PUT: alterar uma informação no back-end
    DELETE: Deletar uma informação no back-end
*/

/* Tipos de parâmetros:
    Query Params: parametros nomeados enviados na rota após o símbolo de interrogação (Filtros, paginação)
    Route Params: parâmetros utlizados para identficar recursos
    Reques Body: Corpo da requisição para criar ou alterar recursos
*/

/* Banco de dados:
    SQL: MySQL, SQLite, PostgreSql, Oracle, Microsoft SQL Server
    NoSQL: MongoDB, CouchDB, etc

    Vamos utilizar o SQL, SQLite.
*/

/* Para conectar/utilizar o banco de dados: 
    Driver: SELECT *FROM 
    Query Builder: table('users).select('*').where()

    Vai ser utlizada o Query Builder KNEX.js
*/

/*  Para acessar um parâmetro vindo da requisição precisa do requeste e para isso usa-se
    const params = request.query; */


//A aplicação ira ouvir a porta 3333, localhost:3333 irá acessar a aplicação
app.listen(3333);

