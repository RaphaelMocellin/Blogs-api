const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const config = require('../config/config');

const { JWT_SECRET } = process.env;
const env = process.env.NODE_ENV;

const sequelize = new Sequelize(config[env]);

const { Category, BlogPost, User, PostCategory } = require('../models');

const verifyIds = async (categoryIds) => {
    const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
  
    return count;
  };

const findUserByToken = async (token) => {
    const { email } = jwt.verify(token, JWT_SECRET);
    const { id } = await User.findOne({ where: { email } });
    return id;
  };

const createPost = async (title, content, categoryIds, token) => {
    const foundUserId = await findUserByToken(token);

    const trans = await sequelize.transaction(async (t) => {
        const createdPost = await BlogPost
            .create({ title, content, foundUserId }, { transaction: t });
        const postCategories = categoryIds
            .map((id) => ({ postId: createdPost.id, categoryId: id }));
        await PostCategory.bulkCreate(postCategories, { transaction: t });
        return { type: 201, data: createdPost };
      });
    return trans;
};

  module.exports = {
    verifyIds,
    createPost,
  };