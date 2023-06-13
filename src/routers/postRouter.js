const { Router } = require('express');

const { postController } = require('../controllers');

const tokenAuth = require('../middlewares/auth');
const validatePostFields = require('../middlewares/validatePostFields');

const postRouter = Router();

postRouter.get('/', tokenAuth, postController.getAll);
postRouter.get('/:id', tokenAuth, postController.getById);
postRouter.post('/', tokenAuth, validatePostFields, postController.createPost);

module.exports = postRouter;