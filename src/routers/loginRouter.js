const { Router } = require('express');

const { loginController } = require('../controllers');

const loginRouter = Router();

loginRouter.post('/', loginController.makeLogin);

module.exports = loginRouter;