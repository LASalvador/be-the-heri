const express = require('express');
const ongsController = require('./controllers/ongsController');
const incidentsController = require('./controllers/incidenteController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.post('/ongs', ongsController.index);
routes.get('/ongs', ongsController.list);

routes.post('/incidents', incidentsController.create);
routes.get('/incidents', incidentsController.index);
routes.delete('/incidents/:id', incidentsController.drop);


routes.get('/profile', profileController.index);


module.exports = routes