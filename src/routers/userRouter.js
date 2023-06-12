const { Router } = require('express');

const { userController } = require('../controllers');

const validateDisplayName = require('../middlewares/validateDisplayName');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const userRouter = Router();

userRouter.post(
'/', 
validateDisplayName,
validateEmail,
validatePassword, 
userController.createUser,
);

module.exports = userRouter;