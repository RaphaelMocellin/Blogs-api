const { Router } = require('express');

const { categoryController } = require('../controllers');

const categoryRouter = Router();

categoryRouter.post('/', categoryController.createCategory);

module.exports = categoryRouter;