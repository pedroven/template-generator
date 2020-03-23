const { Router } = require('express');
const UserController = require('./controllers/UserController');
const NoteController = require('./controllers/NoteController');
const midleware = require('./midlewares/auth');

const routes = Router();

//user
routes.post('/signup', UserController.signup);
routes.post('/signin', UserController.signin);

module.exports = routes;
