const { Router } = require('express');

const { postController } = require('../controllers');

const tokenAuth = require('../middlewares/auth');
const validatePostFields = require('../middlewares/validatePostFields');
const validateUpdateFields = require('../middlewares/validateUpdateFields');

const postRouter = Router();

postRouter.get('/', tokenAuth, postController.getAll);
postRouter.get('/:id', tokenAuth, postController.getById);
postRouter.post('/', tokenAuth, validatePostFields, postController.createPost);
postRouter.put('/:id', tokenAuth, validateUpdateFields, postController.updatePost);
postRouter.delete('/:id', tokenAuth, postController.updatePost);

module.exports = postRouter;