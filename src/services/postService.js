const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../config/config');

const { JWT_SECRET } = process.env;
const env = process.env.NODE_ENV;

const sequelize = new Sequelize(config[env]);

const { Category, BlogPost, PostCategory, User } = require('../models');

const verifyIds = async (categoryIds) => {
    const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
  
    return count;
  };

const findUserIdByToken = async (token) => {
    const { data: { userId } } = jwt.verify(token, JWT_SECRET);
    // console.log(userId);
    return userId;
  };

const createPost = async (title, content, categoryIds, token) => {
    const userId = await findUserIdByToken(token);

    const trans = await sequelize.transaction(async (t) => {
        const createdPost = await BlogPost
            .create({ title, content, userId }, { transaction: t });
        const postCategories = categoryIds
            .map((id) => ({ postId: createdPost.id, categoryId: id }));
        await PostCategory.bulkCreate(postCategories, { transaction: t });
        return { type: 201, data: createdPost };
      });
    return trans;
};

const getAll = async () => {
  const posts = await BlogPost
    .findAll({ include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories' }] });

    // console.log(posts);

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost
    .findByPk(id, { include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories' }] });

    // console.log(posts);

  return post;
};

const updatePost = async (title, content, id) => {
  await BlogPost.update({ title, content }, { where: { id } });
  
  const data = await BlogPost
  .findByPk(id, { include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
  { model: Category, as: 'categories' }] });

  if (!data) return { type: 404, data: { message: 'Post does not exist' } };

  return { type: 200, data };
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

const getBySearch = async (q) => {
  if (!q) {
    const posts = await getAll();
    return posts;
  }

  const posts = await BlogPost.findAll({
    where: { [Op.or]: [{ title: { [Op.substring]: q } },
     { content: { [Op.substring]: q } }] },
     include: [{ model: User, as: 'user', attributes: { exclude: 'password' } }, 
     { model: Category, as: 'categories' }],
   });
   return posts;
};

  module.exports = {
    verifyIds,
    createPost,
    getAll,
    getById,
    findUserIdByToken,
    updatePost,
    deletePost,
    getBySearch,
  };