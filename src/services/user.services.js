const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

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