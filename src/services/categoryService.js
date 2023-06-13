const { Category } = require('../models');

const createCategory = async (name) => {
    const data = await Category.create({ name });
  
    return { type: 201, data };
  };

  module.exports = {
    createCategory,
  };