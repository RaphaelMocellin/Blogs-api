const { Router } = require('express');

const { categoryController } = require('../controllers');

const tokenAuth = require('../middlewares/auth');
const validateName = require('../middlewares/validateName');

const categoryRouter = Router();

categoryRouter.get('/', tokenAuth, categoryController.getAllCategories);
categoryRouter.post('/', tokenAuth, validateName, categoryController.createCategory);

module.exports = categoryRouter;