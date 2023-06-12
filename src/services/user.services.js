const { User } = require('../models');

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

module.exports = {
  getAll,
  getByEmailAndPassword
};