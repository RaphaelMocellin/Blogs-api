const { Router } = require('express');

const { loginController } = require('../controllers');

loginRouter = Router();

loginRouter.post('/', loginController.makeLogin);

module.exports = loginRouter;