const { Router } = require('express');

const { userController } = require('../controllers');

const validateDisplayName = require('../middlewares/validateDisplayName');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');
const tokenAuth = require('../middlewares/auth');

const userRouter = Router();

userRouter.get('/', tokenAuth, userController.getAll);
userRouter.get('/:id', tokenAuth, userController.getUserById);
userRouter.post(
'/', 
validateDisplayName,
validateEmail,
validatePassword, 
userController.createUser,
);
userRouter.delete('/me', tokenAuth, userController.deleteUser);

module.exports = userRouter;