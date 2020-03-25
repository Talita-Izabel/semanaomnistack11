//Para armazenar as rotas da minha aplicação
const express = require('express');

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();


routes.post('/sessions', SessionController.create);
// Rota para listar todas as ongs do bd
// routes.get('/ongs', async (request, response)=> {
//     const ongs = await connection('ongs').select('*');

//     return response.json(ongs);
// });

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);

//rota para deletar um caso
routes.delete('/incidents/:id', IncidentController.delete)

//Exportar essas rotas daqui de dentro pra que a aplicação possa acessar (index.js entender?)
module.exports = routes;