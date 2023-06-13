const { Category } = require('../models');

const createCategory = async (name) => {
    const data = await Category.create({ name });
  
    return { type: 201, data };
  };

const getAllCategories = async () => {
    const data = await Category.findAll();
    return { type: 200, data };
  };

  module.exports = {
    createCategory,
    getAllCategories,
  };