const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { type, data } = await categoryService.createCategory(name);
  return res.status(type).json(data);
};

const getAllCategories = async (req, res) => {
    const { type, data } = await categoryService.getAllCategories();
    return res.status(type).json(data);
  };

module.exports = {
  createCategory,
  getAllCategories,
};