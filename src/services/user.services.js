const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

/* Esta função usa o método findAll do Sequelize para buscar todas as linhas da tabela Users
Equivale a fazer a query: SELECT * FROM Users */
const getAll = async () => {
  const users = await User.findAll();

  return users;
};

/* Esta função usa o método findOne do Sequelize combinado 
com a chave where para buscar por email e password. 
Equivale a fazer a query: SELECT * FROM Users WHERE id=? AND email=? */
const getByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
  
    return user;
  };

  const createUser = async (displayName, email, password, image) => {
    const verifyEmail = await User.findOne({ where: { email } });
    if (verifyEmail) return { type: 409, data: { message: 'User already registered' } }; 
  
    await User.create({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { email } }, secret, jwtConfig);

    return { type: 201, data: { token } };
  };

module.exports = {
  getAll,
  getByEmailAndPassword,
  createUser,
};